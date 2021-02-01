import React, {Component} from 'react';
import {NavLink as Link} from "react-router-dom";
// import {AiOutlineHeart} from "react-icons/ia";

class Highlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlights: []
        }
        this.baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb/places";
    }

    componentDidMount() {
        fetch(this.baseURL, {method: "GET"})
        .then((resp) => {
            return resp.json();
        }).then((data) => {
            // console.log(data);
            this.setState({highlights: data});
        }).catch((err) => {
            console.log(err);
        });
    }

    renderHighlights = () => {
        // console.log("renderHighlights: ", this.state.highlights);
        if (this.state.highlights) {
            // console.log("Inside if");
            return this.state.highlights.slice(0, 6).map((highlight) => {
                // console.log(highlight);
                    return (
                        <div className="col-9 col-sm-6 col-md-4 col-lg-3 mt-4 mt-md-0" key={highlight.id}>
                            <div className="card-item card-item-md">
                                <Link
                                    to={`/places/${highlight.id}`}
                                    className="card-item-bg"
                                    style={{
                                    backgroundImage: `url(images/places/${highlight.images[0]}.jpeg)`
                                }}>
                                    <div className="card-item-details">
                                        <h3>{highlight.type}</h3>
                                    </div>
                                </Link>
                                {/* <AiOutlineHeart /> */}
                            </div>
                        </div>
                    )
                }
            )
        }
        return (
            <h2 className="text-center my-5">No Highlights...</h2>
        )
    }

    render() {
        return (
            <div className="container my-5">
                <h2 className="text-center mb-0 mb-md-4">Explore Our Highlights</h2>
                <div className="row justify-content-center">
                    {this.renderHighlights()}
                </div>
            </div>
        );
    }
}

export default Highlights;