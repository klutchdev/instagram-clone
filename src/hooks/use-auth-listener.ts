import "firebase/auth";
import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
    const [user, setUser] = useState<firebase.default.User | null>(
        JSON.parse(localStorage.getItem("authUser")!)
    );
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                // We have a user, therefore we can store them inside of local storage
                localStorage.setItem("authUser", JSON.stringify(authUser));
                setUser(authUser);
            } else {
                // We don't have a user, therefore clear the local storage
                localStorage.removeItem("authUser");
                setUser(null);
            }
        });

        return () => listener();
    }, [firebase]);

    return { user };
}
