import React from 'react';
import SingleTag from "../components/questions/tags/SingleTag";
import TagsList from "../components/questions/tags/TagsList";
import PriceRangePriceRange from "../components/questions/price_range/PriceRange";
import {Icon} from "tabler-react";
import {CurrencyDollar} from 'tabler-icons-react'
import DateRangeInput from "../components/date/DateRangePicker";
import DragAndDropTest from "../components/dnd/DragAndDropTest";

//TODO-Delete

const SaharTest = () => {
    const tags = ["https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
        "https://media.istockphoto.com/photos/puppy-chocolate-labrador-retriever-lying-3-months-old-isolated-on-picture-id1217798615?s=612x612",
        "https://media.istockphoto.com/photos/dog-travel-by-car-picture-id1155030342?s=612x612"];

    function test(priceValue) {
        console.log(priceValue)
    }

    return (
        // <div>
            <TagsList tagsList={tags}></TagsList>
        //     <PriceRangePriceRange onAfterChange={test}></PriceRangePriceRange>
        //     <DateRangeInput onApply={(start, end) => console.log(new Date(start), new Date(start))}/>
        // </div>
        // <DragAndDropTest/>
    );
};

export default SaharTest;
