import {FaTv, FaWifi, FaFan} from "react-icons/fa";
import {MdPets} from "react-icons/md";
import {GiHeatHaze} from "react-icons/gi";

const FeaturesIcons = (placeObj) => {
    const place = placeObj.place;
    // console.log(place);
    return (
        <>
            {place.has_tv && <FaTv className="feature-icon"/>}
            {place.has_wifi && <FaWifi className="feature-icon"/>}
            {place.pets && <MdPets className="feature-icon"/>}
            {place.has_air_conditioner && <FaFan className="feature-icon"/>}
            {place.has_heating_system && <GiHeatHaze className="feature-icon"/>}
        </>
    )
}

export default FeaturesIcons;