import React, { useEffect, useState } from 'react'
import { StatusBar, FlatList } from 'react-native'
import Swipper from 'react-native-swiper'
import styled from 'styled-components/native'

import firebase from '@lib/firebase'
import { getBanners } from '@lib/db/banners'
import { getCategories } from '@lib/db/categories'
import { getFoodByCategory } from '@lib/db/food'

import Text from '@components/Text'

const Home: React.FunctionComponent = () => {
  const [banners, setBanners] = useState<firebase.firestore.DocumentData[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [food, setFood] = useState<Food[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('Burger')

  useEffect(() => {
    const load = async () => {
      const bannerData = await getBanners()
      const categoryData = await getCategories()
      const foodData = await getFoodByCategory(selectedCategory)
      setBanners(bannerData)
      setCategories(categoryData as Category[])
      setFood(foodData as Food[])
    }
    load()
  }, [])

  useEffect(() => {
    const load = async () => {
      const foodData = await getFoodByCategory(selectedCategory)
      setFood(foodData as Food[])
    }
    load()
  }, [selectedCategory])

  const renderItem = (item: Category) => (
    <CategoryItem
      style={{ backgroundColor: item.color }}
      onPress={() => setSelectedCategory(item.name)}
    >
      <CategoryImg source={{ uri: item.image }} resizeMode="contain" />
      <Text bold medium>
        {item.name}
      </Text>
    </CategoryItem>
  )

  const renderFood = (item: Food) => (
    <FoodItem>
      <FoodImg source={{ uri: item.image }} resizeMode="contain" />
      <Text heavy medium center>
        {item.name}
      </Text>
      <Text medium color="green">
        {item.price}
      </Text>
    </FoodItem>
  )

  return (
    <Container>
      <Main>
        <StatusBar barStyle="light-content" />

        <BannerContainer>
          <BannerImg
            source={require('@assets/foodapp.png')}
            resizeMode="contain"
          />
          <Swipper height={320} autoplay autoplayTimeout={6}>
            {banners.map(banner => (
              <Banner resizeMode="contain" source={{ uri: banner.url }} />
            ))}
          </Swipper>
        </BannerContainer>

        <ListContainer>
          <Text large center color="#343434" heavy>
            Categories
          </Text>
          <List
            horizontal
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
          <FoodList
            horizontal
            data={food}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderFood(item)}
          />
        </ListContainer>
      </Main>
    </Container>
  )
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`

const Main = styled.View`
  width: 100%;
  flex: 1;
`

const BannerContainer = styled.View`
  align-items: center;
`

const BannerImg = styled.Image`
  width: 100%;
  height: 60px;
  margin: 10px;
`

const Banner = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`

const ListContainer = styled.View`
  width: 100%;
  border-radius: 20px;
  padding-vertical: 20px;
`

const List = styled(FlatList as new () => FlatList<Category>)`
  margin: 10px;
`

const CategoryItem = styled.TouchableOpacity`
  background-color: red;
  margin: 5px;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
`

const CategoryImg = styled.Image`
  width: 100px;
  height: 100px;
`

const FoodList = styled(FlatList as new () => FlatList<Food>)``

const FoodItem = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  margin-top: 55px;
  margin-bottom: 5px;
  margin-left: 10px;
  align-items: center;
  elevation: 8;
  shadow-opacity: 0.3;
  shadow-radius: 50px;
  background-color: #fff;
`

const FoodImg = styled.Image`
  width: 100px;
  height: 100px;
  background-color: transparent;
  position: absolute;
  top: -45;
`

export default Home
