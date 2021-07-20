import React, {useEffect, useState} from 'react';

const getFirstPageExtract = jsonResponse => {
    // You should probably add some validathin here to make sure pages exists
    const pages = jsonResponse.query.pages;
    const pageIds = Object.keys(pages);
    // Here we only take the first response since we know there is only one.
    const firstPageId = pageIds.length ? pageIds[0] : null;
    return firstPageId ? pages[firstPageId].extract : null;
};

const PlaceDescription = (props) => {
    const [placeContent, setPlaceContent] = useState(null);

    const placeName = props.name.replace(/ /g,"_");
    const url =
        "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=" + placeName;

    const getCity = async () => {
        const response = await fetch(url);
        const jsonContent = await response.json();
        const extract = getFirstPageExtract(jsonContent);
        setPlaceContent(extract);
    };
    useEffect(() => {
        getCity();
    }, []);

    return (
        <div>
            {placeContent && <div dangerouslySetInnerHTML={{ __html: placeContent }} />}
        </div>
    );
}

export default PlaceDescription;