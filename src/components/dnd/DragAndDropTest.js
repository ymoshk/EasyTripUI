import React, {useState} from 'react';
// import DragDropContext from "react-beautiful-dnd/src/view/drag-drop-context";
// import Droppable from "react-beautiful-dnd/src/view/drag-drop-context";
// import Draggable from "react-beautiful-dnd/src/view/drag-drop-context";
import {Col, Image, Row} from "react-bootstrap";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Card} from "tabler-react";
import {H3} from "tabler-icons-react";

const DragAndDropTest = () => {
    const [picturesOrder, setOrder] = useState(
        [{src: "https://media.istockphoto.com/photos/dog-travel-by-car-picture-id1155030342?s=612x612"},
            {src: "https://media.istockphoto.com/photos/happy-and-joyful-boston-terrier-dog-with-its-tongue-hanging-out-on-a-picture-id1272139756?s=612x612"},
            {src: "https://media.istockphoto.com/photos/small-jack-russell-terrier-dog-turning-his-head-aside-picture-id1277129264?s=612x612"},
            {src: "https://media.istockphoto.com/photos/puppy-chocolate-labrador-retriever-lying-3-months-old-isolated-on-picture-id1217798615?s=612x612"},
            {src: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg"}]);


    function onDragEndEventHandler(res) {
        const {destination, source, draggableId} = res;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        console.log(res);

        console.log(newArray);
        console.log(picturesOrder)


        let newArray = {...picturesOrder};

        // if(destination.index === newArray.length)
        let tmp = newArray[source.index];
        newArray[source.index] = newArray[destination.index];
        newArray[destination.index] = tmp;

        // for (let i = 0; i < picturesOrder.length; i++) {
        //     if (i === source.index) {
        //         newArray.push({...picturesOrder[destination.index]});
        //     } else if (i === destination.index) {
        //         newArray.push({...picturesOrder[source.index]});
        //     } else {
        //         newArray.push({...picturesOrder[i]});
        //     }
        // }
        console.log("AFTER LOOP:")
        console.log(newArray);
        console.log(picturesOrder);
        setOrder(newArray);
    }

    return (
        // <DragDropContext>
        //     <Droppable>{provided =>
        //     }
        //     </Droppable>
        // </DragDropContext>
        <DragDropContext
            onDragEnd={onDragEndEventHandler}>
            <Droppable droppableId={"someId"}>
                {(provided) => (
                    <ul
                        style={{listStyleType:"none"}}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <Draggable draggableId={"1"} index={0}>

                            {provided => (
                                <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    <img
                                        src={picturesOrder[0].src}
                                        width={100}/>
                                </li>
                            )}

                        </Draggable>
                        <Draggable draggableId={"2"} index={1}>

                            {provided => (
                                <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    <img
                                        src={picturesOrder[1].src}
                                        width={100}/>
                                </li>
                            )}

                        </Draggable>
                        <Draggable draggableId={"3"} index={2}>

                            {provided => (
                                <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    <img
                                        src={picturesOrder[2].src}
                                        width={100}/>
                                </li>
                            )}

                        </Draggable>
                        <Draggable draggableId={"4"} index={3}>

                            {provided => (
                                <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    <img
                                        src={picturesOrder[3].src}
                                        width={100}/>
                                </li>
                            )}

                        </Draggable>
                        <Draggable draggableId={"5"} index={4}>

                            {provided => (
                                <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    <img
                                        src={picturesOrder[4].src}
                                        width={100}/>
                                </li>
                            )}

                        </Draggable>
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>


    );
}

export default DragAndDropTest;