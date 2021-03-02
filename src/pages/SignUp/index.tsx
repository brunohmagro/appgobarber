import React, { useCallback, useRef } from 'react'
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/images/logo.png'

import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles'

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const passwordConfirmInputRef = useRef<TextInput>(null)

  const handleSignIn = useCallback((data: object) => {
    console.log(data)
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

            <Form ref={formRef} onSubmit={handleSignIn}>
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
