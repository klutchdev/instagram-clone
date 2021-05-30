import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/notfound"));
const Dashboard = lazy(() => import("./pages/dashboard"));

export default function App() {
    const { user } = useAuthListener();

    return (
        <UserContext.Provider value={user}>
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route
                            path={Routes.DASHBOARD}
                            component={Dashboard}
                            exact
                        />
                        <Route path={Routes.LOGIN} component={Login} exact />
                        <Route path={Routes.SIGN_UP} component={Signup} exact />
                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}
