import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "./constants/routes";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/notfound"));
const Dashboard = lazy(() => import("./pages/dashboard"));

export default function App() {
    return (
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route path={Routes.DASHBOARD} component={Dashboard} />
                    <Route path={Routes.LOGIN} component={Login} />
                    <Route path={Routes.SIGN_UP} component={Signup} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}
