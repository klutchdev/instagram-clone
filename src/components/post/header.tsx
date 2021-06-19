import { Link } from "react-router-dom";

interface HeaderProps {
    username: string;
}

export default function Header({ username }: HeaderProps) {
    return (
        <div className="flex border-b border-gray-primary h-4 p-4 py-8">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={`/images/avatars/${username}.jpg`}
                        alt={`${username} profile`}
                    />
                    <p className="font-bold">{username}</p>
                </Link>
            </div>
        </div>
    );
}
