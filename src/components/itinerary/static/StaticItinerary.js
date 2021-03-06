import React, {useContext, useEffect, useState} from 'react';
import useHttp from "../../../hooks/UseHttp";
import LoaderContext from "../../utils/loader/LoaderContext";
import SweetAlert from "react-bootstrap-sweetalert";
import TimelineView from "./time.line/TimelineView";
import ViewSelection from "./ViewSelection";
import styles from "./StaticItinerary.module.css";
import MapView from "./map.view/MapView";
import ErrorSweetAlert from "../../utils/ErrorSweetAlert";
import Checkout from "./checkout/Checkout";
import * as Constants from "../Constants";
import {Container, Row} from "react-bootstrap";

const StaticItinerary = (props) => {

    const {isLoading, error, sendRequest: getItinerary} = useHttp();
    const [itinerary, setItinerary] = useState();
    const loader = useContext(LoaderContext);
    const url = process.env.REACT_APP_SERVER_URL.concat('/getItinerary');
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [viewType, setViewType] = useState(0);

    useEffect(() => {
        if (error !== null) {
            setShowErrorAlert(true);
        } else {
            setShowErrorAlert(false);
        }
    }, [error])

    useEffect(() => {
        if (isLoading) {
            loader.setShow(true)
        } else {
            loader.setShow(false);
        }
    }, [isLoading])

    useEffect(() => {
        getItinerary({
                url: url,
                credentials: 'include',
                method: "POST",
                body: {id: localStorage.getItem(Constants.ITINERARY_ID_STORAGE)}
            },
            (result) => {
                setItinerary(result);
            }).then();
    }, [getItinerary])

    const getViewType = () => {
        switch (viewType) {
            case 0:
                return <TimelineView itinerary={itinerary}/>;
            case 1:
                return <Checkout itinerary={itinerary}/>;
            case 2:
                return <MapView itinerary={itinerary}/>
            default:
                return <ErrorSweetAlert/>
        }
    }

    return (
        <>
            <Container fluid style={{
                height: "100%", width: "100%", padding: 0
            }}>
                {showErrorAlert && <SweetAlert
                    danger
                    onConfirm={() => {
                        setShowErrorAlert(false);
                        window.location = '/'
                    }}
                    onCancel={() => {
                        setShowErrorAlert(false);
                        window.location = '/'
                    }}
                    timeout={3000}
                    title={"Error!"}>
                    We couldn't load the requested itinerary.
                </SweetAlert>}
                <Row>
                    <ViewSelection onChangeViewHandlder={setViewType}/>
                </Row>
                <div className={styles.grayBackground}>
                    {itinerary && getViewType()}
                </div>
            </Container>
        </>
    );
}


export default StaticItinerary;
