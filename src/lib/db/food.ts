import { db } from '@lib/firebase'

export const getFoodByCategory = async (category: string) => {
  const dbRef = db.collection('food')

  try {
    const snapshot = await dbRef.where('category', '==', category).get()

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (err) {
    throw err
  }
}
