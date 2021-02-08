import React, {Component} from 'react';
import {NavLink as Link} from "react-router-dom";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getAllPlaces} from "../../actions/places";
import {getAllWishlists} from "../../actions/wishlists";

class Places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            wishlists: []
        }
        // this.baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb/places";
    }

    async componentDidMount() {
        await this.props.getAllPlaces();
        await this.setState({places: this.props.places});
        // console.log("Home Places ", this.state.places);
        
        await this.props.getAllWishlists();
        await this.setState({wishlists: this.props.wishlists});
        // console.log("Home Wishlists ", this.state.wishlists);
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
                                        <h3 className="card-item-name">{this.state.places[0].name}</h3>
                                        <h4 className="card-item-type">{this.state.places[0].type}</h4>
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
                                                <h3 className="card-item-name">{this.state.places[1].name}</h3>
                                                <h4 className="card-item-type">{this.state.places[1].type}</h4>
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
                                                <h3 className="card-item-name">{this.state.places[2].name}</h3>
                                                <h4 className="card-item-type">{this.state.places[2].type}</h4>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="card-item card-item-sm">
                                            <Link
                                                to={`/places/${this.state.places[3]._id}`}
                                                className="card-item-bg"
                                                style={{
                                                backgroundImage: `url(images/places/${this.state.places[3].images[1]}.jpeg)`
                                            }}>
                                                <h3 className="card-item-name">{this.state.places[3].name}</h3>
                                                <h4 className="card-item-type">{this.state.places[3].type}</h4>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
        }
        return (
            <h2 className="text-center my-5">No Places...</h2>
        )
    }

    render() {
        return (
            <>
                {this.renderPlaces()}
            </>
        );
    }
}

const mapActionToProps = (disptch) => {
    return bindActionCreators({
        getAllPlaces,
        getAllWishlists
    }, disptch);
};

const mapStateToProps = (state) => {
    return {
        places: state.Places,
        wishlists: state.Wishlists
    };
};

export default connect(mapStateToProps, mapActionToProps)(Places);