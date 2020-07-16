import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'

const Food: React.FunctionComponent = () => {
  const navigation = useNavigation()
  const routes = useRoute()

  return (
    <Container>
      <StatusBar barStyle="light-content" />
    </Container>
  )
}

const Container = styled.View``

export default Food
