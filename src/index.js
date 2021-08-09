// @flow

import React from "react";
import ReactDOM from "react-dom";

import {Provider} from 'react-redux';
import store from "./store/index";

import "./index.css";
import "./c3jscustom.css";

import App from "./App.react";

const rootElement = document.getElementById("root");

if (rootElement) {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        rootElement);
} else {
    throw new Error("Could not find root element to mount to!");
}
