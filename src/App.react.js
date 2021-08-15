import * as React from "react";
import {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Error404} from "./pages";
import HomePage from "./HomePage.react";
import MapWrapper from "./components/utils/MapWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import "tabler-react/dist/Tabler.css";
import YotamTest from "./YotamTests/YotamTest";
import LoaderComponent from "./components/utils/loader/LoaderComponent";
import LoaderContext from "./components/utils/loader/LoaderContext";
import DailyCheckout from "./Sahar Tests/DailyCheckout";
import DailyDnd from "./components/itinerary/DailyDnd";
import Checkout from "./Sahar Tests/Checkout";
import CheckoutAttraction from "./Sahar Tests/CheckoutAttraction";
import SaharTest from "./Sahar Tests/SaharTest";
import styles from "./App.module.css"
import DailyPlanner from "./components/itinerary/DailyPlanner";

function App() {
    const [showLoader, setShowLoader] = useState(false);

    return (
        <LoaderContext.Provider
            value={
                {
                    show: showLoader,
                    setShow: (value) => {
                        setShowLoader(value);
                    }
                }
            }>
            <LoaderComponent/>
            <div className={showLoader ? styles.fade : styles.regular}>
                <React.StrictMode>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/404" component={Error404}/>
                            <Route exact path="/yotam" component={YotamTest}/>
                            <Route exact path="/itinerary" component={DailyPlanner}/>
                            <Route exact path="/map" component={MapWrapper}/>
                            <Route exact path="/loader" component={LoaderComponent}/>
                            <Route exact path="/sahar" component={DailyCheckout}/>
                            <Route exact path="/saharTest" component={SaharTest}/>
                            <Route component={Error404}/>
                        </Switch>
                    </Router>
                </React.StrictMode>
            </div>
        </LoaderContext.Provider>
    );
}

export default App;
