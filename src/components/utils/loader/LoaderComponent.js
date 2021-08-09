import React, {useContext, useState} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styles from "./LoaderComponenet.module.css"
import loaderContext from "./LoaderContext"

const LoaderComponent = () => {
    const showLoaderContext = useContext(loaderContext);

    return (
        <div className={styles.load}>
            <Loader visible={showLoaderContext.show} type="Puff" color="#00BFFF" height={200} width={200}/>
        </div>
    );
};

export default LoaderComponent;
