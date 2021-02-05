import React, {Component} from 'react';
import {NavLink as Link} from "react-router-dom";

class Places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        }
        this.baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb/places";
    }

    componentDidMount() {
        fetch(this.baseURL, {method: "GET"})
        .then((resp) => {
            return resp.json();
        }).then((data) => {
            // console.log(data);
            this.setState({places: data});
        }).catch((err) => {
            console.log(err);
        });
    }

    renderPlaces = () => {
        // console.log("renderPlaces: ", this.state.places);
        if (this.state.places) {
            // console.log("Inside if");
            return this.state.places.slice(0, 1).map((place) => {
                    return (
                        <div className="row justify-content-center" key={place._id}>
                            <div className="col-12 col-md-5">
                                <div className="card-item card-item-lg">
                                    <Link
                                        to={`/places/${this.state.places[0]._id}`}
                                        className="card-item-bg"
                                        style={{
                                        backgroundImage: `url(images/places/${this.state.places[0].images[2]}.jpeg)`
                                    }}>
                                        <h3 className="card-item-type">{this.state.places[0].type}</h3>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-12 col-md-7">
                                <div className="row mt-3 mt-md-0">
                                    <div className="col-12 col-md-6">
                                        <div className="card-item card-item-sm">
                                            <Link
                                                to={`/places/${this.state.places[1]._id}`}
                                                className="card-item-bg"
                                                style={{
                                                backgroundImage: `url(images/places/${this.state.places[1].images[0]}.jpeg)`
                                            }}>
                                                <h3 className="card-item-type">{this.state.places[1].type}</h3>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mt-3 mt-md-0">
                                        <div className="card-item card-item-sm">
                                            <Link
                                                to={`/places/${this.state.places[2]._id}`}
                                                className="card-item-bg"
                                                style={{
                                                backgroundImage: `url(images/places/${this.state.places[2].images[0]}.jpeg)`
                                            }}>
                                                <h3 className="card-item-type">{this.state.places[2].type}</h3>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="card-item card-item-sm">
                                            <Link
                                                to={`/places/${this.state.places[0]._id}`}
                                                className="card-item-bg"
                                                style={{
                                                backgroundImage: `url(images/places/${this.state.places[0].images[1]}.jpeg)`
                                            }}>
                                                <h3 className="card-item-type">{this.state.places[0].type}</h3>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            )
        }
        return (
            <h2 className="text-center my-5">No Places...</h2>
        )
    }

    render() {
        return (
            <div className="container my-5">
                <h2 className="text-center mb-4">Our Places</h2>
                {this.renderPlaces()}
            </div>
        );
    }
}

export default Places;