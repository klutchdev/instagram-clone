import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";
import { ProfileReducerType, User } from "../../constants/types";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

interface HeaderProps {
    photosCount: number;
    profile: User;
    followerCount: number;
    setFollowerCount: React.Dispatch<ProfileReducerType>;
}

export default function Header({
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        username: profileUsername,
        followers = [],
        following = [],
        fullName
    },
    setFollowerCount,
    followerCount,
    photosCount
}: HeaderProps) {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState<
        boolean | null
    >(null);
    const activeBtnFollow =
        user?.username && user?.username !== profileUsername;

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(
                user?.username!,
                profileUserId
            );
            setIsFollowingProfile(!!isFollowing);
        };

        if (user?.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user?.username, profileUserId]);

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile
                ? followerCount - 1
                : followerCount + 1
        });
        await toggleFollow(
            isFollowingProfile!,
            user?.docId!,
            profileDocId,
            profileUserId,
            user?.userId!
        );
    };

    return (
        <div className="grid justify-between max-w-screen-lg grid-cols-3 gap-4">
            <div className="container flex justify-center ">
                {user?.username ? (
                    <img
                        className="flex w-40 h-40 rounded-full"
                        alt={`${user?.username} profile`}
                        src={`/images/avatars/${profileUsername}.jpg`}
                        onError={(e) => {
                            // @ts-ignore
                            e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                    />
                ) : (
                    <Skeleton circle={true} height="10rem" width="10rem" />
                )}
            </div>
            <div className="flex flex-col items-center justify-center col-span-2">
                <div className="container flex items-center">
                    <p className="mr-4 text-2xl">{profileUsername}</p>
                    {activeBtnFollow && isFollowingProfile === null ? (
                        <Skeleton count={1} width={80} height={32} />
                    ) : (
                        activeBtnFollow && (
                            <button
                                className="w-20 h-8 text-sm font-bold text-white rounded bg-blue-medium"
                                type="button"
                                onClick={handleToggleFollow}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        handleToggleFollow();
                                    }
                                }}
                            >
                                {isFollowingProfile ? "Unfollow" : "Follow"}
                            </button>
                        )
                    )}
                </div>
                <div className="container flex mt-4">
                    {followers === undefined ||
                    following === undefined ||
                    photosCount === undefined ? (
                        <Skeleton count={1} width={300} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount}</span>{" "}
                                {photosCount === 1 ? "photo" : "photos"}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">
                                    {followerCount}
                                </span>
                                {` `}
                                {followerCount === 1 ? "follower" : "followers"}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">
                                    {following.length}
                                </span>{" "}
                                following
                            </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">
                        {!fullName ? (
                            <Skeleton count={1} height={24} />
                        ) : (
                            fullName
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
