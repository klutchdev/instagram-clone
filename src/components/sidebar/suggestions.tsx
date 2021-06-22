import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { SuggestedProfiles, User } from "../../constants/types";

import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggestedProfile";

interface SuggestionsProps {
    userId: string;
    following: string[];
    loggedInUserDocId: string;
}

export default function Suggestions({
    userId,
    following,
    loggedInUserDocId
}: SuggestionsProps) {
    const [profiles, setProfiles] = useState<SuggestedProfiles | null>(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        if (userId) suggestedProfiles();
    }, [userId, following]);

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles?.length > 0 ? (
        <div className="flex flex-col rounded">
            <div className="flex items-center justify-between mb-2 text-sm align-items">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="grid gap-5 mt-4">
                {profiles.map((profile: User) => (
                    <SuggestedProfile
                        key={profile.docId}
                        id={profile.docId}
                        suggestedProfileDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}
                    />
                ))}
            </div>
        </div>
    ) : null;
}
