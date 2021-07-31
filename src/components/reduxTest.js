import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Attraction from "./attraction/Attraction";
import {Row, Col} from "react-bootstrap";
import AttractionSmall from "./attraction/AttractionSmall";
import useHttp from "../hooks/UseHttp";
import {attractionActions} from "../store/attraction";
import {useDispatch} from "react-redux";


const reduxTest = () => {
    const itinerary = useSelector(state => state.attraction.itinerary);
    const attractions = useSelector(state => state.attraction.attractionList);
    const dispatch = useDispatch();
    const {isLoading, error, sendRequest: fetchAttractions} = useHttp();

    useEffect(() => {
        const urlAttractions = new URL(process.env.REACT_APP_SERVER_URL.concat('/getCityAttractions'));

        const transformAttraction = (attractionsObj) => {
            console.log(attractionsObj.restaurant);
            dispatch(attractionActions.replace(attractionsObj.restaurant));
        }

        fetchAttractions({url: urlAttractions, method: 'POST', body: {cityName: "Tel Aviv"}}, transformAttraction);
    }, [])

    const itineraryList = itinerary.map((attraction) => <Attraction name={attraction.name}
                                                                    type={attraction.type}
                                                                    image={attraction.image}
                                                                    rating={attraction.rating}
                                                                    userTotalRating={attraction.userTotalRating}
                                                                    closedTemporarily={attraction.isTemporarlyClose}
                                                                    priceRange={attraction.priceLevel}
                                                                    startTime={attraction.startTime}
                                                                    endTime={attraction.endTime}
                                                                    hours={attraction.openingHoursText}
                                                                    address={attraction.address}
                                                                    isRecommended={true}
                                                                    id={attraction.id}
                                                                    phoneNumber={attraction.internationalNumber}
                                                                    website={attraction.website}/>);

    const attractionList = attractions.map((attraction) => <AttractionSmall name={attraction.name}
                                                                            type={attraction.type}
                                                                            image={attraction.image}
                                                                            rating={attraction.rating}
                                                                            userTotalRating={attraction.userTotalRating}
                                                                            closedTemporarily={attraction.closedTemporarily}
                                                                            priceRange={attraction.priceLevel}
                                                                            showImage={false}
                                                                            isRecommended={true}
                                                                            id={attraction.id}/>);

    return <React.Fragment>
        <Row>
            <Col>
                {attractionList}
            </Col>
            <Col>
                {itineraryList}
            </Col>
        </Row>

    </React.Fragment>;
};

export default reduxTest;