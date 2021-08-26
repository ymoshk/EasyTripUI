import {itineraryActions} from "./itinerary-slice";
import {ITINERARY_ID_STORAGE} from "../components/itinerary/Constants";


const urlAttractions = new URL(process.env.REACT_APP_SERVER_URL.concat('/getCityAttractions'));
const urlGetItinerary = new URL(process.env.REACT_APP_SERVER_URL.concat('/getItinerary'));
const urlUpdateItineraryDay = new URL(process.env.REACT_APP_SERVER_URL.concat('/updateItinerary'));
const urlCleanItinerary = new URL(process.env.REACT_APP_SERVER_URL.concat('/cleanItinerary'));
const urlGetDurations = new URL(process.env.REACT_APP_SERVER_URL.concat('/getAttractionDurations'));


export const fetchAttractionsDurations = () => {
    return async (dispatch) => {
        const fetchDurations = async () => {
            const response = await fetch(urlGetDurations,
                {
                    method: 'GET',
                    credentials: 'include'
                });

            if (!response.ok) {
                throw new Error('Could not fetch itinerary data!');
            }

            return await response.json();
        }
        try {
            const durations = await fetchDurations();
            dispatch(itineraryActions.setDurations(durations));
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchItineraryData = (id) => {
    return async (dispatch) => {
        const fetchItinerary = async () => {
            const response = await fetch(urlGetItinerary,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({id: id === undefined ? localStorage.getItem(ITINERARY_ID_STORAGE) : id})
                }
            );

            if (!response.ok) {
                throw new Error('Could not fetch itinerary data!');
            }

            return await response.json();
        }
        try {
            const itineraryData = await fetchItinerary();
            dispatch(itineraryActions.set(itineraryData));
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchAttractionData = () => {
    return async (dispatch) => {
        const fetchAttractions = async () => {
            const response = await fetch(urlAttractions,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({cityName: 'Tel Aviv'})
                }
            );

            if (!response.ok) {
                throw new Error('Could not fetch attractions data!');
            }

            return await response.json();
        }

        try {
            const attractionsData = await fetchAttractions();
            dispatch(itineraryActions.replace(attractionsData.Attraction));
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateItineraryDay = (id, day, index) => {
    fetch(urlUpdateItineraryDay,
        {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                id: id.toString(),
                dayJson: JSON.stringify(day),
                index: index.toString()
            })
        }
    ).then()
}

export const cleanItinerary = (id) => {
    fetch(urlCleanItinerary,
        {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                id: id.toString(),
            })
        }
    ).then()
}
