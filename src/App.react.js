import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Error404} from "./pages";
import HomePage from "./HomePage.react";
import MapWrapper from "./components/utils/MapWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import "tabler-react/dist/Tabler.css";
import YotamTest from "./YotamTests/YotamTest";
import DailyPlanner from "./components/itinerary/DailyPlanner";

function App(props) {
    return (
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/404" component={Error404}/>
                    <Route exact path="/yotam" component={YotamTest}/>
                    <Route exact path="/itinerary" component={DailyPlanner}/>
                    <Route exact path="/map" component={MapWrapper}/>
                    <Route component={Error404}/>
                </Switch>
            </Router>
        </React.StrictMode>
    );
}

export default App;
