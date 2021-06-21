export interface Comment {
    displayName: string;
    comment: string;
}

export interface User {
    dateCreated: number;
    emailAddress: string;
    followers: string[];
    following: string[];
    fullName: string;
    userId: string;
    username: string;
    docId: string;
}

export interface Photo {
    username: string;
    imageSrc: string;
    caption: string;
    docId: string;
    userLikedPhoto: boolean;
    likes: string[];
    comments: Comment[];
    dateCreated: number;
}
export interface ProfileReducerType {
    profile?: User;
    photosCollection?: Photo[];
    followerCount?: number;
}

export type SuggestedProfiles = User[];
