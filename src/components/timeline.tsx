import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
    const { photos } = usePhotos();

    return (
        <div className="container col-span-2">
            {!photos ? (
                <Skeleton count={4} width={640} height={500} className="mb-5" />
            ) : photos.length > 0 ? (
                photos.map((content: any) => (
                    <Post key={content.docId} content={content} />
                ))
            ) : (
                <p className="text-center text-2xl">
                    Follow people to see their photos here
                </p>
            )}
        </div>
    );
}
