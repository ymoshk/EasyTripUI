import React, {useContext, useEffect, useState} from 'react';
import useHttp from "../../../hooks/UseHttp";
import LoaderContext from "../../utils/loader/LoaderContext";
import SweetAlert from "react-bootstrap-sweetalert";
import StaticTimeline from "./time.line/StaticTimeline";
import Checkout from "../../../Sahar Tests/Checkout";
import ViewSelection from "./ViewSelection";
import styles from "./StaticItinerary.module.css";

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
                method: "POST",
                body: {id: props.itineraryId}
            },
            (result) => {
                setItinerary(result);
            }).then();
    }, [getItinerary])

    const getViewType = () => {
        switch (viewType) {
            case 0:
                return <StaticTimeline itinerary={itinerary}/>;
            case 1:
                return <Checkout itinerary={itinerary}/>;
            default:
                return "";
        }
    }


    return (
        <>
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
            <ViewSelection onChangeViewHandlder={setViewType}/>
            <div className={styles.grayBackground}>
                {itinerary && getViewType()}
            </div>
        </>
    );
}


export default StaticItinerary;
