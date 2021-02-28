import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import seedDatabase from "../seed";

const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

// ONLY CALL THIS ONCE
// seedDatabase(firebase);

export { firebase, FieldValue };
