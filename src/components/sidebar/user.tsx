interface UserProps {
    username: string;
    fullName: string;
}

export default function User(_props: UserProps): JSX.Element {
    return <p>User</p>;
}
