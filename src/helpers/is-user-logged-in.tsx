import { Redirect, Route } from "react-router-dom";

interface IsUserLoggedInProps {
    user: firebase.default.User;
    children: any;
    loggedInPath: string;
    path?: string;
    exact?: boolean;
}

export default function IsUserLoggedIn({
    user,
    loggedInPath,
    children,
    ...rest
}: IsUserLoggedInProps) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!user) {
                    return children;
                }

                if (user) {
                    return (
                        <Redirect
                            to={{
                                pathname: loggedInPath,
                                state: { from: location }
                            }}
                        />
                    );
                }

                return null;
            }}
        />
    );
}
