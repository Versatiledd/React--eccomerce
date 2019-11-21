import firebase from "firebase/app";
import "firebase.firestore";

const firestore = firebase.firestore();

firestore
  .collection("users")
  .doc("iK9QziWhgcc9JlZHqy0A")
  .collection("cartItems")
  .doc("IdidL5ikcOrFRPZ49KSU");
