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
    const itinerary = useSelector(state => state.itineraryData.itinerary);
    const dayAttractions = itinerary.itineraryDays[dayIndex].activities
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

    const onChangeDurationEventHandler = (change) => {
        if (draggedId !== undefined && draggedId !== null) {
            dispatch(itineraryActions.changeEndTime(
                {
                    index: draggedId,
                    minutesCount: change
                }
            ));
        }
    }

    const getStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.001s`,

        };
    }

    const mapComponent = (attractionNode, index) => {
        return (
            <Draggable key={"draggable_" + attractionNode.uniqueKey}
                       isDragDisabled={false}
                       draggableId={index.toString()}
                       index={index}>

                {(provided, snapshot) => (
                    <div onMouseDown={(e) => onDragStart(index, e)}
                         {...provided.draggableProps}
                         ref={provided.innerRef}
                         style={getStyle(provided.draggableProps.style, snapshot)}
                    >
                        <AttractionContainer
                            resetDraggedId={setDraggedId}
                            drag={provided.dragHandleProps}
                            index={index}
                            calcHeight={true}
                            attractionNode={attractionNode}
                            onChangeDuration={onChangeDurationEventHandler}/>
                    </div>
                )}
            </Draggable>
        );
    }


    const onDragEndEventHandler = () => {
        if (!helpersContext.isOnButton) {
            if (draggedId !== undefined && draggedId !== null && minutesToAdd !== undefined) {
                dispatch(itineraryActions.moveAttraction(
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

    const updateMousePosition = (e) => {
        if (!helpersContext.isOnButton) {
            setMousePosition(e.pageY)
        }
    }

    const onDragStart = (index, e) => {
        if (!helpersContext.isOnButton) {
            setDraggedId(index);
            setDraggedStartPos(e.pageY)
        }
    }

    useEffect(() => {
        if (!helpersContext.isOnButton) {
            if (draggedId !== null) {
                let diff = parseInt((mousePosition - draggedStatPos) / pixelPerMinute);
                setMinutesToAdd(diff);

                if (helpersContext.changeHoursFunc !== undefined) {
                    helpersContext.changeHoursFunc(diff);
                }
            }
        }
    }, [mousePosition])


    return (
        <DragDropContext
            onDragEnd={onDragEndEventHandler}>
            {/*{!lastActionResult && <SweetAlert*/}
            {/*    warning*/}
            {/*    confirmBtnText="OK"*/}
            {/*    title="Action Failed!"*/}
            {/*    focusCancelBtn*/}
            {/*    timeout={2000}*/}
            {/*    onConfirm={() => {*/}
            {/*        dispatch(itineraryActions.resetLastActionResult())*/}
            {/*    }}*/}
            {/*    onCancel={() => {*/}
            {/*        dispatch(itineraryActions.resetLastActionResult())*/}
            {/*    }}*/}
            {/*>*/}
            {/*    You're trying to take action that will result in a time exceed.*/}
            {/*</SweetAlert>}*/}
            <Row style={{height: "100%"}} id={"dayContainer"} onMouseMove={updateMousePosition}>
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
