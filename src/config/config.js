import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCBPKNt_f3VogrYTIZdZh6gGSoukXJW0do",
    authDomain: "game-store-fa9d2.firebaseapp.com",
    databaseURL: "https://game-store-fa9d2-default-rtdb.firebaseio.com",
    projectId: "game-store-fa9d2",
    storageBucket: "game-store-fa9d2.appspot.com",
    messagingSenderId: "90832189644",
    appId: "1:90832189644:web:455d9c512535d56f8d6a69",
    measurementId: "G-PXDYFJ2XFD"
};
  
firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = firebase.firestore();