import React from 'react'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'

import Text from '@components/Text'
import Form from '@components/Form'

const Register: React.FunctionComponent = () => {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Text title center heavy>
        Sign Up
      </Text>
      <Form signUp />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
`

export default Register
