import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDLN161FRABhX8T227dYU5WA3W8R-CToHo",
    authDomain: "vue-playlist-66f6e.firebaseapp.com",
    projectId: "vue-playlist-66f6e",
    storageBucket: "vue-playlist-66f6e.appspot.com",
    messagingSenderId: "918418746765",
    appId: "1:918418746765:web:cc7154e1d0c93883e661c4"
  };
  
  firebase.initializeApp(firebaseConfig);
  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth();
  const projectStorage = firebase.storage();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  
  export { projectFirestore, projectAuth, projectStorage, timestamp };