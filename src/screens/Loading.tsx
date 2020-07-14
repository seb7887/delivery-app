import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'

import { auth } from '@lib/firebase'
import { createUserProfile } from '@lib/db/users'
import Text from '@components/Text'

const Loading: React.FunctionComponent = () => {
  const navigation = useNavigation()

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigation.navigate('Login')
      } else {
        await createUserProfile(user)
        navigation.navigate('App')
      }
    })
  }, [])

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Text center heavy title color="#343434">
        Loading...
      </Text>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
`

export default Loading
