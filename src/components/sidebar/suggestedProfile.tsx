import { useState } from "react";
import { Link } from "react-router-dom";

import {
    updateLoggedInUserFollowing,
    updateFollowedUserFollowers
} from "../../services/firebase";

interface SuggestedProfileProps {
    id: string;
    suggestedProfileDocId: string;
    username: string;
    profileId: string;
    userId: string;
    loggedInUserDocId: string;
}

export default function SuggestedProfile({
    username,
    loggedInUserDocId,
    profileId,
    suggestedProfileDocId,
    userId
}: SuggestedProfileProps) {
    // @ts-ignore
    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(suggestedProfileDocId, userId, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <button
                type="button"
                className="text-xs font-bold text-blue-medium outline-none"
                onClick={handleFollowUser}
            >
                Follow
            </button>
        </div>
    ) : null;
}
