import firebase from 'firebase'

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyC1bSAkuFxmqwBpg3c3rPgf9rOej5GNAEw",
        authDomain: "fotogramaxfotograma-24cab.firebaseapp.com",
        databaseURL: "https://fotogramaxfotograma-24cab.firebaseio.com",
        projectId: "fotogramaxfotograma-24cab",
        storageBucket: "fotogramaxfotograma-24cab.appspot.com",
        messagingSenderId: "228859886063",
        appId: "1:228859886063:web:b94444d66efee67cd9de1a",
        measurementId: "G-X6B5L98QSL"
    }

)

const storage = firebaseApp.storage()
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export { storage, db, auth, provider }
