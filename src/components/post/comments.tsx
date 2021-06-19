import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

import { Comment } from "../../constants/types";

interface CommentProps {
    docId: string;
    comments: Array<Comment>;
    posted: number;
    commentInput: React.MutableRefObject<any>;
}

export default function Comments({
    docId,
    comments: allComments,
    posted,
    commentInput
}: CommentProps) {
    const [comments, setComments] = useState(allComments);

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {comments.length >= 3 && (
                    <p className="mb-1 text-sm cursor-pointer text-gray-base">
                        View all {comments.length} comments
                    </p>
                )}
                {comments.slice(0, 3).map((item) => (
                    <p
                        key={`${item.comment}-${item.displayName}`}
                        className="mb-1"
                    >
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1 font-bold">
                                {item.displayName}
                            </span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))}
                <p className="mt-2 text-xs uppercase text-gray-base">
                    {formatDistance(posted, new Date())} ago
                </p>
            </div>
        </>
    );
}
