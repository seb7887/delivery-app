import React from 'react'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'

const Login: React.FunctionComponent = () => {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Title>Login Screen</Title>
    </Container>
  )
}

const Container = styled.View``

const Title = styled.Text`
  font-weight: bold;
  font-size: 32px;
`

export default Login
