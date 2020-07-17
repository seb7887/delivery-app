import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'

import Text from '@components/Text'

type ParamList = {
  Food: {
    food: Food
  }
}

const Food: React.FunctionComponent = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<ParamList, 'Food'>>()
  const { food } = route.params

  const addToCart = async (data: Food) => {
    const cartItem = {
      food: data,
      quantity: 1,
      price: data.price,
    }

    const cartData = await AsyncStorage.getItem('cart')

    let cart = []
    if (cartData) {
      cart = JSON.parse(cartData)
      cart.push(cartItem)
    } else {
      cart.push(cartItem)
    }
    AsyncStorage.setItem('cart', JSON.stringify(cart))

    alert(`${data.name} added to cart`)
    navigation.goBack()
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />

      <FoodArtContainer>
        <FoodArt source={{ uri: food.image }} />
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="ios-close" size={48} color="#343434" />
        </BackButton>
      </FoodArtContainer>

      <FoodInfo>
        <Text>{food.category}</Text>
        <Text center large heavy>
          {food.name}
        </Text>

        <AddButton onPress={() => addToCart(food)}>
          <Ionicons
            name="ios-add-circle"
            color="#fff"
            size={20}
            style={{ marginRight: 4 }}
          />
          <Text medium uppercase heavy color="#fff">
            Add to Cart
          </Text>
        </AddButton>
      </FoodInfo>
    </Container>
  )
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`

const FoodArtContainer = styled.View`
  position: relative;
`

const FoodArt = styled.Image`
  height: 350px;
  width: 100%;
  border-bottom-right-radius: 32px;
  border-bottom-left-radius: 32px;
`

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 48px;
  left: 16px;
`

const FoodInfo = styled.View`
  margin: 16px;
`

const AddButton = styled.TouchableOpacity`
  margin-top: 64px;
  background-color: #33c37d;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 14px;
`

export default Food
