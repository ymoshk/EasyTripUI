import PlaceSelection from "./componenets/destination/PlaceSelection";
import DateRangePicker from "../date/DateRangePicker";
import PassengersCount from "./componenets/PassengersCount";
import {Col} from "react-bootstrap";
import PriceRange from "./componenets/price_range/PriceRange";
import TagsList from "./tags/TagsList";
import {favoriteAttractionTags, transportationTags, tripVibesTags} from "./QuestionnaireTags";
import React from "react";

export const questionnaireStages = [
    {
        key: 0,
        header: "Select Destination",
        validatable: true,
        isValid: false,
        data: {}
    }, {
        key: 1,
        header: "Dates Selection",
        validatable: true,
        isValid: true,
        data: {}
    }, {
        key: 2,
        header: "Passengers Count",
        validatable: false,
        isValid: true,
        data: {adultsCount: 1, childrenCount: 0},
    }, {
        key: 3,
        header: "Transportation",
        validatable: false,
        isValid: true,
        data: transportationTags
    }, {
        key: 4,
        header: "Favorite attractions",
        validatable: false,
        isValid: true,
        data: favoriteAttractionTags
    }, {
        key: 5,
        header: "Trip Vibes",
        validatable: false,
        isValid: true,
        data: tripVibesTags
    },
]

export const questionnaireComponents = [
    <PlaceSelection stageIndex={0}/>,
    <DateRangePicker stageIndex={1}/>,
    <PassengersCount stageIndex={2}/>,
    // <Col md={{offset: 2, span: 8}}><PriceRange stageIndex={3}/></Col>,
    <TagsList key={"step3"} count={transportationTags.length} stageIndex={3} imageTag={false} numberPerRow={2}/>,
    <TagsList key={"step4"} count={favoriteAttractionTags.length} stageIndex={4} imageTag={true} numberPerRow={4}/>,
    <TagsList key={"step5"} count={tripVibesTags.length} stageIndex={5} imageTag={true} numberPerRow={2}/>
]
