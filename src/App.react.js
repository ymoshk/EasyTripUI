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
import AttractionSmallList from "./components/attraction/AttractionSmallList";
import StarRating from "./components/utils/StarRating";

import "tabler-react/dist/Tabler.css";

function App(props) {
    return (
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/404" component={Error404}/>
                    <Route exact path="/test" component={StepsCard}/>
                    <Route exact path="/attractions" component={AttractionList}/>
                    <Route exact path="/attractionsSmall" component={AttractionSmallList}/>
                    <Route exact path="/search" component={SearchDestination}/>
                    <Route exact path="/SaharTest" component={SaharTest}/>
                    <Route exact path="/PassengerCount" component={PassengersCount}/>
                    <Route exact path="/map" component={MapWrapper}/>
                    <Route exact path="/rating" component={StarRating}/>


                    <Route component={Error404}/>
                </Switch>
            </Router>
        </React.StrictMode>
    );
}

export default App;
