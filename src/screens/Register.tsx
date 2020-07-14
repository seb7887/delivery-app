import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'

import { auth } from '@lib/firebase'

import Text from '@components/Text'
import Form from '@components/Form'

const Register: React.FunctionComponent = () => {
  const navigation = useNavigation()

  const signUpWithCredentials = async (email: string, password: string) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      navigation.navigate('Loading')
    } catch (err) {
      throw new Error('Cannot sign up. Please try again')
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Text title center heavy>
        Sign Up
      </Text>
      <Form signUp onSubmit={signUpWithCredentials} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #fff;
`

export default Register
