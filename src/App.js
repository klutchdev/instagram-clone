import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "./constants/routes";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));

function App() {
    return (
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route path={Routes.LOGIN} component={Login} />
                    <Route path={Routes.SIGN_UP} component={Signup} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
