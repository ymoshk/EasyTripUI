import React from 'react';
import SingleTag from "../components/questions/tags/SingleTag";
import TagsList from "../components/questions/tags/TagsList";
import PriceRangePriceRange from "../components/questions/price_range/PriceRange";
import {Icon} from "tabler-react";
import {CurrencyDollar} from 'tabler-icons-react'
import DateRangeInput from "../components/date/DateRangePicker";
import DragAndDropTest from "../components/dnd/DragAndDropTest";
import DragAndDropTemplate from "../components/dnd/DragAndDropTemplate";
import {Col, Row} from "react-bootstrap";
import FreeTime from "../components/attraction/FreeTime";

//TODO-Delete

const SaharTest = () => {
    const tags = ["https://media.istockphoto.com/photos/dog-travel-by-car-picture-id1155030342?s=612x612",
        "https://media.istockphoto.com/photos/happy-and-joyful-boston-terrier-dog-with-its-tongue-hanging-out-on-a-picture-id1272139756?s=612x612",
        "https://media.istockphoto.com/photos/small-jack-russell-terrier-dog-turning-his-head-aside-picture-id1277129264?s=612x612",
        "https://media.istockphoto.com/photos/puppy-chocolate-labrador-retriever-lying-3-months-old-isolated-on-picture-id1217798615?s=612x612",
        "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg"];

    function test(priceValue) {
        console.log(priceValue)
    }

    let componentsArray = [
        <img src={tags[0]} height={100} width={100}/>,
        <img src={tags[1]} height={100} width={100}/>,
        <img src={tags[2]} height={100} width={100}/>,
        <img src={tags[3]} height={100} width={100}/>,
        <img src={tags[4]} height={100} width={100}/>
    ];

    let componentsArray2 = [
        <img src={tags[0]} height={100} width={100}/>,
        <img src={tags[1]} height={100} width={100}/>,
        <img src={tags[2]} height={100} width={100}/>,
        <img src={tags[3]} height={100} width={100}/>,
        <img src={tags[4]} height={100} width={100}/>
    ];


    // let componentsArray2 = [
    //     <h3>Test1</h3>,
    //     <h3>Test2</h3>,
    //     <h3>Test3</h3>,
    //     <h3>Test4</h3>
    // ];

    let componentsArray3 = [
        <h3>JBL1</h3>,
        <h3>JBL2</h3>,
        <h3>JBL3</h3>,
        <h3>JBL4</h3>
    ];

    let arrays = [
        {
            id: "array1Id",
            data: componentsArray
        },
        {
            id: "array2Id",
            data: componentsArray2
        }
    ]


    function onDragEndEventHandler() {
        //TODO
        console.log(componentsArray2);
    }

    return (
        <div>
            <FreeTime startTime={"10:00"} endTime={"11:00"}></FreeTime>
        </div>
    );
};

export default SaharTest;
