// import React, {useState} from 'react';
// // import DragDropContext from "react-beautiful-dnd/src/view/drag-drop-context";
// // import Droppable from "react-beautiful-dnd/src/view/drag-drop-context";
// // import Draggable from "react-beautiful-dnd/src/view/drag-drop-context";
// import {Col, Image, Row} from "react-bootstrap";
// import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
// import {Card} from "tabler-react";
// import {H3} from "tabler-icons-react";
//
// const DragAndDropTest = (props) => {
//     const [componentsOrder, setOrder] = useState(props.componentsOrder);
//
//     function mapSingleArray(arrayObject) {
//         return (
//             <Droppable droppableId={arrayObject.id}>
//                 {(provided) => (
//                     <div
//                         style={{listStyleType: "none"}}
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                     >
//                         {arrayObject.data.map((component, index) => mapComponent(component, ))}
//                         {provided.placeholder}
//                     </div>
//                 )}
//             </Droppable>
//         );
//     }
//
//     function mapComponent(component, index, offset = 0) {
//         return (
//             <Draggable draggableId={index.toString()} index={index + offset}>
//                 {provided => (
//                     <div
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         ref={provided.innerRef}
//                     >
//                         {component}
//                     </div>
//                 )}
//             </Draggable>
//         );
//     }
//
//
//     function onDragEndEventHandler(res) {
//         console.log(res);
//         const {destination, source} = res;
//
//         if (!destination) {
//             return;
//         }
//
//         if (destination.droppableId === source.droppableId &&
//             destination.index === source.index) {
//             return;
//         }
//
//
//         let newArray = picturesOrder;
//         let tmp = newArray[source.index];
//         newArray.splice(source.index, 1);
//         newArray.splice(destination.index, 0, tmp);
//
//         setOrder(newArray);
//     }
//
//     return (
//         // <DragDropContext>
//         //     <Droppable>{provided =>
//         //     }
//         //     </Droppable>
//         // </DragDropContext>
//         <DragDropContext
//             onDragEnd={onDragEndEventHandler}>
//             <Row>
//                 <Droppable droppableId={"someId"}>
//                     {(provided) => (
//                         <Col
//                             style={{listStyleType: "none"}}
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}
//                         >
//                             <Draggable draggableId={"1"} index={0}>
//
//                                 {provided => (
//                                     <div
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                         ref={provided.innerRef}
//                                     >
//                                         <img
//
//                                             src={picturesOrder[0].src}
//                                             width={100}/>
//                                     </div>
//                                 )}
//
//                             </Draggable>
//                             <Draggable draggableId={"2"} index={1}>
//
//                                 {provided => (
//                                     <div
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                         ref={provided.innerRef}
//                                     >
//                                         <img
//                                             src={picturesOrder[1].src}
//                                             width={100}/>
//                                     </div>
//                                 )}
//
//                             </Draggable>
//
//                             {provided.placeholder}
//                         </Col>
//                     )}
//                 </Droppable>
//                 <Droppable droppableId={"someId2"}>
//                     {(provided) => (
//                         <Col
//                             style={{listStyleType: "none"}}
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}
//                         >
//                             <Draggable draggableId={"111"} index={4}>
//
//                                 {provided => (
//                                     <div
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                         ref={provided.innerRef}
//                                     >
//                                         <img
//
//                                             src={picturesOrder[0].src}
//                                             width={100}/>
//                                     </div>
//                                 )}
//
//                             </Draggable>
//                             <Draggable draggableId={"222"} index={5}>
//
//                                 {provided => (
//                                     <div
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                         ref={provided.innerRef}
//                                     >
//                                         <img
//                                             src={picturesOrder[1].src}
//                                             width={100}/>
//                                     </div>
//                                 )}
//
//                             </Draggable>
//
//                             {provided.placeholder}
//                         </Col>
//                     )}
//                 </Droppable>
//             </Row>
//         </DragDropContext>
//
//
//     );
// }
//
// export default DragAndDropTest;