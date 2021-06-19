import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getUserByUserId, getPhotos } from "../services/firebase";

export default function usePhotos(): any {
    const [photos, setPhotos] = useState<Array<any> | null>(null);
    const { uid: userId = "" } = useContext(UserContext)!;

    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ following }] = await getUserByUserId(userId);
            let followedUserPhotos = [];

            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following);
            }

            followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
        }

        getTimelinePhotos();
    }, [userId]);

    return { photos };
}
