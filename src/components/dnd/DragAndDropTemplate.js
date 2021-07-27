// import React, {useState} from 'react';
// import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
//
// //Tutorial - https://egghead.io/lessons/react-designate-control-of-dragging-for-a-react-beautiful-dnd-draggable-with-draghandleprops
// //documentation - https://github.com/atlassian/react-beautiful-dnd
//
// /*
// props.arrays is a array of arrays for the component which represent the way you want to order the dnd boxes
// for example : props.array = [
// {[<h3>1</h3>,
// <h3>2</h3>,
// <h3>3</h3>,
// <h3>4</h3>],
// [<h1>1</h1>,
// <h1>2</h1>,
// <h1>3</h1>,
// <h1>4</h1>],
// ];
// */
//
//
// const DragAndDropTemplate = (props) => {
//
//     const [componentsArrays, setOrder] = useState(props.componentsArrays)
//
//     function onDragEndEventHandler(res) {
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
//         let newArray = componentsArrays;
//         let tmp = newArray[source.index];
//         newArray.splice(source.index, 1);
//         newArray.splice(destination.index, 0, tmp);
//
//         setOrder(newArray);
//         if (props.onDragEnd !== undefined) {
//             props.onDragEnd();
//         }
//     }
//
//     function mapComponent(component, index) {
//         return (
//             <Draggable draggableId={index.toString()} index={index}>
//                 {provided => (
//                     <div
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         ref={provided.innerRef}
//                         key={index.toString()}
//                     >
//                         {component}
//                     </div>
//                 )}
//             </Draggable>
//         );
//     }
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
//                         {arrayObject.data.map((component, index) => mapComponent(component, index + ))}
//                         {provided.placeholder}
//                     </div>
//                 )}
//             </Droppable>
//         );
//     };
//
//     return (
//         <DragDropContext
//             onDragEnd={onDragEndEventHandler}>
//             {componentsArrays.map((arrayObject, index) => mapSingleArray(arrayObject,componentsArrays[index].length))}
//         </DragDropContext>
//     );
// };
//
// export default DragAndDropTemplate;