import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

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
    // @ts-ignore
    const [profiles, setProfiles] = useState<any>(null);

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
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile: any) => (
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
