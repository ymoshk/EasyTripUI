import React, {useState} from 'react';
import EiffelTour from "../images/EiffelTour.jpg";
import louvre from "../images/louvre.jpg";
import nortedame from "../images/nortedame.jpg";
import StaticItinerary from "../components/itinerary/static/StaticItinerary";

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

    let data = {
        Restaurants:
            [{
                name: "Eiffel Tower",
                isRecommended: true,
                id: 1,
                type: "Must See",
                rating: 4.5,
                userTotalRating: 358,
                image: {url: EiffelTour, height: 1025, width: 616},
                closedTemporarily: false,
                priceRange: 3,
                startTime: '08:00',
                endTime: '09:00',
                hours: {
                    sunday: '9am-6pm',
                    monday: '9am-6pm',
                    tuesday: '9am-6pm',
                    wednesday: '9am-6pm',
                    thursday: '9am-6pm',
                    friday: '9am-6pm',
                    saturday: 'Closed'
                },
                lat: 48.8584,
                lng: 2.2945
            },
                {
                    name: "Louvre",
                    isRecommended: false,
                    id: 2,
                    type: "Art",
                    rating: 3.5,
                    userTotalRating: 123,
                    image: {url: louvre, height: 780, width: 1280},
                    closedTemporarily: true,
                    priceRange: 1,
                    startTime: '12:00',
                    endTime: '12:30',
                    hours: {
                        sunday: '9am-6pm',
                        monday: '9am-6pm',
                        tuesday: '9am-6pm',
                        wednesday: '9am-6pm',
                        thursday: '9am-6pm',
                        friday: '9am-6pm',
                        saturday: 'Closed'
                    },
                    lat: 48.8606,
                    lng: 2.3376
                },
                {
                    name: "notre dame",
                    id: 3,
                    isRecommended: true,
                    type: "Art",
                    rating: 3.5,
                    userTotalRating: 123,
                    image: {url: nortedame, height: 868, width: 636},
                    closedTemporarily: false,
                    priceRange: 1,
                    startTime: '12:00',
                    endTime: '12:30',
                    hours: {
                        sunday: '9am-6pm',
                        monday: '9am-6pm',
                        tuesday: '9am-6pm',
                        wednesday: '9am-6pm',
                        thursday: '9am-6pm',
                        friday: '9am-6pm',
                        saturday: 'Closed'
                    },
                    lat: 48.8530,
                    lng: 2.3499
                }]
    }


    function onDragEndEventHandler() {
        //TODO
        console.log(componentsArray2);
    }


    const [size, setSize] = useState({
        width: 200,
        height: 200,
    });


    return (
        // <ChangeHoursContext.Provider
        //     value={{
        //         changeHoursFunc: undefined,
        //         changeEndHourFunc: undefined,
        //         isDragDisabled: false
        //     }}>
        //     <div>
        //         {/*<AttractionsSelectBox*/}
        //         {/*    types={["Restaurants", "Test2"]}*/}
        //         {/*    data={data}*/}
        //         {/*/>*/}
        //         {/*<FreeTime startTime={"11:00"} endTime={"12:00"}></FreeTime>*/}
        //         {/*<Mobility/>*/}
        //         {/*<DailyDnd/>*/}
        //         {<DailyPlanner/>}
        //     </div>
        // </ChangeHoursContext.Provider>
        // <CheckoutAttraction startTime={"12:00"} endTime={"13:00"} name={"Some name "} height={"40vh"}/>
        // <Checkout/>
        <StaticItinerary itineraryId="e552d580-4d2b-4196-8a10-77ef33f1cfd0"/>
    )
}

export default SaharTest;
