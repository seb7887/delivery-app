import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCVVvsno1KFCYQP45HkmUcA9Wh_cm1NAI8',
  authDomain: 'develery-app.firebaseapp.com',
  databaseURL: 'https://develery-app.firebaseio.com',
  projectId: 'develery-app',
  storageBucket: 'develery-app.appspot.com',
  messagingSenderId: '1018809494315',
  appId: '1:1018809494315:web:871435d46919545fc1f36e',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()

export default firebase
