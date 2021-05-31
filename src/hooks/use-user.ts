import { useContext, useEffect, useState } from "react";

import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser(): any {
    const [activeUser, setActiveUser] = useState({});
    const user = useContext(UserContext);

    useEffect(() => {
        async function getUserObjectByUserId() {
            const [response] = await getUserByUserId(user?.uid!);
            setActiveUser(response);
        }

        if (user?.uid) getUserObjectByUserId();
    }, [user]);

    return { user: activeUser };
}
