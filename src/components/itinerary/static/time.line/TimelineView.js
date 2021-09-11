import React, {useState} from 'react';
import 'react-vertical-timeline-component/style.min.css';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {Col, Row} from "react-bootstrap";

import {
    BiHotel,
    FaMapMarkedAlt,
    FaRegLaughBeam,
    FaUmbrellaBeach,
    FiShoppingCart,
    GiAquarium,
    GiBinoculars,
    GiMartini,
    GiMeal,
    GiMonaLisa,
    GiPokerHand,
    GiShoppingCart,
    IoBeer,
    IoCafeOutline,
    MdFlight,
    MdPets,
    MdSpa,
    RiGalleryLine,
    RiMickeyLine,
    TiTree
} from "react-icons/all";
import AttractionTimeline from "../../attraction/timeline/AttractionTimeline";
import DayPicker from "../../dayPicker/DayPicker";
import {Bus, Car, Walk} from "tabler-icons-react";

// https://www.npmjs.com/package/react-vertical-timeline-component

const TimelineView = (props) => {

    const itineraryDays = props.itinerary.itineraryDays;
    const [currentDay, setCurrentDay] = useState(itineraryDays[0]);
    console.log(currentDay);

    const getDates = () => {
        const formatDate = (date) => {
            if (date !== undefined) {
                return date.year + '-' + date.month + '-' + date.day;
            }
        }

        return itineraryDays.map(day => formatDate(day.date))
    }

    let dayChangedHandler = (index) => {
        setCurrentDay(itineraryDays[index]);
    };

    let getAttractionIcon = (type) => {
        // icons from https://react-icons.github.io/react-icons/search?q=zoo
        type = type.replaceAll(' ', '');

        let map = {
            Bar: <IoBeer/>,
            Restaurant: <GiMeal/>,
            Aquarium: <GiAquarium/>,
            Cafe: <IoCafeOutline/>,
            Beach: <FaUmbrellaBeach/>,
            Casino: <GiPokerHand/>,
            ArtGallery: <RiGalleryLine/>,
            Hotel: <BiHotel/>,
            Market: <FiShoppingCart/>,
            Museum: <GiMonaLisa/>,
            NightClub: <GiMartini/>,
            ShoppingMall: <GiShoppingCart/>,
            TopSights: <GiBinoculars/>,
            TouristAttraction: <FaMapMarkedAlt/>,
            Zoo: <MdPets/>,
            AmusementPark: <RiMickeyLine/>,
            Park: <TiTree/>,
            Spa: <MdSpa/>
        };

        return map[type] !== undefined ? map[type] : <FaRegLaughBeam/>;
    }


    const getActivityStartTime = (activity) => {
        let startTimeAsDate = Date.parse('December 17, 1995 ' + activity.startTime + ":00");
        let activityRealTime = new Date(startTimeAsDate + activity.transportation.data[activity.transportation.type] * 60 * 1000);
        let res = "";

        res += (activityRealTime.getHours() + 1) < 10 ? "0" + activityRealTime.getHours() : activityRealTime.getHours();
        res += ":";
        res += (activityRealTime.getMinutes() + 1) < 10 ? "0" + activityRealTime.getMinutes() : activityRealTime.getMinutes();

        return res;
    }

    const mapAttraction = (activity, index) => {
        let res = [];
        let innerComponent;
        let icon, transportIcon;
        let isTransport = false;
        let isFlight = false;

        if (activity.type === "ATTRACTION") {
            innerComponent = <AttractionTimeline attraction={activity.attraction}/>
            icon = getAttractionIcon(activity.attraction.type);

            if (activity.transportation !== undefined) {
                if (activity.transportation.type === "TRANSIT") {
                    isTransport = true;
                    transportIcon = <Bus color={"white"}/>
                } else if (activity.transportation.type === "CAR") {
                    isTransport = true;
                    transportIcon = <Car color={"white"}/>
                } else if (activity.transportation.type === "WALK") {
                    isTransport = true;
                    transportIcon = <Walk color={"white"}/>
                }
            }
        } else if (activity.type === "FLIGHT") {
            isFlight = true;
            icon = <MdFlight/>
        } else if (activity.type === "FREE_TIME") {
            return;
        }

        if (isTransport) {
            return (
                <>
                    <VerticalTimelineElement
                        key={index}
                        className={""}
                        date={activity.transportation.data[activity.transportation.type] + " minutes"}
                        iconStyle={{background: '#467fcf', color: '#fff'}}
                        icon={transportIcon}
                    >
                    </VerticalTimelineElement>
                    <VerticalTimelineElement style={{display: "none"}}/>
                    <VerticalTimelineElement
                        key={index}
                        className={"vertical-timeline-element--work"}
                        date={getActivityStartTime(activity) + " - " + activity.endTime}
                        iconStyle={{background: '#467fcf', color: '#fff'}}
                        icon={icon}
                    >
                        {innerComponent}
                    </VerticalTimelineElement>
                </>
            )
        } else {
            return (
                <VerticalTimelineElement
                    key={index}
                    className={isFlight ? "" : "vertical-timeline-element--work"}
                    date={activity.startTime + " - " + activity.endTime}
                    iconStyle={{background: '#467fcf', color: '#fff'}}
                    icon={icon}
                >
                    {innerComponent}
                </VerticalTimelineElement>
            )
        }
    };

    return (
        <>
            <Row>
                <Col/>
                <Col md={10}>
                    <DayPicker onDayChange={dayChangedHandler} dates={getDates()}/>
                </Col>
                <Col/>
            </Row>
            <Row>
                {currentDay.activities.length > 1 && <VerticalTimeline>
                    {currentDay.activities.map((activity, index) => mapAttraction(activity, index))}
                </VerticalTimeline>}
                {
                    currentDay.activities.length === 1 &&
                    <div style={{textAlign: "center"}}>
                        <h3>Couldn't find any relevant attractions</h3>
                    </div>
                }
            </Row>
        </>
    );
};

export default TimelineView;
