import PlaceSelection from "./componenets/destination/PlaceSelection";
import DateRangePicker from "../date/DateRangePicker";
import PassengersCount from "./componenets/PassengersCount";
import {Col} from "react-bootstrap";
import PriceRange from "./componenets/price_range/PriceRange";
import TagsList from "./tags/TagsList";
import {favoriteAttractionTags, transportationTags, tripVibesTags} from "./QuestionnaireTags";
import React from "react";
import FindFlight from "../flight/FindFlight";
import vacationMap from "../../images/vacationMap.jpg"
import cityMadrid from "../../images/cityMadrid.jpg"

export const questionnaireStages = [
    {
        key: 0,
        header: "Select Destination",
        text: "Where would you like to go?",
        validatable: true,
        isValid: false,
        data: {}
    }, {
        key: 1,
        header: "Dates Selection",
        text: "When would you like to travel?",
        validatable: true,
        isValid: true,
        data: {}
    }, {
        key: 2,
        header: "Passengers Count",
        text: "How many people are going on the trip?",
        validatable: false,
        isValid: true,
        data: {adultsCount: 1, childrenCount: 0},
    }, {
        key: 3,
        header: "Find flights - optional",
        text: "Enter your origin (country and then city) to find flights",
        validatable: false,
        isValid: true,
        data: {}
    }, {
        key: 4,
        header: "Transportation",
        text: "What is your mode of transportation at your destination?",
        validatable: false,
        isValid: true,
        data: transportationTags
    }, {
        key: 5,
        header: "Favorite attractions",
        text: "What do you want to do there?",
        validatable: false,
        isValid: true,
        data: favoriteAttractionTags
    }, {
        key: 6,
        header: "Trip Vibes",
        text: "What’s your travel vibe? (choose one option from each line)",
        validatable: false,
        isValid: true,
        data: tripVibesTags
    },
]

export const questionnaireComponents = [
    <PlaceSelection key={"step0"} stageIndex={0} image={vacationMap}
                    countryPlaceHolder={"Enter destination (country)"} cityPlaceHolder={"Enter destination (city)"}/>,
    <DateRangePicker key={"step1"} stageIndex={1}/>,
    <PassengersCount key={"step3"} stageIndex={2}/>,
    <FindFlight key={"step4"} stageIndex={3} image={cityMadrid}
                countryPlaceHolder={"Country origin"} cityPlaceHolder={"City origin"}/>,
    <TagsList key={"step5"} count={transportationTags.length} stageIndex={4} imageTag={true} numberPerRow={2}/>,
    <TagsList key={"step6"} count={favoriteAttractionTags.length} stageIndex={5} imageTag={true} numberPerRow={4}/>,
    <TagsList key={"step7"} count={tripVibesTags.length} stageIndex={6} imageTag={true} numberPerRow={3}/>
]
