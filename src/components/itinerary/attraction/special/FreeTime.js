import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import plus from "../../../../images/icons/add-button.png"
import {useDispatch} from "react-redux";
import {itineraryActions} from "../../../../store/itinerary-slice";
import useHttp from "../../../../hooks/UseHttp";
import LoaderContext from "../../../utils/loader/LoaderContext";
import HelpersContext from "../../ChangeHourContext";
import SweetAlert from "react-bootstrap-sweetalert";

const FreeTime = (props) => {
    const dispatch = useDispatch();
    const loader = useContext(LoaderContext);
    const itineraryContext = useContext(HelpersContext);
    const {isLoading, error, sendRequest: fetchTransportation} = useHttp();
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    const onAddTransportationHandler = () => {
        if (props.srcLocation.lat === null || props.srcLocation.lng ||
            props.destLocation.lat === null || props.destLocation.lng) {
            const data = {
                srcLat: props.srcLocation.lat.toString(),
                srcLng: props.srcLocation.lng.toString(),
                destLat: props.destLocation.lat.toString(),
                destLng: props.destLocation.lng.toString()
            }

            fetchTransportation({
                url: process.env.REACT_APP_SERVER_URL + "/getTransportation",
                method: "POST",
                credentials: 'include',
                body: data
            }, result => updateSlice(result)).then();
        } else {
            setShowErrorMsg(true);
        }
    }

    const updateSlice = (locationDataReceived) => {
        if (locationDataReceived === undefined ||
            locationDataReceived.WALK === undefined ||
            locationDataReceived.TRANSIT === undefined ||
            locationDataReceived.CAR === undefined) {
            setShowErrorMsg(true);
        } else {
            const data = {
                index: props.myIndex,
                locationData: locationDataReceived,
                srcData: {
                    srcLat: props.srcLocation.lat,
                    srcLng: props.srcLocation.lng
                }
            }

            dispatch(itineraryActions.addTransportation(data))
        }
    }

    useEffect(() => {
        if (isLoading) {
            loader.setShow(true)
        } else {
            loader.setShow(false);
        }
    }, [isLoading])

    useEffect(() => {
        if (error != null) {
            setShowErrorMsg(true);
        }
    }, [error])


    const getIconRow = () => {
        return <Row
            onMouseEnter={() => {
                itineraryContext.isOnButton = true;
            }} onMouseLeave={() => {
            itineraryContext.isOnButton = false;
        }}>
            <Button onClick={onAddTransportationHandler}
                    style={{backgroundColor: "transparent", border: "none"}} size={"lg"}>
                <Image src={plus}/>
                {/*<PlusCircle size={30} color={"black"}/>*/}
            </Button>
        </Row>
    }

    const getTransportationIcon = () => {

        return (
            <div style={{position: "relative", zIndex: 900, flex: 1}}>
                <OverlayTrigger
                    key={'infoToolTip'}
                    placement={'top'}
                    overlay={
                        <Tooltip id={'tooltip-info'}>
                            Add transportation between the attractions.
                        </Tooltip>
                    }>
                    {getIconRow()}
                </OverlayTrigger>
            </div>
        )
    }

    const actionFailedAlert = () => {
        return <SweetAlert
            danger
            title="Error!"
            timeout={2000}
            onConfirm={() => {
                setShowErrorMsg(false);
            }}
        >
            The last operation failed due to an unknown error.
        </SweetAlert>
    }

    return (
        <>
            {showErrorMsg && actionFailedAlert()}
            <Card as={"div"} style={{
                display: 'flex', flexDirection: 'row',
                alignItems: "center",
                backgroundColor: "transparent",
                border: "solid 0px",
                marginBottom: 0,
                height: props.height
            }}>
                <Card.Body as={"div"}>
                    {props.transportation && getTransportationIcon()}
                </Card.Body>
            </Card>
        </>
    );
};

export default FreeTime;
