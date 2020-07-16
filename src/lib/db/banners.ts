import { db } from '@lib/firebase'

export const getBanners = async () => {
  const dbRef = db.collection('banners')

  try {
    const snapshot = await dbRef.get()

    return snapshot.docs.map(doc => doc.data())
  } catch (err) {
    throw err
  }
}
