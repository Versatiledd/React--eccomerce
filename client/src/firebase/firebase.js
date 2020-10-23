import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCsn0dN1h5CBViNnkajXubkNvAMmuHZA2Q",
  authDomain: "shop-24ca3.firebaseapp.com",
  databaseURL: "https://shop-24ca3.firebaseio.com",
  projectId: "shop-24ca3",
  storageBucket: "shop-24ca3.appspot.com",
  messagingSenderId: "439594606004",
  appId: "1:439594606004:web:b3b554ac98105264b8a6e1",
  measurementId: "G-HJNQV1D6ES",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();
  console.log(userRef);
  console.log(snapshot);

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

// dodanie do bazy danych kolekcji

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();

  objectsToAdd.map((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformCollection;
};

export const addToFirebaseItemAfterBuy = (currentUser, items) => {
  const userRef = firestore.doc(
    `users/${currentUser.currentUser.id}/item/YvGuKQEloaW1x5VbjaTG`
  );
  userRef.set({
    afterBuy: items,
  });
};

export default firebase;
