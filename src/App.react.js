import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Error404} from "./pages";
import HomePage from "./HomePage.react";
import AttractionList from "./components/attraction/AttractionList";
import SaharTest from "./Sahar Tests/SaharTest";
import PassengersCount from "./components/questions/PassengersCount";
import "tabler-react/dist/Tabler.css";
import YotamTest from "./YotamTests/YotamTest";
import SearchDestination from "./components/questions/destination/SearchDestination"

function App(props) {
    return (
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/404" component={Error404}/>
                    <Route exact path="/yotam" component={YotamTest}/>
                    <Route exact path="/attraction" component={AttractionList}/>
                    <Route exact path="/search" component={SearchDestination}/>
                    <Route exact path="/SaharTest" component={SaharTest}/>
                    <Route exact path="/PassengerCount" component={PassengersCount}/>

                    <Route component={Error404}/>
                </Switch>
            </Router>
        </React.StrictMode>
    );
}

export default App;
