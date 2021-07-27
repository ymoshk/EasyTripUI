import React from 'react';
import styles from "./Attraction.module.css";
import {CircleCheck} from "tabler-icons-react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const RecommendedIcon = () => {

    const renderTooltip = props => (
        <Tooltip id="Icon-tooltip" {...props}>
            Recommended
        </Tooltip>
    );

    return (

        <OverlayTrigger
            placement="bottom"
            delay={{show: 250, hide: 400}}
            overlay={renderTooltip}
        >
            <span>
                <CircleCheck className={styles.icon}
                             strokeWidth={2}
                             color={'#405DE6'}
                />
            </span>
        </OverlayTrigger>

    );
};

export default RecommendedIcon;