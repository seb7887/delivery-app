import React from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import styled from 'styled-components/native'
import * as Google from 'expo-google-app-auth'

import Text from '@components/Text'
import Form from '@components/Form'

const Login: React.FunctionComponent = () => {
  const navigation = useNavigation()

  const signInWithGoogle = async () => {
    await Google.logInAsync({
      androidClientId:
        '715109890652-mv8brlncs2ucghkslmrn4lsd3j6kpp8a.apps.googleusercontent.com',
      behavior: 'web',
      scopes: ['profile', 'email'],
    })
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Text title center heavy>
        Sign in
      </Text>

      <Form />

      <GoogleLogin onPress={signInWithGoogle}>
        <IconContainer>
          <AntDesign name="google" size={32} color="#fff" />
          <Text uppercase color="#fff" medium>
            Sign in with Google
          </Text>
        </IconContainer>
      </GoogleLogin>

      <SignUpContainer>
        <Text center medium>
          Don't have an account?
        </Text>
        <LinkToSignUp onPress={() => navigation.navigate('Register')}>
          <Text medium bold color="#de6e4b">
            Sign up
          </Text>
        </LinkToSignUp>
      </SignUpContainer>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #fff;
`

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #343434;
  border-radius: 32px;
  padding: 12px;
`

const GoogleLogin = styled.TouchableHighlight`
  margin: 16px 32px;
`

const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`

const LinkToSignUp = styled.TouchableOpacity`
  margin-left: 12px;
`

export default Login
