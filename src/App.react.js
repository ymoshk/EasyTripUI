import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Error404} from "./pages";
import HomePage from "./HomePage.react";
import AttractionList from "./components/itinerary/attraction/AttractionList";
import PassengersCount from "./components/questions/PassengersCount";
import MapWrapper from "./components/utils/MapWrapper";
import StarRating from "./components/utils/StarRating";
import AttractionSmallList from "./components/itinerary/attraction/AttractionSmallList";
import 'bootstrap/dist/css/bootstrap.min.css';
import "tabler-react/dist/Tabler.css";
import YotamTest from "./YotamTests/YotamTest";
import SearchDestination from "./components/questions/destination/SearchDestination"
import reduxTest from "./components/reduxTest";
import HoursBar from "./components/itinerary/hoursBar/HoursBar";
import DailyPlanner from "./components/itinerary/DailyPlanner";

function App(props) {
    return (
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/404" component={Error404}/>
                    {/*<Route exact path="/test" component={StepsCard}/>*/}
                    <Route exact path="/attractions" component={AttractionList}/>
                    <Route exact path="/attractionsSmall" component={AttractionSmallList}/>
                    <Route exact path="/yotam" component={YotamTest}/>
                    <Route exact path="/hoursBar" component={HoursBar}/>
                    <Route exact path="/search" component={SearchDestination}/>
                    <Route exact path="/SaharTest" component={DailyPlanner}/>
                    <Route exact path="/PassengerCount" component={PassengersCount}/>
                    <Route exact path="/map" component={MapWrapper}/>
                    <Route exact path="/rating" component={StarRating}/>
                    <Route exact path="/reduxTest" component={reduxTest}/>
                    <Route component={Error404}/>
                </Switch>
            </Router>
        </React.StrictMode>
    );
}

export default App;
