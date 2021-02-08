import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllPlaces } from '../../actions/places';
import { getAllWishlists, getWishlistsByUserId } from '../../actions/wishlists';
import { getAllReviews } from '../../actions/reviews';

import {FaRegHeart, FaHeart, FaStar, FaTv, FaWifi, FaFan} from "react-icons/fa";
import {MdPets} from "react-icons/md";
import {GiHeatHaze} from "react-icons/gi";

class Highlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlights: [],
            wishlists: [],
            userWishlists: [],
            isWishlisted: true,
            reviews: [],
            userId: "5"
        }
    }

    async componentDidMount() {
        await this.props.getAllPlaces();
        await this.setState({highlights: this.props.highlights});
        // console.log("Highlights Places: ", this.state.highlights);

        await this.props.getAllWishlists();
        await this.setState({wishlists: this.props.wishlists});
        // console.log("Highlights Wishlists: ", this.state.wishlists);

        await this.props.getWishlistsByUserId(this.state.userId);
        await this.setState({userWishlists: this.props.userWishlists});
        // console.log("Highlights userWishlists: ", this.state.userWishlists);
        
        await this.props.getAllReviews();
        await this.setState({reviews: this.props.reviews});
        // console.log("Highlights Reviews: ", this.state.reviews);
    }

    renderWishlistIcon = (id) => {
        // console.log(this.state.userWishlists);
        let wishlisted = true;
        for (const wishlist of this.state.userWishlists) {
        // this.state.userWishlists.map(wishlist => {
            // console.log(wishlist.place_id)
            if(wishlist.place_id === id && wishlisted){
                return (
                    <FaHeart
                        className = "wishlist-icon"
                        title = "Remove from wishlist"
                        onClick={()=> {
                            // console.log(e.target);
                            console.log("before");
                            // wishlisted = !wishlisted;
                            this.setState({isWishlisted: !this.state.isWishlisted});
                            console.log("after");
                        }}
                    />
                )
            }
        // });
        }
        return (
            <FaRegHeart
                className = "wishlist-icon"
                title = "Add to wishlist"
                onClick={()=> {
                    // console.log(e.target);
                    this.setState({isWishlisted: !this.state.isWishlisted});
                }}
            />
        )
    }

    wishlist = (id) => {
        // console.log(this.state.userWishlists);
        for (const wishlist of this.state.userWishlists) {
        // this.state.userWishlists.map(wishlist => {
            // console.log(wishlist.place_id)
            if(wishlist.place_id === id){
                return(
                <>
                    {this.state.isWishlisted
                        ?
                        <FaHeart
                            className = "wishlist-icon"
                            title = "Remove from wishlist"
                            onClick={()=> {
                                // console.log(e.target);
                                this.setState({isWishlisted: !this.state.isWishlisted});
                            }}
                        />
                        :
                        <FaRegHeart
                            className = "wishlist-icon"
                            title = "Add to wishlist"
                            onClick={()=> {
                                // console.log(e.target);
                                this.setState({isWishlisted: !this.state.isWishlisted});
                            }}
                        />
                    }
                </>
                )
            }
        }
        // )};
    }

    renderRating = (placeId) => {
        const reviews = this.state.reviews;
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
                        <div className="col-9 col-sm-6 col-lg-4 mt-4" key={highlight._id}>
                            <div className="card-item">
                                <div
                                    className="card-item-highlight"
                                    style={{
                                    backgroundImage: `url(images/places/${highlight.images[1]}.jpeg)`
                                }}>
                                    <h3 className="card-item-name">
                                        {highlight.name}
                                        <br/>
                                        {this.icons(highlight)}
                                    </h3>
                                    <h4 className="card-item-type">{highlight.type}</h4>
                                    {/* {this.renderWishlistIcon(highlight._id)} */}
                                    {this.wishlist(highlight._id)}
                                </div>
                                <div className="card-item-details">
                                    <h4>{highlight.address.city}, {highlight.address.country}</h4>
                                    <p className="desc">{highlight.description}</p>
                                    <p className="price">${highlight.price}</p>
                                    <p className="rating"><FaStar/>&nbsp;{this.renderRating(highlight._id)}</p>
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
            <>
                {this.renderHighlights()}
            </>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllPlaces,
        getAllWishlists,
        getWishlistsByUserId,
        getAllReviews
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        highlights: state.Places,
        wishlists: state.Wishlists,
        userWishlists: state.Wishlists,
        reviews: state.Reviews
    };
};

export default connect(mapStateToProps, mapActionToProps)(Highlights);