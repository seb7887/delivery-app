import { db } from '@lib/firebase'

export const getCategories = async () => {
  const dbRef = db.collection('categories')

  try {
    const snapshot = await dbRef.get()

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (err) {
    throw err
  }
}
