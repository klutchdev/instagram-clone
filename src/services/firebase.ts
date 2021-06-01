import { FieldValue, firebase } from "../lib/firebase";

export async function doesUsernameExist(username: string) {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId: string) {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("userId", "==", userId)
        .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    })) as any;

    return user;
}

export async function getSuggestedProfiles(
    userId: string,
    following: string[]
) {
    const result = await firebase
        .firestore()
        .collection("users")
        .limit(10)
        .get();

    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter(
            (profile: any) =>
                profile.userId !== userId && !following.includes(profile.userId)
        );
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId: string,
    profileId: string,
    isFollowingProfile: boolean
) {
    return firebase
        .firestore()
        .collection("users")
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(
    suggestedProfileDocId: string,
    loggedInUserDocId: string,
    isFollowingProfile: boolean
) {
    return firebase
        .firestore()
        .collection("users")
        .doc(suggestedProfileDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId)
                : FieldValue.arrayUnion(loggedInUserDocId)
        });
}
