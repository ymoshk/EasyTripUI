import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    Error404
} from "./pages";


import HomePage from "./HomePage.react";

import AttractionList from "./components/attraction/AttractionList";
import SaharTest from "./Sahar Tests/SaharTest";
import SearchDestination from "./components/SearchDestination";
import StepsCard from "./components/questions/StepsCard";
import PassengersCount from "./components/questions/PassengersCount";
import MapWrapper from "./components/utils/MapWrapper";

import "tabler-react/dist/Tabler.css";
import Timeline from "./components/Timeline";

function App(props) {
    return (
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/404" component={Error404}/>
                    <Route exact path="/test" component={StepsCard}/>
                    <Route exact path="/timeline" component={Timeline}/>
                    <Route exact path="/search" component={SearchDestination}/>
                    <Route exact path="/SaharTest" component={SaharTest}/>
                    <Route exact path="/PassengerCount" component={PassengersCount}/>
                    <Route exact path="/map" component={MapWrapper}/>

                    <Route component={Error404}/>
                </Switch>
            </Router>
        </React.StrictMode>
    );
}

export default App;
