import React, {useState} from 'react';
import 'react-vertical-timeline-component/style.min.css';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {Caravan} from "tabler-icons-react";
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
    GiPokerHand,
    GiShoppingCart,
    IoBeer,
    IoCafeOutline,
    IoFastFoodOutline,
    MdPets,
    RiGalleryLine
} from "react-icons/all";
import AttractionTimeline from "../../attraction/timeline/AttractionTimeline";
import DayPicker from "../../dayPicker/DayPicker";

// https://www.npmjs.com/package/react-vertical-timeline-component

const StaticTimeLine = (props) => {

        const itineraryDays = props.itinerary.itineraryDays;
        const [currentDay, setCurrentDay] = useState(itineraryDays[0]);

        const getDates = () => {
            const formatDate = (date) => {
                if (date !== undefined) {
                    console.log(date);
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
                Restaurant: <IoFastFoodOutline/>,
                Aquarium: <GiAquarium/>,
                Cafe: <IoCafeOutline/>,
                Beach: <FaUmbrellaBeach/>,
                Casino: <GiPokerHand/>,
                ArtGallery: <RiGalleryLine/>,
                Hotel: <BiHotel/>,
                Market: <FiShoppingCart/>,
                Museum: <RiGalleryLine/>,
                NightClub: <GiMartini/>,
                ShoppingMall: <GiShoppingCart/>,
                TopSights: <GiBinoculars/>,
                TouristAttraction: <FaMapMarkedAlt/>,
                Zoo: <MdPets/>
            };

            return map[type] !== undefined ? map[type] : <FaRegLaughBeam/>;
        }

        const mapAttractions = (activity, index) => {
            let innerComponent;
            let icon = <Caravan color={'white'}/>;

            if (activity.type === "ATTRACTION") {
                innerComponent = <AttractionTimeline attraction={activity.attraction}/>
                icon = getAttractionIcon(activity.attraction.type)
            } else if (activity.type === "MOBILITY") {
                //TODO - handle mobility
            } else if (activity.type === "FREE_TIME") {
                return;
            }

            return (
                <VerticalTimelineElement
                    key={index}
                    className="vertical-timeline-element--work"
                    date={activity.startTime + " - " + activity.endTime}
                    iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                    icon={icon}
                >
                    {innerComponent}
                </VerticalTimelineElement>
            )
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
                    <VerticalTimeline>
                        {currentDay.activities.map((activity, index) => mapAttractions(activity, index))}

                        {/*/!*more examples:*!/*/}
                        {/*<VerticalTimelineElement*/}
                        {/*    className="vertical-timeline-element--education"*/}
                        {/*    date="2002 - 2006"*/}
                        {/*    iconStyle={{background: 'rgb(233, 30, 99)', color: '#fff'}}*/}
                        {/*    icon={undefined}*/}
                        {/*>*/}
                        {/*    <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media*/}
                        {/*        Visual Imaging</h3>*/}
                        {/*    <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>*/}
                        {/*    <p>*/}
                        {/*        Creative Direction, Visual Design*/}
                        {/*    </p>*/}
                        {/*</VerticalTimelineElement>*/}
                        {/*<VerticalTimelineElement*/}
                        {/*    iconStyle={{background: 'rgb(16, 204, 82)', color: '#fff'}}*/}
                        {/*    icon={undefined}*/}
                        {/*/>*/}
                    </VerticalTimeline>
                </Row>
            </>
        );
    }
;

export default StaticTimeLine;
