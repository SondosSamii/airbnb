import {Component} from 'react';
import {FaRegHeart, FaHeart, FaStar, FaTv, FaWifi, FaFan} from "react-icons/fa";
import {MdPets} from "react-icons/md";
import {GiHeatHaze} from "react-icons/gi";

class Highlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlights: [],
            wishlist: [],
            reviews: [],
            userId: 3
        }
        this.baseURL = "http://my-json-server.typicode.com/sondossamii/airbnb";
    }

    componentDidMount() {
        fetch(`${this.baseURL}/places`, {method: "GET"})
        .then((resp) => {
            return resp.json();
        }).then((data) => {
            // console.log(data);
            this.setState({highlights: data});
        }).catch((err) => {
            console.log(err);
        });

        fetch(`${this.baseURL}/wishlist`, {method: "GET"})
        .then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data);
            this.setState({wishlist: data});
        }).catch((err) => {
            console.log(err);
        });

        fetch(`${this.baseURL}/reviews`, {method: "GET"})
        .then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data);
            this.setState({reviews: data});
        }).catch((err) => {
            console.log(err);
        });
    }

    wishlist = () => {
        if(this.state.isWishlisted) {
            return (
                <FaHeart
                    className = "wishlist-icon"
                    title = "Remove from wishlist"
                    onClick={()=>this.setState({isWishlisted: !this.state.isWishlisted})}
                />
            )
        }
        return (
            <FaRegHeart
                className = "wishlist-icon"
                title = "Add to wishlist"
                onClick={()=>this.setState({isWishlisted: !this.state.isWishlisted})}
            />
        )
    }

    // renderWishlist = (placeId) => {

    // }

    renderRating = (placeId) => {
        const reviews = this.state.reviews
        if(reviews) {
            let rate = 0;
            // eslint-disable-next-line
            const result = reviews.filter(review => {
                if(review.place_id === placeId) {
                    return review.rating;
                }
            });
            // console.log("Result", result);
            // console.log("Result Length: ", result.length);
            result.map(rev => {
                rate += rev.rating;
                return rate;
                // return rev.rating;
            });
            const avg = rate / result.length
            // console.log(avg);
            return avg;
        }
    }

    icons = (place) => {
        return (
            <>
                {place.has_tv && <FaTv className="highlight-icon"/>}
                {place.has_wifi && <FaWifi className="highlight-icon"/>}
                {place.pets && <MdPets className="highlight-icon"/>}
                {place.has_air_conditioner && <FaFan className="highlight-icon"/>}
                {place.has_heating_system && <GiHeatHaze className="highlight-icon"/>}
            </>
        )
    }

    renderHighlights = () => {
        // console.log("renderHighlights: ", this.state.highlights);
        if (this.state.highlights) {
            // console.log("Inside if");
            return this.state.highlights.slice(0, 6).map((highlight) => {
                // console.log(highlight.images[0]);
                    return (
                        <div className="col-9 col-sm-6 col-lg-4 mt-4" key={highlight.id}>
                            <div className="card-item">
                                <div
                                    className="card-item-highlight"
                                    style={{
                                    backgroundImage: `url(images/places/${highlight.images[1]}.jpeg)`
                                }}>
                                    <h3 className="card-item-type">
                                        {highlight.type}
                                        <br/>
                                        {this.icons(highlight)}
                                    </h3>
                                    {this.wishlist()}
                                </div>
                                <div className="card-item-details">
                                    <h4>{highlight.address.city}, {highlight.address.country}</h4>
                                    <p className="desc">{highlight.description}</p>
                                    <p className="price">${highlight.price}</p>
                                    <p className="rating"><FaStar/>&nbsp;{this.renderRating(highlight.id)}</p>
                                </div>
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
                <h2 className="text-center mb-0">Explore Our Highlights</h2>
                <div className="row justify-content-center">
                    {this.renderHighlights()}
                </div>
            </div>
        );
    }
}

export default Highlights;