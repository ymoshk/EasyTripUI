import React, {useContext, useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import HelpersContext from "./ChangeHourContext"
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import AttractionContainer from "./attraction/AttractionContainer";
import {useDispatch, useSelector} from "react-redux";
import {itineraryActions} from "../../store/itinerary-slice";


const DailyDnd = () => {
    const HOURS_PER_DAY = 17;
    const dayIndex = useSelector(state => state.itineraryData.itinerary.currentDayIndex);
    const dayAttractions = useSelector(state => state.itineraryData.itinerary.itineraryDays[dayIndex].activities);
    const dispatch = useDispatch();
    const helpersContext = useContext(HelpersContext);

    const [mousePosition, setMousePosition] = useState(null);
    const [draggedId, setDraggedId] = useState(null);
    const [draggedStatPos, setDraggedStartPos] = useState(null);
    const [pixelPerMinute, setPixelPerMinutes] = useState(-1);
    const [minutesToAdd, setMinutesToAdd] = useState(0);

    useEffect(() => {
        const dailyPlannerContainer = document.querySelector('#DailyPlannerContainer')
        setPixelPerMinutes(dailyPlannerContainer.clientHeight / (HOURS_PER_DAY * 60));
    }, [])

    useEffect(() => {
        if (helpersContext.state === "DRAG") {
            helpersContext.isDragDisabled = false;
        } else if (helpersContext.state === "RESIZE") {
            helpersContext.isDragDisabled = true;
        } else if (helpersContext.state === "BUTTON") {
            helpersContext.isDragDisabled = true;
        }
    }, [helpersContext.state])

    const mapComponent = (attractionNode, index) => {
        return (
            <Draggable key={"draggable_" + attractionNode.uniqueKey}
                       isDragDisabled={helpersContext.isDragDisabled}
                       draggableId={index.toString()}
                       index={index}>
                {provided => (
                    <div onMouseDown={(e) => onDragStart(index, e)}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={provided.innerRef}
                    >
                        <AttractionContainer
                            index={index}
                            calcHeight={true}
                            attractionNode={attractionNode}/>
                    </div>
                )}
            </Draggable>
        );
    }

    const onDragEndEventHandler = (res) => {
        // const {destination, source} = res;
        //
        // if (!destination) {
        //     return;
        // }
        //
        // if (destination.droppableId === source.droppableId &&
        //     destination.index === source.index) {
        //     return;
        // }
        //
        // let newArray = componentsOrder;
        // let tmp = newArray[source.index];
        // newArray.splice(source.index, 1);
        // newArray.splice(destination.index, 0, tmp);
        //
        // setOrder(newArray);
    }


    const updateMousePosition = (e) => {
        if (helpersContext.state !== "BUTTON") {
            setMousePosition(e.pageY)
        }
    }

    const onDragStart = (index, e) => {
        if (helpersContext.state !== "BUTTON") {
            setDraggedId(index);
            setDraggedStartPos(e.pageY)
        }
    }

    const onStopDrag = () => {
        if (helpersContext.state !== "BUTTON") {
            if (draggedId !== undefined && draggedId !== null && minutesToAdd !== undefined) {
                dispatch(itineraryActions.changeEndTime(
                    {
                        index: draggedId,
                        minutesCount: minutesToAdd
                    }
                ));
            }
        }

        setDraggedId(null);
        setDraggedStartPos(null);
        setMinutesToAdd(null);
    }

    useEffect(() => {
        if (helpersContext.state !== "BUTTON") {
            if (draggedId !== null) {
                let diff = parseInt((mousePosition - draggedStatPos) / pixelPerMinute);
                setMinutesToAdd(diff);

                if (helpersContext.state === "DRAG") {
                    console.log("drag");
                    helpersContext.changeHoursFunc(diff);
                } else if (helpersContext.state === "RESIZE") {
                    console.log("resize");
                    helpersContext.changeEndHourFunc(diff);
                }
            }
        }
    }, [mousePosition])


    return (
        <DragDropContext
            onDragEnd={onDragEndEventHandler}>
            <Row style={{height: "100%"}} id={"dayContainer"} onMouseMove={updateMousePosition}
                 onMouseUp={onStopDrag}>
                <Droppable droppableId={"day_" + dayIndex}>
                    {(provided) => (
                        <Col
                            style={{listStyleType: "none"}}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {dayAttractions.map((component, index) => mapComponent(component, index))}
                            {provided.placeholder}
                        </Col>
                    )}
                </Droppable>
            </Row>
        </DragDropContext>
    );
}

export default DailyDnd;
