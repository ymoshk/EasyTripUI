import React from 'react';
import {Button, Card, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {PlusCircle} from "react-bootstrap-icons";

const FreeTime = (props) => {

    const getHeight = () => {
        return parseInt(props.height);
    }

    const getTransportationIcon = () => {
        getHeight();
        return (
            <div style={{flex: 1}}>
                <OverlayTrigger
                    key={'infoToolTip'}
                    placement={'top'}
                    overlay={
                        <Tooltip id={'tooltip-info'}>
                            Add transportation between the attractions.
                        </Tooltip>
                    }>
                    <Row>
                        <Button onClick={() => {
                        }}
                                style={{backgroundColor: "transparent", border: "none"}} size={"lg"}>
                            <PlusCircle size={30} style={{color: "black"}}/>
                        </Button>
                    </Row>
                </OverlayTrigger>
            </div>
        )
    }

    return (
        <Card as={"div"} style={{
            display: 'flex', flexDirection: 'row',
            alignItems: "center",
            backgroundColor: "transparent",
            border: "solid 0px",
            marginBottom: 0,
            height: props.height
        }}>
            <Card.Body as={"div"}>
                {getTransportationIcon()}
            </Card.Body>
        </Card>
    );
};

export default FreeTime;
