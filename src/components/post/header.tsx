import { Link } from "react-router-dom";

interface HeaderProps {
    username: string;
}

export default function Header({ username }: HeaderProps) {
    return (
        <div className="flex h-4 p-4 py-8 border-b border-gray-primary">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img
                        className="flex w-8 h-8 mr-3 rounded-full"
                        src={`/images/avatars/${username}.jpg`}
                        alt={`${username} profile`}
                    />
                    <p className="font-bold">{username}</p>
                </Link>
            </div>
        </div>
    );
}
