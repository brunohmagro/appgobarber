import React, { useCallback, useRef } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/Feather'

import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Title, UserAvatarButton, UserAvatar, BackButton } from './styles'
import getValidationErrors from '../../utils/getValidationErrors'
import colors from '../../utils/styles/colors'

interface ProfileFormData {
  name: string
  email: string
  current_password?: string
  password?: string
  confirm_password?: string
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth()

  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const currentPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const passwordConfirmInputRef = useRef<TextInput>(null)

  const handleProfile = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('O campo nome é orbigatório'),
          email: Yup.string().required('O campo e-mail é obrigatório').email('Digite um e-mail válido'),
          current_password: Yup.string(),
          password: Yup.string().when('current_password', {
            is: (val: string | undefined) => !!val?.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          confirm_password: Yup.string()
            .when('current_password', {
              is: (val: string | undefined) => !!val?.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'As senhas informadas não conferem'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const { name, email, current_password, password, confirm_password } = data

        const formData = {
          name,
          email,
          ...(current_password
            ? {
                oldPassword: current_password,
                password,
                confirmPassword: confirm_password,
              }
            : {}),
        }

        const response = await api.put('/profile/update', formData)

        updateUser(response.data)

        Alert.alert('Perfil atualizado com sucesso!')

        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }

        Alert.alert('Opss...Erro na atualização', 'Ocorreu um erro ao atualizar seu perfil, tente novamente')
      }
    },
    [navigation, updateUser],
  )

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={28} color={colors.GRAY_TERTIARY} />
            </BackButton>

            <UserAvatarButton>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleProfile}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome completo"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                ref={currentPasswordInputRef}
                name="current_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmInputRef.current?.focus()
                }}
                secureTextEntry
              />

              <Input
                ref={passwordConfirmInputRef}
                name="confirm_password"
                icon="lock"
                placeholder="Confirmar nova senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
                secureTextEntry
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm()
                }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default Profile
