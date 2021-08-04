import React, {useContext, useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import HelpersContext from "./ChangeHourContext"
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import AttractionContainer from "./attraction/AttractionContainer";

import EiffelTour from "../../images/EiffelTour.jpg";
import louvre from "../../images/louvre.jpg";
import nortedame from "../../images/nortedame.jpg";

const DailyDnd = (props) => {

    const HOURS_PER_DAY = 17;
    const DUMMY_ATTRACTIONS = [{
        name: "Eiffel Tower",
        id: 1,
        type: "Must See",
        rating: 4.7,
        userTotalRating: 358,
        image: {url: EiffelTour, height: 1025, width: 616},
        closedTemporarily: false,
        priceRange: 3,
        startTime: '08:00',
        endTime: '9:45',
        phoneNumber: "+1234567899",
        website: "https://www.google.com",
        hours: {
            sunday: '9am-6pm',
            monday: '9am-6pm',
            tuesday: '9am-6pm',
            wednesday: '9am-6pm',
            thursday: '9am-6pm',
            friday: '9am-6pm',
            saturday: 'Closed'
        },
        lat: 48.8584,
        lng: 2.2945,
        address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
        isRecommended: true
    },
        // {
        //     name: "Louvre",
        //     id: 4.5,
        //     type: "Art",
        //     rating: 2.2,
        //     userTotalRating: 123,
        //     image: {url: louvre, height: 780, width: 1280},
        //     closedTemporarily: true,
        //     priceRange: 1,
        //     startTime: '12:00',
        //     endTime: '12:30',
        //     hours: {
        //         sunday: '9am-6pm',
        //         monday: '9am-6pm',
        //         tuesday: '9am-6pm',
        //         wednesday: '9am-6pm',
        //         thursday: '9am-6pm',
        //         friday: '9am-6pm',
        //         saturday: 'Closed'
        //     },
        //     lat: 48.8606,
        //     lng: 2.3376,
        //     address: "Rue de Rivoli, 75001 Paris, France"
        // },
        // {
        //     name: "notre dame",
        //     id: 3,
        //     type: "Art",
        //     rating: 3.5,
        //     userTotalRating: 123,
        //     image: {url: nortedame, height: 868, width: 636},
        //     closedTemporarily: false,
        //     priceRange: 1,
        //     startTime: '12:00',
        //     endTime: '12:30',
        //     hours: {
        //         sunday: '9am-6pm',
        //         monday: '9am-6pm',
        //         tuesday: '9am-6pm',
        //         wednesday: '9am-6pm',
        //         thursday: '9am-6pm',
        //         friday: '9am-6pm',
        //         saturday: 'Closed'
        //     },
        //     lat: 48.8530,
        //     lng: 2.3499,
        //     address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France"
        // }
    ];


    const [componentsOrder, setOrder] = useState(DUMMY_ATTRACTIONS.map(attraction => <AttractionContainer
        name={attraction.name}
        type={attraction.type}
        image={attraction.image}
        rating={attraction.rating}
        userTotalRating={attraction.userTotalRating}
        closedTemporarily={attraction.closedTemporarily}
        priceRange={attraction.priceRange}
        startTime={attraction.startTime}
        endTime={attraction.endTime}
        hours={attraction.hours}
        address={attraction.address}
        isRecommended={attraction.isRecommended}
        calcHeight={true}
        phoneNumber={attraction.phoneNumber}
        website={attraction.website}
        attraction={attraction}
        id={attraction.id}/>));


    function mapComponent(component, index) {
        return (
            <Draggable isDragDisabled={helpersContext.isDragDisabled} draggableId={index.toString()} index={index}>
                {provided => (
                    <div onMouseDown={(e) => onDragStart(index, e)}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={provided.innerRef}
                    >
                        {component}
                    </div>
                )}
            </Draggable>
        );
    }


    function onDragEndEventHandler(res) {
        const {destination, source} = res;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }


        let newArray = componentsOrder;
        let tmp = newArray[source.index];
        newArray.splice(source.index, 1);
        newArray.splice(destination.index, 0, tmp);

        setOrder(newArray);
    }


    const [mousePosition, setMousePosition] = useState(null);
    const [draggedId, setDraggedId] = useState(null);
    const [draggedStatPos, setDraggedStartPos] = useState(null);
    const [pixelPerMinute, setPixelPerMinutes] = useState(-1);
    const [minutesToAdd, setMinutesToAdd] = useState(null);


    const updateMousePosition = (e) => {
        setMousePosition(e.pageY)
    }

    const onDragStart = (index, e) => {
        setDraggedId(index);
        setDraggedStartPos(e.pageY)
    }

    const onStopDrag = () => {
        if (draggedId !== undefined && draggedId !== null && minutesToAdd !== undefined) {
            console.log(DUMMY_ATTRACTIONS[draggedId].name);
            console.log(DUMMY_ATTRACTIONS[draggedId].startTime);
            console.log(DUMMY_ATTRACTIONS[draggedId].endTime);
            console.log(minutesToAdd);
        }

        // TODO fire the update event
        setDraggedId(null);
        setDraggedStartPos(null);
        setMinutesToAdd(null);
    }

    const helpersContext = useContext(HelpersContext);

    useEffect(() => {
        if (draggedId !== null) {
            let diff = parseInt((mousePosition - draggedStatPos) / pixelPerMinute);
            setMinutesToAdd(diff);

            if (!helpersContext.isDragDisabled) {
                helpersContext.changeHoursFunc(diff);
            } else {
                helpersContext.changeEndHourFunc(diff);
            }
        }
    }, [mousePosition])


    useEffect(() => {
        const dailyPlannerContainer = document.querySelector('#DailyPlannerContainer')
        setPixelPerMinutes(dailyPlannerContainer.clientHeight / (HOURS_PER_DAY * 60));
    }, [])

    return (

        <DragDropContext
            onDragEnd={onDragEndEventHandler}>

            <Row style={{height: "100%"}} id={"dayContainer"} onMouseMove={updateMousePosition}
                 onMouseUp={onStopDrag}>
                <Droppable droppableId={"someId"}>
                    {(provided) => (
                        <Col
                            style={{listStyleType: "none"}}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {
                                componentsOrder.map((component, index) => mapComponent(component, index))
                            }

                            {provided.placeholder}
                        </Col>
                    )}
                </Droppable>
            </Row>
        </DragDropContext>
    );
}

export default DailyDnd;
