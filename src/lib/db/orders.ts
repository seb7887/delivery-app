import { db } from '@lib/firebase'

export const createOrder = async (
  userId: string,
  email: string,
  cart: Cart
) => {
  const dbRef = db.collection('orders').doc(userId)

  try {
    await dbRef.set({
      user: userId,
      email,
      cart,
    })
  } catch (err) {
    throw err
  }
}
