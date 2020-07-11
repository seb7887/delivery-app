import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'

import { auth } from '@lib/firebase'

const Loading: React.FunctionComponent = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const currentUser = auth.currentUser

    if (!currentUser) {
      navigation.navigate('Login')
    } else {
      navigation.navigate('Home')
    }
  }, [])

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

export default Loading
