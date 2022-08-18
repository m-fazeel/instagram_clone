import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBB0K344S-fEjq-7Vnbi09djg8KpJXcomo",
    authDomain: "instagram-clone-8c107.firebaseapp.com",
    projectId: "instagram-clone-8c107",
    storageBucket: "instagram-clone-8c107.appspot.com",
    messagingSenderId: "420113554034",
    appId: "1:420113554034:web:53a85e6c1411004bc680eb",
    measurementId: "G-JG1PFV9HBW"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage};



