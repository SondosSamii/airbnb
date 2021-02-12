import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";

import { getAllPlaces } from '../../actions/places';
import { getAllWishlists, getWishlistsByUserId, addWishlist, deleteByID } from '../../actions/wishlists';
import { getAllReviews, getPlaceReviews, getReviewDetails } from '../../actions/reviews';
import FeaturesIcons from './features-icons';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            wishlists: [],
            userWishlists: [],
            isWishlisted: false,
            reviews: [],
            userId: "5",
            flag:true
        }
    }

    async componentDidMount() {
        await this.props.getAllPlaces();
        await this.setState({places: this.props.places.places});
        console.log("Places: *******", this.state.places);

        await this.props.getAllWishlists();
        await this.setState({wishlists: this.props.wishlists});
        // console.log("Wishlists: ", this.state.wishlists);

        await this.props.getWishlistsByUserId(this.state.userId);
        await this.setState({userWishlists: this.props.userWishlists});
        // console.log("userWishlists: ", this.state.userWishlists);
        
        await this.props.getAllReviews();
        await this.setState({reviews: this.props.reviews});
        // console.log("Reviews: ", this.state.reviews);
    }

    eventHandle = async (id) =>{
        await this.setState({isWishlisted: !this.state.isWishlisted});
        // this.renderWishlistIcon(id);
    }

    rendering = (id) =>{
        var flag = false;
        var wishlist_id = ""; 
            
        
        // console.log(id);
      var found  = this.state.userWishlists.find(
          // eslint-disable-next-line
          (wishlist)=>{ 
              if(wishlist.place_id === id)
              { 
                  wishlist_id = wishlist._id;
                //   console.log("yes");
                // this.setState({isWishlisted: true});
                flag = true;
                  return true;
              }
          });
          if(found && flag){
              return (
                <FaHeart
                className = "wishlist-icon"
                    title = "Remove from wishlist"
                    onClick={async()=> {
                        console.log("before");
                        flag = false;
                        var wishlist_Obj = {
                            user_id:this.state.userId,
                            place_id :id
                        }
                        console.log(wishlist_Obj , "   id " , wishlist_id);
                        await this.props.deleteByID(wishlist_id);
                         this.rendering(id);
                         window.location.reload();
                    }}
                />
              )
          }
          if(!flag || !found){
              return (
                <FaRegHeart
                className = "wishlist-icon"
                title = "Add to wishlist"
                onClick={async ()=> {
                flag = true;
                console.log("noooooo");
                var wishlist_Obj = {
                    user_id:this.state.userId,
                    place_id :id
                }
                console.log(wishlist_Obj);
                await this.props.addWishlist(wishlist_Obj);
                 this.rendering(id);
                 window.location.reload();
                    // this.setState({isWishlisted: !this.state.isWishlisted});
                }}
            />
              )
         
          }
    
      console.log("found: " , found);
    }

    renderWishlistIcon = (id) => {
        // console.log(this.state.userWishlists);
        //let wishlisted = true;
        for (const wishlist of this.state.userWishlists) {
        // this.state.userWishlists.map(wishlist => {
            // console.log(wishlist.place_id)
            if(wishlist.place_id === id && this.state.isWishlisted){
                return (
                    <FaHeart
                    className = "wishlist-icon"
                        title = "Remove from wishlist"
                        onClick={()=> {
                            var wishlist_Obj = {
                                user_id:this.state.userId,
                                place_id :id
                            }
                            console.log(wishlist_Obj);
                            // this.props.deleteByID(wishlist_Obj);
                            this.setState({isWishlisted: !this.state.isWishlisted});
                            console.log("after");
                        }}
                    />
                )
            }
        // });
        }
        return (
            // <div>JJJ</div>
            <FaRegHeart
                className = "wishlist-icon"
                title = "Add to wishlist"
                onClick={()=> {
                    document.body.style.color ="blue";
                    // console.log(e.target);
                    console.log("mmmmm")
                    var wishlist_Obj = {
                        user_id:this.state.userId,
                        place_id :id
                    }
                    console.log(wishlist_Obj);
                    // this.props.addWishlist(wishlist_Obj);
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
                //this.setState({isWishlisted : false});
                return(
                <>
                    {this.state.isWishlisted
                        ?
                        <FaHeart
                            className = "wishlist-icon"
                            title = "Remove from wishlist"
                            onClick={()=> {
                                // this.eventHandle(wishlist.place_id);
                                // console.log(e.target);
                               
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

    renderRatingAvg = (id) => {
        const reviews = this.state.reviews;
        if(reviews) {
            let rate = 0;
            // eslint-disable-next-line
            const result = reviews.filter(review => {
                if(review.place_id === id) {
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

    render() {
        let places = this.props.cards;
        // let places = this.state.places;
        // console.log("/////////////", places);

        if (places && places.length > 0) {
            // console.log("Inside if");
            return places.slice(0, 6).map((place) => {
                return (
                    <div className="col-9 col-sm-6 col-lg-4 mt-4" key={place._id}>
                        <div className="card-item">
                            <div
                                className="card-item-highlight"
                                style={{
                                // backgroundImage: `url(/images/places/${place.images[1]}.jpeg)`
                                backgroundImage: `url(/images/places/place1-3.jpeg)`
                            }}>
                                <h3 className="card-item-name">
                                    {place.name}
                                    <br/>
                                    <FeaturesIcons place={place}/>
                                </h3>
                                <h4 className="card-item-type">{place.type}</h4>
                                {this.rendering(place._id)}
                                {/* {this.renderWishlistIcon(highlight._id)} */}
                                {/* {this.wishlist(highlight._id)} */}
                            </div>
                            <div className="card-item-details">
                                <h4>{place.address.city}, {place.address.country}</h4>
                                {/* <h4>Cairo, Egypt</h4> */}
                                <p className="desc">{place.description}</p>
                                <p className="price">${place.price}</p>
                                <p className="rating">
                                    <FaStar/>&nbsp;{this.renderRatingAvg(place._id)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            )
        }
        return (
            <h2 className="text-center my-5">No Cards...</h2>
        )
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllPlaces,
        getAllWishlists,
        getWishlistsByUserId,
        getAllReviews,
        addWishlist,
        deleteByID,
        getPlaceReviews,
        getReviewDetails
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        places: state.Places,
        wishlists: state.Wishlists,
        userWishlists: state.Wishlists,
        reviews: state.Reviews.all_reviews,
        placeReviews: state.Reviews.place_reviews,
        reviewDetails: state.Reviews.review_details
    };
};

export default connect(mapStateToProps, mapActionToProps)(Cards);