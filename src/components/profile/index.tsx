import { useEffect, useReducer } from "react";
import { ProfileReducerType, User } from "../../constants/types";
import { getUserPhotosByUsername } from "../../services/firebase";
import Header from "./header";
import Photos from "./photos";

interface ProfileProps {
    user: User;
}

export default function Profile({ user }: ProfileProps) {
    const reducer = (
        state: ProfileReducerType,
        newState: ProfileReducerType
    ) => ({
        ...state,
        ...newState
    });
    const intialState = {
        profile: user,
        photosCollection: [],
        followerCount: 0
    };

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        intialState
    );

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUsername(user.username);
            dispatch({
                profile: user,
                photosCollection: photos,
                followerCount: user.followers.length
            });
        }

        getProfileInfoAndPhotos();
    }, [user.username, user]);

    return (
        <>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile!}
                followerCount={followerCount!}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection!} />
        </>
    );
}
