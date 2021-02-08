import {useState, useEffect} from "react";
import {NavLink as Link} from "react-router-dom";

const PlacesTry = () => {
    const [places, setPlaces] = useState({});
    const baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb/places";

    useEffect(() => {
        fetch(baseURL, {method: 'GET'})
        .then(res => {
            return res.json();
        }).then(data => {
            setPlaces(data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const renderPlaces = (places) => {
        if (places) {
            return (
                <div className="row justify-content-center" key={places._id}>
                        <div className="col-12 col-md-5">
                            <div className="card-item card-item-lg">
                                <Link
                                    to={`/places/${places[0]._id}`}
                                    className="card-item-bg"
                                    style={{
                                    backgroundImage: `url(images/places/${places[0].images[2]}.jpeg)`
                                }}>
                                    <h3 className="card-item-name">{places[0].name}</h3>
                                    <h4 className="card-item-type">{places[0].type}</h4>
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-7">
                            <div className="row mt-3 mt-md-0">
                                <div className="col-12 col-md-6">
                                    <div className="card-item card-item-sm">
                                        <Link
                                            to={`/places/${places[1]._id}`}
                                            className="card-item-bg"
                                            style={{
                                            backgroundImage: `url(images/places/${places[1].images[0]}.jpeg)`
                                        }}>
                                            <h3 className="card-item-name">{places[1].name}</h3>
                                            <h4 className="card-item-type">{places[1].type}</h4>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mt-3 mt-md-0">
                                    <div className="card-item card-item-sm">
                                        <Link
                                            to={`/places/${places[2]._id}`}
                                            className="card-item-bg"
                                            style={{
                                            backgroundImage: `url(images/places/${places[2].images[0]}.jpeg)`
                                        }}>
                                            <h3 className="card-item-name">{places[2].name}</h3>
                                            <h4 className="card-item-type">{places[2].type}</h4>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <div className="card-item card-item-sm">
                                        <Link
                                            to={`/places/${places[3]._id}`}
                                            className="card-item-bg"
                                            style={{
                                            backgroundImage: `url(images/places/${places[3].images[1]}.jpeg)`
                                        }}>
                                            <h3 className="card-item-name">{places[3].name}</h3>
                                            <h4 className="card-item-type">{places[3].type}</h4>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        }
        return (
            <h2 className="text-center my-5">No Places...</h2>
        )
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Our Places</h2>
            {renderPlaces(places)}
        </div>
    )
}

export default PlacesTry;
