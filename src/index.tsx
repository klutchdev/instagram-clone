import "dotenv/config";

import "./styles/tailwind.css";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase } from "./lib/firebase";

ReactDOM.render(
    <FirebaseContext.Provider value={firebase}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById("root")
);
