import React, {Component} from 'react';
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";

import { getAllPlaces } from '../../actions/places';
import { getWishlistsByUserId, addWishlist, deleteWishlistById, deleteByID ,getWishlistByID} from '../../actions/wishlists';
import { getAllReviews, getPlaceReviews, getReviewDetails , getPlaceRatings} from '../../actions/reviews';
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
            flag:true,
            avgArr: [],
            ratingResult: 0,
            token: "",
            UserWishlists:[],
            avrgs:[],
            isAuth: false
            // userWishlists:[]
        }
    }

    async componentDidMount() {
        await this.props.getAllPlaces();
         this.setState({places: this.props.places.places});
        // console.log("Places: *******", await this.state.places);
        // await this.setState({places: this.props.places});
        // console.log("Places: *******", this.state.places.places);

        // await this.props.getAllWishlists();
        // await this.setState({wishlists: this.props.wishlists});
        // console.log("Wishlists: ", this.state.wishlists);

        await this.props.getWishlistsByUserId(this.state.userId);
        await this.setState({userWishlists: this.props.userWishlists});
        // console.log("userWishlists: ", this.state.userWishlists);
        this.setState({userId:localStorage.getItem("user_id")});
        if(localStorage.getItem("token")){
            this.setState({isAuth : true});
        }
        
        
        // await this.props.getAllReviews();
        // await this.setState({reviews: this.props.reviews});
        // console.log("Reviews: ", this.state.reviews);

        // await this.props.getPlaceReviews("601cd04e9b694d3c30abc913");
        // console.log("$$$$$$$$$$$ ", this.props.placeReviews.reviews);

        // await this.props.getReviewDetails("601c2b3dbdacaa26ec53b067");
        // console.log("########### ", this.props.reviewDetails.review);

        // this.renderRating("601cd04e9b694d3c30abc913");

        
        // this.state.places.slice(0, 6).map(place => {
        //     let avg = this.renderRating(place._id);
        //     this.setState((state) => {
        //         const avgArr = state.avgArr.push(avg);
        //         return avgArr;
        //     })
        //     console.log(this.state.avgArr);
        // });

        // console.log("000000 ", this.state.result);
        this.setState({token: localStorage.getItem("token")});
           let  places = this.props.cards;
    
        // Error Here
        // console.log("place:############# " , places);
        // places.slice(0,6).map(async(place)=>{
        //     var id = place._id;
        //     await this.props.getPlaceReviews(id);
        //     console.log("...............", this.props.placeReviews);
        //     // return id;
        //     const reviews = this.props.placeReviews.reviews;
        //     // console.log("reviews: ", reviews)
        //     if (reviews && reviews.length > 0) {
        //         console.log("@@@@@@@@@@@@@@@@22222222");
        //         let rate = 0;
        //         var avg =0;
        //         var result =0;
        //         result = await reviews.map(async rev => {
        //             // console.log("rev: ", rev);
        //             await this.props.getReviewDetails(rev);
        //             if(this.props.reviewDetails) {
        //                 var rating =  this.props.reviewDetails.review.rating;
        //                 // console.log("ratingggggggg : ", this.props.reviewDetails.review.rating);
        //                 rate += rating;
        //                 // console.log("rate: ", rate);
        //                 return rate;
        //             }
        //         })
        //         var sum =0;
        //         // console.log("kkkkkkkkk:   ",result[result.length-1]);
        //         result[result.length-1].then((promise)=>{
        //             // console.log("promise: " , promise);
        //             avg = promise / reviews.length;
        //             console.log("avg..................: ", avg);
        //             this.setState({result: avg});
        //             this.setState((state) => {
        //                 const avrgs = state.avrgs.push(avg.toFixed(1));
        //                 return avrgs;
        //             })

        //         })

        //             // result.map((promise)=>{
        //             //     // console.log("promiiiiiiiseeeee:  ",promise)
        //             //     promise.then((ava)=>{
        //             //         console.log("../.,,,,,,:  " ,ava);
        //             //             sum += ava;
        //             //             console.log("summm:   ",sum);
        //             //             return sum;
        //             //     }).then((sum)=>{
        //             //         var avg = sum / reviews.length;
        //             //         console.log("avg: ", avg);
        //             //     })
        //             // })

        //             // console.log("reviews.length: ", reviews.length ,  "   " , result);
        //             // var avg = result / reviews.length;
        //             // console.log("avg: ", avg);

        //         // var res = result.then(
        //         // })
        //         // return avg;
        //     }
       
        //     // console.log("result: " , this.state.result);
        // })
            await this.getPlace_Reviews();


       
        await this.userWishlists();
    }

    getPlace_Reviews = ()=>{
        let places  = this.props.cards;
        places.slice(0,6).map(async(place)=>{
            var id = place._id;
            console.log("id:  " , id);
            await this.props.getPlaceRatings(id);
            console.log("!!!!!!!!!!!!!!11:  ",id , "   "  , this.props.placeRatings);
            
            // [1, 2, 3, 4].reduce((a, b) => a + b, 0
        })
    }

    eventHandle = async (id) =>{
        await this.setState({isWishlisted: !this.state.isWishlisted});
        // this.renderWishlistIcon(id);
    }

    userWishlists = async () => {
        await this.props.getWishlistsByUserId(this.state.token);
        // console.log("hereeeeeee:   ",this.props.userWishlists);
        // Error Here
        // if(this.props.userWishlists.wishlists && this.props.userWishlists.wishlists > 0){
        if(this.props.userWishlists.wishlists){
            this.props.userWishlists.wishlists.map(async(wishlist_id)=>{
            await this.props.getWishlistByID(this.state.token,wishlist_id);
            // console.log(".........." , this.props.wishlistDetails.wishlist);
            var wishlist_details = this.props.wishlistDetails;
            this.setState((state) => {
                const userWishlists = state.UserWishlists.push(wishlist_details.wishlist);
                return userWishlists;
            })
        })
        // console.log("llllllllll: " , this.state.UserWishlists);

        }
        // this.setState({use})
    }

    rendering = (id) =>{//for palceID
        var flag = false;
        var wishlist_id = ""; 
            
        
        // console.log(id);
      var found  = this.state.UserWishlists.find(
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
                        await this.props.deleteWishlistById(this.state.token,wishlist_id);
                        //  this.rendering(id);
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
                    place_id :id
                }
                console.log(wishlist_Obj);
                await this.props.addWishlist(this.state.token,wishlist_Obj);
                //  this.rendering(id);
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

    renderRating = async (id) => {
        console.log("id: " , id);
        // await this.props.getPlaceReviews();
        // await this.props.getReviewDetails();

        // await this.props.getPlaceReviews("601cd04e9b694d3c30abc913");
        // console.log("$$$$$$$$$$$ ", this.props.placeReviews.reviews);

        // await this.props.getReviewDetails("601c2b3dbdacaa26ec53b067");
        // console.log("########### ", this.props.reviewDetails.review);

        await this.props.getPlaceReviews(id);
        console.log("...............", this.props.placeReviews);
        // return id;
        const reviews = this.props.placeReviews.reviews;
        console.log("reviews: ", reviews)
        if (reviews && reviews.length > 0) {
            let rate = 0;
            var avg =0;
            var result =0;
            result = await reviews.map(async rev => {
                // console.log("rev: ", rev);
                await this.props.getReviewDetails(rev);
                var rating =  this.props.reviewDetails.review.rating;
                // console.log("ratingggggggg : ", this.props.reviewDetails.review.rating);
                rate += rating;
                // console.log("rate: ", rate);
                return rate;
            })
            var sum =0;
            // console.log("kkkkkkkkk:   ",result[result.length-1]);
            result[result.length-1].then((promise)=>{
                // console.log("promise: " , promise);
                 avg = promise / reviews.length;
                  console.log("avg: ", avg);
                  this.setState({result: avg});
                  return avg;
                  
                            })
            
                // result.map((promise)=>{
                //     // console.log("promiiiiiiiseeeee:  ",promise)
                //     promise.then((ava)=>{
                //         console.log("../.,,,,,,:  " ,ava);
                //             sum += ava;
                //             console.log("summm:   ",sum);
                //             return sum;
                //     }).then((sum)=>{
                //         var avg = sum / reviews.length;
                //         console.log("avg: ", avg);
                //     })
                // })
                    console.log("reviews.length: ", reviews.length ,  "   " , result);
                    var avg = result / reviews.length;
                    console.log("avg: ", avg);
                
            // var res = result.then(
            // })
            return avg;
        }
            // let result = 0;
            // await reviews.map(async review => {
            //     // console.log("+++++++++++++++++", review);
            //     await this.props.getReviewDetails(review);
            //     // const rating = this.props.reviewDetails.review.rating;
            //     // console.log("########### ", rating);
            //     // result += rating;
            //     console.log(result);
            //     result += this.props.reviewDetails.review.rating;
            //     this.setState({ratingResult: result});
            //     console.log("////////////", this.state.ratingResult);
            //     return result;
            // })
            // console.log("===========", this.state.ratingResult);
            // // console.log("////////////", reviews.length);
            // const avg = this.state.ratingResult / reviews.length;
            // // console.log("@@@@@@@@@", avg);
            // return avg;
        // }
        // return 0;
    }

    render() {
        let places = this.props.cards;
        // let places = this.state.places;
        // console.log("/////////////", places);
        // console.log("place://///////////////////////// " , this.state.places);
       
        if (places && places.length > 0) {
            // console.log("Inside if");
            return places.slice(0, 6).map((place,index) => {
                return (
                    <div className="col-9 col-sm-6 col-lg-4 mt-4" key={place._id}>
                        <div className="card-item">
                            <div
                                className="card-item-highlight"
                                style={{
                                // backgroundImage: `url(/images/places/place1-2.jpeg)`
                                backgroundImage: `url(http://localhost:8080/${place.images[0]})`
                            }}>
                                <h3 className="card-item-name">
                                    <Link to={`/place-details/${place._id}`}
                                        className="text-white">
                                        {place.name}
                                    </Link>
                                    <br/>
                                    <FeaturesIcons place={place}/>
                                </h3>
                                <h4 className="card-item-type">{place.type}</h4>
                                { this.state.isAuth && this.rendering(place._id) }
                                {/* {this.renderWishlistIcon(highlight._id)} */}
                                {/* {this.wishlist(highlight._id)} */}
                            </div>
                            <div className="card-item-details">
                                <h4>{place.address.city}, {place.address.country}</h4>
                                {/* <h4>Cairo, Egypt</h4> */}
                                <p className="desc">{place.description}</p>
                                <p className="price">${place.price}</p>
                                <p className="rating">
                                    {/* { this.state.avrgs[index] > 0 && <FaStar className="mr-1" /> }
                                    { this.state.avrgs[index] > 0 && this.state.avrgs[index] } */}
                                    {/* <FaStar className="mr-1" /> 4.3 */}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            )
        }
        return (
            <></>
            // <h2 className="text-center my-5">No Cards...</h2>
        )
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllPlaces,
        deleteWishlistById,
        getWishlistsByUserId,
        getAllReviews,
        addWishlist,
        deleteByID,
        getPlaceReviews,
        getReviewDetails,
        getWishlistByID,
        getPlaceRatings
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        places: state.Places,
        wishlists: state.Wishlists,
        userWishlists: state.Wishlists,
        reviews: state.Reviews.all_reviews,
        placeReviews: state.Reviews.place_reviews,
        // placeReviews: state.Reviews,
        reviewDetails: state.Reviews.review_details,
        // reviewDetails: state.Reviews,
        // reviewDetails: state.Reviews
        userWishlists: state.Wishlists.wishlistsByUserId,
        addWishlist: state.Wishlists,
        wishlistDetails: state.Wishlists.wishlist_details,
        placeRatings : state.Reviews.place_ratings
    };
};

export default connect(mapStateToProps, mapActionToProps)(Cards);