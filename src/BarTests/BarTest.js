import React from "react";

import "bootstrap/dist/css/bootstrap.css";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function App() {
    const renderTooltip = props => (
        <Tooltip {...props}>Tooltip for the register button</Tooltip>
    );

    return (
        <div className="App" style={{marginTop:100, marginLeft:100}}>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
                <Button>Register</Button>
            </OverlayTrigger>
        </div>
    );
}
