import React from 'react'
import { StatusBar, View } from 'react-native'

import Text from '@components/Text'

const Address: React.FunctionComponent = () => {
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <Text center heavy large>
        Address Screen
      </Text>
    </View>
  )
}

export default Address
