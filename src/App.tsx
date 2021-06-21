import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import ReactLoader from "./components/loader";

import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/notfound"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));

export default function App() {
    const { user } = useAuthListener();

    return (
        <UserContext.Provider value={user}>
            <Router>
                <Suspense fallback={<ReactLoader />}>
                    <Switch>
                        <ProtectedRoute
                            user={user!}
                            path={ROUTES.DASHBOARD}
                            exact
                        >
                            <Dashboard />
                        </ProtectedRoute>

                        <IsUserLoggedIn
                            user={user!}
                            loggedInPath={ROUTES.DASHBOARD}
                            path={ROUTES.LOGIN}
                            exact
                        >
                            <Login />
                        </IsUserLoggedIn>

                        <Route path={ROUTES.PROFILE} component={Profile} />

                        <IsUserLoggedIn
                            user={user!}
                            loggedInPath={ROUTES.DASHBOARD}
                            path={ROUTES.SIGN_UP}
                            exact
                        >
                            <Signup />
                        </IsUserLoggedIn>

                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}
