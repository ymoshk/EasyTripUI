// import React from 'react';
// import ButtonGroup from "react-bootstrap/ButtonGroup";
//
// import styles from "..//components/questions/tags/TagsList.module.css";
// import SingleTag from "../components/questions/tags/SingleTag";
//
// const TagsList = (props) => {
//     const tagsListStatus = [];
//
//     props.tagsList.forEach(tag => tagsListStatus.push({name: tag.name, id: tag.id, src: tag.src, status: false}));
//
//     let i = 0;
//
//     function SingleTagChecked(id) {
//         tagsListStatus[id].status = !tagsListStatus[id].status;
//         props.updateList(tagsListStatus);
//     }
//
//     function createLine(lineOfTags) {
//         let line = "";
//         if (!props.imageTag) {
//             line = lineOfTags.map((tag) =>
//                 <div style={{marginRight: 10}}>
//                     <SingleTag onChecked={SingleTagChecked} id={i++} text={tag.name}/>
//                 </div>)
//         } else {
//             line = lineOfTags.map((tag) =>
//                 <div style={{marginRight: 10}}>
//                     <SingleTag onChecked={SingleTagChecked} id={i++} src={tag.src}/>
//                 </div>)
//         }
//
//         return line;
//     }
//
//     const createList = () => {
//         let result = [];
//         let lineOfTags = [];
//         const numberOfTags = tagsListStatus.length;
//         if (tagsListStatus.length % 4 === 0) {
//             for (let i = 0; i < numberOfTags / 4; i++) {
//                 lineOfTags = tagsListStatus.slice(i * 4, i * 4 + 4);
//                 result.push(<ButtonGroup>
//                     createLine(lineOfTags);
//                 </ButtonGroup>);
//             }
//         }
//
//         return result;
//     }
//
//     return (
//         <div className={styles.center}>
//             <ButtonGroup>
//                 {createLine(tagsListStatus.slice(0,4))}
//             </ButtonGroup>
//             <br/>
//             <ButtonGroup>
//                 {createLine(tagsListStatus.slice(3,8))}
//             </ButtonGroup>
//             <br/>
//             <ButtonGroup>
//                 {createLine(tagsListStatus.slice(7,12))}
//             </ButtonGroup>
//             <br/>
//         </div>
//     );
// };
//
// export default TagsList;
