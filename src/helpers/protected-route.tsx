import { Redirect, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";

interface ProtectedRouteProps {
    user: firebase.default.User;
    children: any;
    path?: string;
    exact?: boolean;
}

export default function ProtectedRoute({
    user,
    children,
    ...rest
}: ProtectedRouteProps) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (user) {
                    return children;
                }

                if (!user) {
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
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
