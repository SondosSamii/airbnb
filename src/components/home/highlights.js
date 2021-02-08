import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllPlaces } from '../../actions/places';
import { getAllWishlists, getWishlistsByUserId , addWishlist , deleteByID } from '../../actions/wishlists';
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
            isWishlisted: false,
            reviews: [],
            userId: "5",
            flag:true
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
    eventHandle = async (id) =>{
        await this.setState({isWishlisted: !this.state.isWishlisted});
        // this.renderWishlistIcon(id);
    }
    rendering = (id) =>{
        var flag = false;
        var wishlist_id = ""; 
            
        
        // console.log(id);
      var found  = this.state.userWishlists.find(
          (wishlist)=>{ 
              if(wishlist.place_id == id)
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
        if(this.props.filteredPlaces) {
            console.log("Filtered from highlights", this.props.filteredPlaces);
        }
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
                                    backgroundImage: `url(/images/places/${highlight.images[1]}.jpeg)`
                                }}>
                                    <h3 className="card-item-name">
                                        {highlight.name}
                                        <br/>
                                        {this.icons(highlight)}
                                    </h3>
                                    <h4 className="card-item-type">{highlight.type}</h4>
                                    {this.rendering(highlight._id)}
                                    {/* {this.renderWishlistIcon(highlight._id)} */}
                                    {/* {this.wishlist(highlight._id)} */}
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
                {/* <FaRegHeart style={{backgroundColor:"blue"}}/> */}
            </>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllPlaces,
        getAllWishlists,
        getWishlistsByUserId,
        getAllReviews,
        addWishlist,
        deleteByID
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