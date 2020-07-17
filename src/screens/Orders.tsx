import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'

import { auth } from '@lib/firebase'
import { createOrder } from '@lib/db/orders'

import Text from '@components/Text'

const Orders: React.FunctionComponent = () => {
  const [cart, setCart] = useState<Cart>([])

  useEffect(() => {
    const load = async () => {
      const cartData = await AsyncStorage.getItem('cart')

      if (cartData) {
        const cartItems = JSON.parse(cartData)
        setCart(cartItems)
      }
    }
    load()
  }, [])

  const changeQuantity = (index: number, type: 'ADD' | 'REMOVE') => {
    let quantity = cart[index].quantity

    quantity = type === 'ADD' ? quantity++ : quantity--
    if (quantity === 0) {
      cart.splice(index, 1)
    } else {
      cart[index].quantity = quantity
    }
    setCart(cart)
  }

  const makeOrder = async () => {
    const user = auth.currentUser

    await createOrder(user?.uid as string, user?.email as string, cart)
    alert('Your order is being processed')
    setCart([])
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />

      <Text center large heavy>
        Cart
      </Text>

      <ItemContainer>
        {cart.map((item, index) => (
          <Item>
            <ItemImg resizeMode="contain" source={{ uri: item.food.image }} />
            <Content>
              <Text medium bold>
                {item.food.name}
              </Text>
              <Bottom>
                <Text medium heavy color="green">
                  ${item.price}
                </Text>
                <Quantity>
                  <Button onPress={() => changeQuantity(index, 'REMOVE')}>
                    <Ionicons
                      name="ios-remove-circle"
                      color="#33c37d"
                      size={24}
                    />
                  </Button>
                  <Text bold medium>
                    {item.quantity}
                  </Text>
                  <Button onPress={() => changeQuantity(index, 'ADD')}>
                    <Ionicons name="ios-add-circle" color="#33c37d" size={24} />
                  </Button>
                </Quantity>
              </Bottom>
            </Content>
          </Item>
        ))}
      </ItemContainer>

      <Checkout onPress={() => makeOrder()}>
        <Text uppercase large heavy color="#fff">
          Checkout
        </Text>
      </Checkout>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 32px;
`

const ItemContainer = styled.ScrollView`
  margin-top: 16px;
`

const Item = styled.View`
  width: 100%;
  margin: 10px;
  flex-direction: row;
  border-bottom-width: 2px;
  border-color: #cccccc;
  padding-bottom: 10px;
  align-items: center;
`

const ItemImg = styled.Image`
  width: 56px;
  height: 56px;
  margin-right: 10px;
`

const Content = styled.View`
  width: 250px;
`

const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Quantity = styled.View`
  flex-direction: row;
  align-items: center;
`

const Button = styled.TouchableOpacity`
  margin: 0 12px;
`

const Checkout = styled.TouchableOpacity`
  background-color: #33c37d;
  width: 100%;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
`

export default Orders
