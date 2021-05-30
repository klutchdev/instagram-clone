import { firebase } from "../lib/firebase";
import { createContext } from "react";

const FirebaseContext = createContext(firebase);
export default FirebaseContext;
