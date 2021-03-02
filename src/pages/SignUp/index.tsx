import React, { useCallback, useRef } from 'react'
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/images/logo.png'

import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles'
import getValidationErrors from '../../utils/getValidationErrors'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const passwordConfirmInputRef = useRef<TextInput>(null)

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('O campo nome é orbigatório'),
        email: Yup.string().required('O campo e-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string()
          .required('O campo senha é obrigatório')
          .min(6, 'A senha deve ter no mínimo 6 caracteres'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'As senhas informadas não conferem')
          .required('A confirmação da senha é orbigatória')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      // await api.post('/users', data)

      // history.push('/')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }

      Alert.alert('Opss...Erro no cadastro', 'Ocorreu um erro ao efetuar o cadastro, tente novamente')
    }
  }, [])

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize='words'
                name='name'
                icon='user'
                placeholder='Nome completo'
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize='none'
                name='email'
                icon='mail'
                placeholder='E-mail'
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                ref={passwordInputRef}
                name='password'
                icon='lock'
                placeholder='Senha'
                secureTextEntry
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordConfirmInputRef.current?.focus()
                }}
              />
              <Input
                ref={passwordConfirmInputRef}
                name='confirmPassword'
                icon='lock'
                placeholder='Confirmar senha'
                returnKeyType='send'
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
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>

        <BackToSignInButton onPress={() => navigation.goBack()}>
          <Icon name='arrow-left' size={20} color='#fff' />
          <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
        </BackToSignInButton>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignUp
