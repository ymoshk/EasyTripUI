import React, {useContext, useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import HelpersContext from "./ChangeHourContext"
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import AttractionContainer from "./attraction/AttractionContainer";
import {useSelector} from "react-redux";


const DailyDnd = (props) => {
    const HOURS_PER_DAY = 17;
    const dayIndex = useSelector(state => state.itineraryData.itinerary.currentDayIndex);
    const dayAttractions = useSelector(state => state.itineraryData.itinerary.itineraryDays[dayIndex].activities);
    const [attractionList, setAttractionsList] = useState([]);


    useEffect(() => {
        setAttractionsList(dayAttractions);
    }, [dayAttractions]);

    useEffect(() => {
        setOrder(attractionList.map((attractionNode, index) =>
            <AttractionContainer
                calcHeight={true}
                index={index}
                attractionNode={
                    {
                        ...attractionNode,
                        startTime: attractionNode.startTime,
                        endTime: attractionNode.endTime
                    }}/>));
    }, [attractionList]);

    const [componentsOrder, setOrder] = useState(attractionList.map((attractionNode, index) => {
            return <AttractionContainer
                index={index}
                calcHeight={true}
                attractionNode={
                    {
                        ...attractionNode,
                        startTime: attractionNode.startTime,
                        endTime: attractionNode.endTime
                    }}/>
        }
    ))

    const mapComponent = (component, index) => {
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

    const onDragEndEventHandler = (res) => {
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
                            {componentsOrder.map((component, index) => mapComponent(component, index))}
                            {provided.placeholder}
                        </Col>
                    )}
                </Droppable>
            </Row>
        </DragDropContext>
    );
}

export default DailyDnd;
