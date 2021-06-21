import { useContext, useState } from "react";
import { Comment } from "../../constants/types";

import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { FieldValue } from "../../lib/firebase";

interface AddCommentProps {
    docId: string;
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    commentInput: React.MutableRefObject<any>;
}

export default function AddComment({
    docId,
    comments,
    setComments,
    commentInput
}: AddCommentProps) {
    const [comment, setComment] = useState("");
    const firebase = useContext(FirebaseContext);
    const user = useContext(UserContext);

    const handleSubmitComment = (event: any) => {
        event.preventDefault();

        setComments([
            { displayName: user?.displayName!, comment },
            ...comments
        ]);
        setComment("");

        return firebase
            .firestore()
            .collection("photos")
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({
                    displayName: user?.displayName,
                    comment
                })
            });
    };

    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="post"
                onSubmit={(event) =>
                    comment.length >= 1
                        ? handleSubmitComment(event)
                        : event.preventDefault()
                }
            >
                <input
                    aria-label="Add a comment"
                    autoCapitalize="off"
                    className="w-full px-4 py-5 mr-5 text-sm text-gray-base focus:outline-none"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-medium focus:outline-none ${
                        !comment && "opacity-25"
                    }`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}
