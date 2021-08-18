import React, {useContext, useEffect, useState} from 'react';
import useHttp from "../../../hooks/UseHttp";
import LoaderContext from "../../utils/loader/LoaderContext";
import SweetAlert from "react-bootstrap-sweetalert";
import StaticTimeLine from "./time.line/StaticTimeLine";

const StaticItinerary = (props) => {

    const {isLoading, error, sendRequest: getItinerary} = useHttp();
    let itinerary = null;
    const loader = useContext(LoaderContext);
    const url = process.env.REACT_APP_SERVER_URL.concat('/getItinerary');
    const [showErrorAlert, setShowErrorAlert] = useState(false);

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
                itinerary = result
            }).then();
    }, [getItinerary])


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
            <div>
                <StaticTimeLine itinerary={itinerary}/>
            </div>
        </>
    );
}


export default StaticItinerary;