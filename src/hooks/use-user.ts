import { useContext, useEffect, useState } from "react";
import { User } from "../constants/types";

import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser(): { user: User | null } {
    const [activeUser, setActiveUser] = useState<User | null>(null);

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
