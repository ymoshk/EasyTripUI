import React from 'react';
import {Card, Col, OverlayTrigger, Row} from "react-bootstrap";
import {
    BiHotel,
    FaChild,
    FaFemale,
    FaMale,
    FaMapMarkedAlt,
    FaUmbrellaBeach,
    FiShoppingCart,
    GiAquarium,
    GiBinoculars,
    GiMartini,
    GiMeal,
    GiMonaLisa,
    GiPokerHand,
    GiShoppingCart,
    IoBeer,
    IoCafeOutline,
    MdPets,
    MdSpa,
    RiGalleryLine,
    RiMickeyLine,
    TiTree
} from "react-icons/all";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import * as Constants from "../../components/itinerary/Constants";

const SingleItinerary = (props) => {


    let fromDateToString = (date) => {
        let mm = date.month + 1;
        let dd = date.day;

        return ((dd > 9 ? '' : '0') + dd) + '.' + ((mm > 9 ? '' : '0') + mm) + '.' + date.year;
    }

    const questionnaire = props.questionsData;
    const country = questionnaire.country;
    const city = questionnaire.city;
    const adultsCount = questionnaire.adultsCount;
    const childrenCount = questionnaire.childrenCount;
    const startDate = fromDateToString(questionnaire.startDate.date);
    const endDate = fromDateToString(questionnaire.endDate.date);
    const tripVibes = questionnaire.tripVibes; //TODO -> What i should do with this information ?
    const myIndex = props.index;
    const favoriteAttractions = questionnaire.favoriteAttractions.map(attraction => attraction.tagName.replaceAll(" ", "") + " ");
    const status = props.status;
    const itineraryId = props.itiniraryId;


    const renderTooltip = (props, text) => (
        <Tooltip id="tooltip" {...props}>
            {text}
        </Tooltip>
    );

    let getAttractionIcon = (type) => {
        // icons from https://react-icons.github.io/react-icons/search?q=zoo
        const typeWithoutSpace = type.replaceAll(' ', '');

        let map = {
            Bar: <IoBeer/>,
            Restaurant: <GiMeal/>,
            Aquarium: <GiAquarium/>,
            Cafe: <IoCafeOutline/>,
            Beach: <FaUmbrellaBeach/>,
            Casino: <GiPokerHand/>,
            ArtGallery: <RiGalleryLine/>,
            Hotel: <BiHotel/>,
            Market: <FiShoppingCart/>,
            Museum: <GiMonaLisa/>,
            NightClub: <GiMartini/>,
            ShoppingMall: <GiShoppingCart/>,
            TopSights: <GiBinoculars/>,
            TouristAttraction: <FaMapMarkedAlt/>,
            Zoo: <MdPets/>,
            AmusementPark: <RiMickeyLine/>,
            Park: <TiTree/>,
            Spa: <MdSpa/>
        };

        if (map[typeWithoutSpace] === undefined) {
            return undefined;
        } else {
            return (
                <span style={{marginRight: "10px"}}>
                <OverlayTrigger
                    placement="bottom"
                    delay={{show: 250, hide: 400}}
                    overlay={(props) => renderTooltip(props, type)}
                >
                    <span>
                        {map[typeWithoutSpace]}
                    </span>
                </OverlayTrigger>
                </span>
            )
        }
    }

    let getAttractionsIcons = () => {
        let res = [];

        favoriteAttractions.forEach(type => {
            const icon = getAttractionIcon(type)
            if (icon !== undefined) {
                res.push(icon);
            }
        })

        return res
    }


    function CheckoutBtnClickEventHandler(e) {
        localStorage.setItem(Constants.ITINERARY_ID_STORAGE, itineraryId);
        window.location = Constants.STATIC_VIEW_URL;
    }

    function editBtnClickEventHandler(e) {
        localStorage.setItem(Constants.ITINERARY_ID_STORAGE, itineraryId);
        window.location = Constants.DND_URL;
    }

    function getStatus() {
        let res;

        if (status === "EDIT") {
            res = <span style={{fontWeight: 'bold', color: '#EED202'}}>Not Completed</span>

        } else if (status === "COMPLETED") {
            res = <span style={{fontWeight: 'bold', color: '#49ee02'}}>Completed</span>
        } else if (status === "AUTO_MODE") {
            res = <span style={{fontWeight: 'bold', color: '#ee021e'}}>Processing</span>
        }

        return res;
    }

    return (
        <Card style={{width: '25rem', marginRight: "0", marginBottom: "0"}}>
            <Card.Header>{startDate} - {endDate}</Card.Header>
            <Card.Body>
                <Card.Title>{city}, {country}</Card.Title>
                <Card.Text>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={(props) => renderTooltip(props, "Adults")}
                                    >
                                        <span>
                                        <FaMale/>
                                        <FaFemale/>
                                        </span>
                                    </OverlayTrigger>
                                </Col>
                                <Col>
                                    <div style={{marginTop: "3px"}}> {adultsCount}</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{show: 250, hide: 400}}
                                        overlay={(props) => renderTooltip(props, "Children")}
                                    >
                                        <span>
                                            <FaChild/>
                                        </span>
                                    </OverlayTrigger>
                                </Col>
                                <Col>
                                    <div style={{marginTop: "3px"}}> {childrenCount}</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Status: {getStatus()}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*<Card.Text className={"text-muted"}>*/}
                            <Card.Text>
                                Favorites Attractions: {getAttractionsIcons()}
                                {/*{favoriteAttractions}*/}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <div className="d-grid gap-2">
                            <Button onClick={CheckoutBtnClickEventHandler}>
                                View
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2">
                            <Button onClick={editBtnClickEventHandler}>
                                Edit
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default SingleItinerary;
