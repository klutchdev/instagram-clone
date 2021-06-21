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
    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(suggestedProfileDocId, userId, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center justify-between align-items">
            <div className="flex items-center justify-between">
                <img
                    className="flex w-8 mr-3 rounded-full"
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                />
                <Link to={`/p/${username}`}>
                    <p className="text-sm font-bold">{username}</p>
                </Link>
            </div>
            <button
                type="button"
                className="text-xs font-bold outline-none text-blue-medium"
                onClick={handleFollowUser}
            >
                Follow
            </button>
        </div>
    ) : null;
}
