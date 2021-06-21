import React, { useRef } from "react";

import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";

import { Photo as PostType } from "../../constants/types";

interface PostProps {
    content: PostType;
}

export default function Post({ content }: PostProps) {
    const commentInput = useRef<any>(null);
    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="col-span-4 mb-8 bg-white border rounded border-gray-primary">
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer caption={content.caption} username={content.username} />
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
            />
        </div>
    );
}
