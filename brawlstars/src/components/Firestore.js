import firebase, { firestore } from 'firebase'
import 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyAvw6GqjvdJ30u8lhJPDpx_Asz6fw9QwaA",
    authDomain: "brawlstars-260814.firebaseapp.com",
    databaseURL: "https://brawlstars-260814.firebaseio.com",
    projectId: "brawlstars-260814",
    storageBucket: "brawlstars-260814.appspot.com",
    messagingSenderId: "184744257860",
    appId: "1:184744257860:web:7760bdf65e67cbeb9f8f11",
    measurementId: "G-36T0YR0TBC"
};

const firestoreApp = firebase.initializeApp(firebaseConfig);

export default firestoreApp.firestore();