interface Category {
  id: string
  name: string
  color: string
  image: string
}

interface Food {
  id: string
  category: string
  image: string
  name: string
  price: number
}

interface CartItem {
  food: Food
  quantity: number
  price: number
}

type Cart = CartItem[]
