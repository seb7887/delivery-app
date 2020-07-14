import firebase, { db } from '@lib/firebase'

export const createUserProfile = async (userAuth: firebase.User) => {
  const dbRef = db.collection('users').doc(userAuth.uid)
  const snapshot = await dbRef.get()

  if (!snapshot.exists) {
    const { displayName, email } = userAuth

    try {
      await dbRef.set({
        name: displayName,
        email,
      })
    } catch (err) {
      throw err
    }
  }
}
