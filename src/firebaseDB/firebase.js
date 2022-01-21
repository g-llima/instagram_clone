import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "@firebase/storage-compat";

const config = {
  apiKey: "AIzaSyA70kovauMfLGIeyPoqFvG9XgDVBa3kV9I",
  authDomain: "instagram-clone-20fee.firebaseapp.com",
  projectId: "instagram-clone-20fee",
  storageBucket: "instagram-clone-20fee.appspot.com",
  messagingSenderId: "685677817053",
  appId: "1:685677817053:web:80e9a04ff99b8c628f3f34",
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebaseApp };
