import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

interface UserProps {
    username: string;
    fullName: string;
}

const User = ({ username, fullName }: UserProps) =>
    !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link
            to={`/p/${username}`}
            className="grid grid-cols-4 gap-4 mb-6 item-center"
        >
            <div className="flex items-center justify-between col-span-1">
                <img
                    className="flex w-16 mr-3 rounded-full"
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                    onError={(e) => {
                        // @ts-ignore
                        e.target.src = DEFAULT_IMAGE_PATH;
                    }}
                />
            </div>
            <div className="col-span-3">
                <p className="text-sm font-bold">{username}</p>
                <p className="text-sm">{fullName}</p>
            </div>
        </Link>
    );

export default memo(User);
