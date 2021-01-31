import {useState, useEffect} from "react";
import { NavLink as Link } from "react-router-dom";
// import axios from "axios";

const Places = () => {
    const [places, setPlaces] = useState({});
    const baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb/places";

    useEffect(() => {
        async function fetchMyAPI() {
          let response = await fetch(baseURL)
          response = await response.json()
          setPlaces(response)
          console.log(response);
          console.log(places);
        }
        fetchMyAPI()
      }, [])

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const result = await axios(
    //         baseURL,
    //       );
    //       setPlaces(result.data);
    //     };
     
    //     fetchData();
    //   }, []);

    // useEffect(() => {
    //     fetch(baseURL, {method: 'GET'})
    //     .then(res => {
    //         return res.json();
    //     }).then(data => {
    //         console.log(data);
    //         setPlaces(data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }, []);

    const renderPlaces = (places)=>{
        if (places[0].id) {
            return (
                <div className="row justify-content-center">
                        <div className="col-10 col-md-5">
                            <div className="card-item card-item-lg">
                                <Link
                                    to={`/places/${places[0].id}`}
                                    className="card-item-bg"
                                    style={{
                                    backgroundImage: `url(images/places/${places[0].images[2]}.jpeg)`
                                }}>
                                    <div className="card-item-details">
                                        <h3>{places[0].type}</h3>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-10 col-md-7">
                            <div className="row">
                                <div className="col-6">
                                    <div className="card-item card-item-sm">
                                        <Link
                                            to={`/places/${places[1].id}`}
                                            className="card-item-bg"
                                            style={{
                                                backgroundImage: `url(images/places/${places[1].images[0]}.jpeg)`
                                            }}>
                                                <div className="card-item-details">
                                                    <h3>{places[1].type}</h3>
                                                </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card-item card-item-sm">
                                        <Link
                                            to={`/places/${places[2].id}`}
                                            className="card-item-bg"
                                            style={{
                                                backgroundImage: `url(images/places/${places[2].images[0]}.jpeg)`
                                            }}>
                                                <div className="card-item-details">
                                                    <h3>{places[2].type}</h3>
                                                </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="row"
                                style={{
                                marginTop: '30px'
                            }}>
                                <div className="col-12">
                                    <div className="card-item card-item-sm">
                                        <Link
                                            to={`/places/${places[0].id}`}
                                            className="card-item-bg"
                                            style={{
                                                backgroundImage: `url(images/places/${places[0].images[1]}.jpeg)`
                                            }}>
                                                <div className="card-item-details">
                                                    <h3>{places[0].type}</h3>
                                                </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        }
        return (
            <h2 className="text-center my-5">No Places... </h2>
        )
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Our Places</h2>
            {renderPlaces(places)}
        </div>
    )
}

export default Places;