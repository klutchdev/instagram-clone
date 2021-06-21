import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import UserProfile from "../components/profile";
import { User } from "../constants/types";

export default function Profile() {
    const { username } = useParams<{ username: string }>();
    const [userExists, setUserExists] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const history = useHistory();

    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(username);
            if (user?.userId) {
                setUser(user);
                setUserExists(true);
            } else {
                console.log("no");
                history.push(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
    }, [username, history]);

    return userExists ? (
        <div className="bg-gray-background">
            <Header />
            <div className="max-w-screen-lg mx-auto">
                <UserProfile user={user!} />
            </div>
        </div>
    ) : null;
}
