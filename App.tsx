import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  createBottomTabNavigator,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'
import styled from 'styled-components/native'

import LoadingScreen from '@screens/Loading'
import LoginScreen from '@screens/Login'
import RegisterScreen from '@screens/Register'
import HomeScreen from '@screens/Home'
import OrdersScreen from '@screens/Orders'
import MapScreen from '@screens/Address'
import ProfileScreen from '@screens/Profile'
import FoodScreen from '@screens/Food'

const AppNav = createStackNavigator()
const TabNav = createBottomTabNavigator()

const tabBarOptions: BottomTabBarOptions = {
  showLabel: false,
  style: {
    paddingBottom: 12,
  },
}

const routesName: Record<string, string> = {
  Home: 'home',
  Orders: 'ticket',
  Address: 'map',
  Profile: 'user',
}

const TabNavScreen: React.FunctionComponent = () => (
  <TabNav.Navigator
    tabBarOptions={tabBarOptions}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        const iconName = routesName[route.name] || 'home'

        return (
          <TabBarIconContainer focusable={focused}>
            <Entypo
              name={iconName}
              size={24}
              color={focused ? '#900' : '#343434'}
            />
          </TabBarIconContainer>
        )
      },
    })}
  >
    <TabNav.Screen name="Home" component={HomeScreen} />
    <TabNav.Screen name="Orders" component={OrdersScreen} />
    <TabNav.Screen name="Address" component={MapScreen} />
    <TabNav.Screen name="Profile" component={ProfileScreen} />
  </TabNav.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      <AppNav.Navigator mode="modal" headerMode="none">
        <AppNav.Screen name="Loading" component={LoadingScreen} />
        <AppNav.Screen name="Login" component={LoginScreen} />
        <AppNav.Screen name="Register" component={RegisterScreen} />
        <AppNav.Screen name="Food" component={FoodScreen} />
        <AppNav.Screen name="App" component={TabNavScreen} />
      </AppNav.Navigator>
    </NavigationContainer>
  )
}

const TabBarIconContainer = styled.View`
  padding: 2px 16px;
  border-radius: 32px;
`
