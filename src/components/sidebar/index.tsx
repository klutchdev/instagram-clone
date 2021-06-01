import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
    const { user } = useUser();

    return (
        <div className="p-4">
            <User
                username={user.username as string}
                fullName={user.fullName as string}
            />
            <Suggestions
                userId={user.userId as any}
                following={user.following as string[]}
                loggedInUserDocId={user.docId as string}
            />
        </div>
    );
}
