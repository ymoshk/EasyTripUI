import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    Error404
} from "./pages";

import QuestionCard from "./components/questions/QuestionCard";

import HomePage from "./HomePage.react";

import "tabler-react/dist/Tabler.css";
import AttractionList from "./components/attraction/AttractionList";
import SingleTag from "./components/tags/SingleTag";
import 'bootstrap/dist/css/bootstrap.min.css';
import SaharTest from "./Sahar Tests/SaharTest";
import SearchDestination from "./components/SearchDestination";


function App(props) {
    return (
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/404" component={Error404}/>
                    <Route exact path="/test" component={QuestionCard}/>
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
