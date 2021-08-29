import React from 'react';
import NewWrapper from "./NewWrapper";
import {Route} from "react-router-dom";

const LayoutRoute = (props) => {
    return (
        <NewWrapper user={props.user}>
            <Route exact path={props.path} component={props.component}/>
        </NewWrapper>
    );
};

export default LayoutRoute;
