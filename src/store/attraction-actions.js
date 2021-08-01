import {attractionActions} from "./attraction-slice";

const urlAttractions = new URL(process.env.REACT_APP_SERVER_URL.concat('/getCityAttractions'));

export const fetchAttractionData = () => {
    return async (dispatch) => {
        const fetchAttractions = async () => {
            const response = await fetch(urlAttractions,
                {
                    method: 'POST',
                    body: JSON.stringify({cityName: 'Tel Aviv'})
                }
            );

            if (!response.ok) {
                throw new Error('Could not fetch attractions data!');
            }

            const data = await response.json();

            return data;
        }

        try {
            const attractionsData = await fetchAttractions();
            dispatch(attractionActions.replace(attractionsData.Attraction));
        }catch(error){
            console.log(error);
        }
    }
}