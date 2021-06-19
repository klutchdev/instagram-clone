interface ImageProps {
    src: string;
    caption: string;
}

export default function Image({ src, caption }: ImageProps) {
    return <img src={src} alt={caption} />;
}
