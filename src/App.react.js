import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    Error404
} from "./pages";


import HomePage from "./HomePage.react";

import AttractionList from "./components/attraction/AttractionList";
import 'bootstrap/dist/css/bootstrap.min.css';
import SaharTest from "./Sahar Tests/SaharTest";
import SearchDestination from "./components/SearchDestination";
import StepsCard from "./components/questions/StepsCard";
import "tabler-react/dist/Tabler.css";


function App(props) {
    return (
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/404" component={Error404}/>
                    <Route exact path="/test" component={StepsCard}/>
                    <Route exact path="/attraction" component={AttractionList}/>
                    <Route exact path="/search" component={SearchDestination}/>
                    <Route exact path="/SaharTest" component={SaharTest}/>
                    <Route component={Error404}/>
                </Switch>
            </Router>
        </React.StrictMode>
    );
}

export default App;
