// import React from "react";
// import Pagination from 'react-bootstrap/Pagination';
// import {Button, Col, FormControl, Row} from "react-bootstrap";
// import InputGroup from 'react-bootstrap/InputGroup';
// import {useState} from 'react';
//
// let items = [];
// for (let number = 1; number <= 8; number++) {
//     items.push(
//         <Pagination.Item key={number}>
//             {number}
//         </Pagination.Item>,
//     );
// }
//
//
// function PassengersCount(props){
//     const [passengerCnt, setPassengerCnt] = useState(0);
//
//     function addOne(){
//         setPassengerCnt((prevState => prevState + 1));
//     }
//     function descentByOne(){
//         setPassengerCnt((prevState => prevState - 1));
//     }
//
//
//     return(
//         <div>
//         <Row>
//             <Col>
//                 <h1>Adults</h1>
//             </Col>
//             <Col>
//                 <Pagination size="sm">{items}</Pagination>
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <h1>Children</h1>
//             </Col>
//             <Col>
//                 <Pagination size="sm">{items}</Pagination>
//             </Col>
//         </Row>
//         <Row>
//             <input innerText={passengerCnt}/>
//             <p>{passengerCnt}</p>
//             <InputGroup className="mb-3">
//             <Col>
//                 <Button onClick={addOne} variant="outline-secondary">+</Button>
//             </Col>
//             <Col>
//                 <Button onClick={descentByOne} variant="outline-secondary">-</Button>
//             </Col>
//             </InputGroup>
//         </Row>
//
//
//
//         </div>);
// }
//
// export default PassengersCount;