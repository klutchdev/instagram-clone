import Firebase from "firebase/app";
import "firebase/firestore";
// import { seedDatabase } from "../seed";

const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// ONLY CALL THIS ONCE
// seedDatabase(firebase);

export { firebase, FieldValue };
