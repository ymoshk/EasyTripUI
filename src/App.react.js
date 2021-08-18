import * as React from "react";
import {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Error404} from "./pages";
import HomePage from "./HomePage.react";
import MapWrapper from "./components/utils/MapWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import "tabler-react/dist/Tabler.css";
import LoaderComponent from "./components/utils/loader/LoaderComponent";
import LoaderContext from "./components/utils/loader/LoaderContext";
import DailyCheckout from "./Sahar Tests/DailyCheckout";
import SaharTest from "./Sahar Tests/SaharTest";
import styles from "./App.module.css"
import DailyPlanner from "./components/itinerary/DailyPlanner";
import Questionnaire from "./components/questions/Questionnaire";
import Favicon from "react-favicon";
import icon from "./images/logo/favicon.ico"
import LayoutRoute from "./layout/LayoutRoute";


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
            <div style={{backgroundColor: "white"}} className={showLoader ? styles.fade : styles.regular}>
                <Favicon url={icon}/>
                <React.StrictMode>
                    <BrowserRouter>
                        <Switch>
                            <LayoutRoute exact path="/" component={HomePage}/>
                            <LayoutRoute exact path="/questionnaire" component={Questionnaire}/>
                            <LayoutRoute exact path="/itinerary" component={DailyPlanner}/>
                            <LayoutRoute exact path="/map" component={MapWrapper}/>
                            <LayoutRoute exact path="/loader" component={LoaderComponent}/>
                            <LayoutRoute exact path="/sahar" component={DailyCheckout}/>
                            <LayoutRoute exact path="/saharTest" component={SaharTest}/>
                            <Route exact path="/404" component={Error404}/>
                            <Route component={Error404}/>
                        </Switch>
                    </BrowserRouter>
                </React.StrictMode>
            </div>
        </LoaderContext.Provider>
    );
}

export default App;
