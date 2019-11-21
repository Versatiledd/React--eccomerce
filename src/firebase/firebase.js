import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const daneFirebase = {
  apiKey: "AIzaSyCsn0dN1h5CBViNnkajXubkNvAMmuHZA2Q",
  authDomain: "shop-24ca3.firebaseapp.com",
  databaseURL: "https://shop-24ca3.firebaseio.com",
  projectId: "shop-24ca3",
  storageBucket: "shop-24ca3.appspot.com",
  messagingSenderId: "439594606004",
  appId: "1:439594606004:web:b3b554ac98105264b8a6e1",
  measurementId: "G-HJNQV1D6ES"
};

firebase.initializeApp(daneFirebase);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
