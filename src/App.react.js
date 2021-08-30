import * as React from "react";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MapWrapper from "./components/utils/MapWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import "tabler-react/dist/Tabler.css";
import LoaderComponent from "./components/utils/loader/LoaderComponent";
import LoaderContext from "./components/utils/loader/LoaderContext";
import SaharTest from "./Sahar Tests/SaharTest";
import styles from "./App.module.css"
import DailyPlanner from "./components/itinerary/DailyPlanner";
import Questionnaire from "./components/questions/Questionnaire";
import Favicon from "react-favicon";
import icon from "./images/logo/favicon.ico"
import LayoutRoute from "./layout/LayoutRoute";
import Error404 from "./pages/404.react";
import DailyCheckout from "./components/itinerary/static/checkout/DailyCheckout";
import HomePage from "./pages/homePage/HomePage";
import {useDispatch, useSelector} from "react-redux";
import {fetchLoggedInUser} from "./store/auth-actions";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Logout from "./pages/auth/Logout";
import Flight from "./components/flight/Flight";
import Segment from "./components/flight/Segment";


function App() {
    const [showLoader, setShowLoader] = useState(false);
    const dispatch = useDispatch();
    const loggedInUserData = useSelector(state => state.authData.auth)

    useEffect(() => {
        if (loggedInUserData === undefined) {
            dispatch(fetchLoggedInUser());
        }
    }, [loggedInUserData])

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
            <div style={{height: "100%", backgroundColor: "white"}}
                 className={showLoader ? styles.fade : styles.regular}>
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
                            <LayoutRoute exact path="/login" component={Login}/>
                            <LayoutRoute exact path="/registration" component={Registration}/>
                            <LayoutRoute exact path="/map" component={MapWrapper}/>
                            <LayoutRoute exact path="/flight" component={Flight}/>
                            <LayoutRoute exact path="/segment" component={Segment}/>
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
