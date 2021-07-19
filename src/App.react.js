import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    Error404
} from "./pages";

import HomePage from "./HomePage.react";

import "tabler-react/dist/Tabler.css";


function App(props) {
    return (
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/404" component={Error404}/>
                    <Route component={Error404}/>
                </Switch>
            </Router>
        </React.StrictMode>
    );
}

export default App;
