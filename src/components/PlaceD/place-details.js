import React, {Component} from "react";
import {NavLink as Link} from 'react-router-dom';
import {SiGithub} from "react-icons/si";
import {useState, useEffect} from "react";
import Slider from "react-slick";
import {FaTv, FaWifi, FaFan, FaUserAlt, FaBath, FaHome} from "react-icons/fa";
import {FiEdit} from "react-icons/fi";
import {IoIosBed} from "react-icons/io";
import {MdPets} from "react-icons/md";
import {GoGlobe} from "react-icons/go";
import {GiHeatHaze,GiCampCookingPot, GiMoneyStack} from "react-icons/gi";
import { getPlaceById ,updatePlace } from "../../actions/places";
import { AllClients } from "../../actions/clients";
import {getPlaceReviews,AllReviews} from "../../actions/reviews";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReviewAdding from "../Forms/review";
import { AiFillEdit } from "react-icons/ai";
import "./place-details.css";

// import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: "100%",
    height: "100%"
  };
  
  const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '350px' // The same height of its parent in render
  };

class GetPlaceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placedata: [],
            place_id:"",
            img:[],
            address:[],
            reviews: [],
            allreviews:[],
            users:[],
            username:[],
            userimg:[],
            owner:false,
            isAuth: false
        }
    }
    async componentDidMount(){
        console.log(this.props.match.params.id)
        // const id = this.props.match.params.id;
        // this.setState({place_id: id});
        // this.setState({place_id: this.props.match.params.id});
        // console.log("*****", this.state.place_id);

        this.setState({token: localStorage.getItem("token")});
        this.setState({UserId: localStorage.getItem("user_id")});
        if(localStorage.getItem("token")){
            this.setState({isAuth: true});
            // alert("please login frist!");
            // this.props.history.push("/");
        }
        await this.props.getPlaceById(this.props.match.params.id);
        await this.props.AllClients();
        await this.props.getPlaceReviews(this.props.match.params.id);
        this.setState({reviews:this.props.reviews.reviews});
        await this.props.AllReviews();
        this.setState({allreviews:this.props.allreviews.reviews});
        // console.log("3333333333333333333333",this.props.allreviews.reviews)
        console.log("!!!!!!!!!!!", this.props.placeDetails);
        console.log("-----------", this.props.placeDetails.place)
        var place= this.props.placeDetails.place;
        localStorage.setItem("place_id", place._id);
        this.setState({address:place.address});
        this.setState({img:place.images});
        this.setState({placedata:place});
        this.setState({users:this.props.users.users});
        if(localStorage.user_id === this.state.placedata.user_id){
            this.setState({owner:true})
        }
        // console.log(this.state.reviews)
        // console.log(this.state.allreviews)
        // console.log("33333333333333",this.props.users.users)
        
    }
    // async componentDidMount() {
    //     await fetch("http://localhost:3001/places/", {method: 'GET'})
    //         .then(res => {
    //             return res.json();
    //         }).then( data => {
    //             console.log(data);
    //             for(const place of data)
    //             if(place._id==1){
    //                  this.setState({placeData:place});
    //                 this.setState({img:place.images});
    //                 this.setState({address:place.address});
    //                 console.log("#########################",place.images)
    //                 console.log(this.state.placeData.type);
    //                 console.log("............",this.state.address);
    //             };
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //         await fetch("http://localhost:3001/reviews/", {method: "GET"})
    //         .then((res) => {
    //             return res.json();
    //         }).then((data) => {
    //             const reviews =[];
    //             for(const review of data)
    //             if(review.place_id==1){
    //                 reviews.push(review);
    //             }
    //             this.setState({reviews: reviews});
    //             console.log(reviews);
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //         await fetch("http://localhost:3001/users/", {method: "GET"})
    //         .then((res) => {
    //             return res.json();
    //         }).then((data) => {
    //             this.setState({Users: data});
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     }
        



     PlaceSlider= () => {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2500
        };
        if(this.state.img){
            return (
                <div style={{position: 'relative', overflow: 'hidden' }}>
                <Slider {...settings}>
                      {this.state.img.map((images)=>{
                          console.log(images);
                    return (
                       <div>
                           <img
                            className="slideshow-bg w-100"
                            src={`http://localhost:8080/${images}`}
                            alt=""
                            />
                       </div>
                        // <div className="slideshow-bg"
                        //     style={{backgroundImage: `url('http://localhost:8080/${images}')`}}
                        // >
                        // </div>
                       );})} 
                       
                            {/* <div><img style={{width:"100%"}} className="slideshow-bg" src="/img/pexels-photo-59520.jpeg"/></div>
                            <div><img style={{width:"100%"}} className="slideshow-bg" src="/img/pexels-photo-59520.jpeg"/></div> */}
                            {/* <div><img className="slideshow-bg" src={`/img/${this.state.placeData.images[0]}`}/></div> */}
                    
                </Slider>
                <h1 className="Place-name " > {this.state.placedata.name}</h1> 
                </div>
            )
        }
        else{
            return (
                <h2 className="text-center my-5">No Places...</h2>
            )
        }
    }

     Placelocation(){
        if(this.state.placedata){

            const place=this.state.placedata;
            return (
                <>
                <div className="row justify-content-center align-items-center py-5">
                    <h2 style={{
                        width: 'fit-content',
                        padding: '0.5em 1em',
                        borderRadius: 'var(--border-radius)',
                        boxShadow: 'var(--shadow)',
                        marginBottom: 0
                        }}>
                            Place Information
                    </h2>
                    {this.state.owner && (
                        <>
                            <Link to={`/place-edit/${this.props.match.params.id}`}
                                className="place-edit-icon">
                                    <FiEdit />
                            </Link>
                        </>
                    )}
                </div>
                <div className="container">
                    <div className="featchers row">
                        <div className="col-12 col-md-6 mt-3"
                            style={{position: 'relative'}}>
                            <div className="row justify-content-center">
                                <div className="outer-circle first">
                                  <div className="inner-circle"> 
                                    <div className="circle-container">
                                        <div className="text">
                                            <p className="value">${this.state.placedata.price}</p>
                                            <p className="type"><GiMoneyStack/></p>
                                        </div>
                                    </div>
                                  </div>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </div>

                                <div className="outer-circle second mx-5">
                                  <div className="inner-circle"> 
                                    <div className="circle-container">
                                        <div className="text">
                                            <p className="value">
                                                {this.state.address.city}
                                                <br/>
                                                {this.state.address.country}
                                            </p>
                                            <p className="type"><GoGlobe/></p>
                                        </div>
                                    </div>
                                  </div>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </div>

                                <div className="outer-circle third">
                                  <div className="inner-circle"> 
                                    <div className="circle-container">
                                        <div className="text">
                                            <p className="value">{this.state.placedata.type}</p>
                                            <p className="type"><FaHome/></p>
                                        </div>
                                    </div>
                                  </div>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </div>
                            </div>
                        </div>

                        {/* <div className="col-12 col-md-6">
                            <div className="row">
                                <div className="col-5">
                                    <p className="h4">Type: </p>
                                    <p className="h4">City: </p>
                                    <p className="h4">Country: </p>
                                    <p className="h4">Zipcode: </p>
                                    <p className="h4">Price Per Night: </p>
                                </div>
                                <div className="col-6">
                                    <p className="h4">{this.state.placedata.type}</p>
                                    <p className="h4">{this.state.address.city}</p> 
                                    <p className="h4">{this.state.address.country}</p> 
                                    <p className="h4">{this.state.address.zipcode}</p>
                                    <p className="h4">${this.state.placedata.price}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p className="h4">Discription:</p>
                                    <p className="h5">{ this.state.placedata.description}</p>
                                </div>
                            </div>
                        </div>
 */}
                        <div className="col-12 col-md-6 bg-dark" style={{height: '350px'}}>
                                {/* Don't Delete */}
                                {/* <Map
                                        google={this.props.google}
                                        zoom={8}
                                        style={mapStyles}
                                        containerStyle={containerStyle}
                                        initialCenter={{
                                        lat:47.49855629475769,
                                        lng: -122.14184416996333
                                        }}
                                        center={this.state.placedata.location}
                                        onClick={this.mapClicked}>
                                        <Marker  position={this.state.placedata.location}
                                        onClick={() => console.log("You clicked me!")} />

                                    </Map>  */}
                        </div>
                    </div>
                </div>
                </>
            )
        }
    }
     Placefetcher=()=>{
        if(this.state.placedata)
        var place=this.state.placedata;{
            return (
                <div className="featchers row">
                    <h2 style={{height:"40px"}} className="text-center col-12 p-0">Available Features</h2>
                    <div className=" col-lg-12 col-md-6 ">
                    <ul>
                        <div className=" pb-5">
                        {this.state.placedata.has_wifi && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><FaWifi className=" mr-3"/> WIFI</li> )}
                        {this.state.placedata.has_heating_system && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><GiHeatHaze className=" mr-3"/> Heating System </li> )}
                        {this.state.placedata.has_airconditioner && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><FaFan className=" mr-3"/> Air Conditioner </li> )}
                        
                        
                        {this.state.placedata.has_tv && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><FaTv className=" mr-3"/> TV </li> )}
                        {this.state.placedata.pets && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><MdPets className=" mr-3 "/> Allow Pets </li> )}
                        </div>
                    </ul>
                    </div>
                    <div className="col-lg-12 col-md-6">
                    <ul>
                        <div className="pb-3">
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"> Max Number of Guests </li>
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center">Beds Number </li>
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center">Available Rooms </li>
                        </div>
                        <div className="pb-3">
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><FaUserAlt className=" mr-3"/> {place.max_guests} </li>
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><IoIosBed className=" mr-3 "/> {place.total_beds} </li>
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><IoIosBed className=" mr-3 "/> {place.total_rooms} </li>
                        </div>
                        <div className="pt-3 m-auto">
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"> Available Bathroom </li>
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center">Available Kitchen </li>
                        </div>
                        <div className="pt-3 ml-auto">
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><FaBath className=" mr-3"/> {place.total_bathrooms} </li>
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><GiCampCookingPot className=" mr-3 "/> {place.total_kitchens} </li>
                        </div>
                    </ul>
                    </div>
                </div>
            )
        }
    }
    Review(){
         if(this.state.reviews){
        var allreviews=this.state.allreviews;
        var reviews=this.state.reviews;
        var allusers=this.state.users;
        console.log(allreviews)
        console.log(reviews)
        var placeReviews=[];
        let rate=0;
        let username=[];
        let userimg=[];
        reviews.map(r =>{
            allreviews.map( r2 =>{
                if(r2._id === r){
                    placeReviews.push(r2);
                }
            })
        });
        console.log(placeReviews)
        placeReviews.map(r=>{
            allusers.map(oneuser=>{
                if(r.user_id === oneuser._id){
                    username.push(oneuser.name);
                    userimg.push(oneuser.profile_image);
                    console.log(oneuser)
                }
                
            })
            rate += r.rating; 
            
        });
        const avg = rate / allreviews.length;
        const newavg=avg.toFixed(1)
            console.log(newavg)
        var uName=[];
        var uImg=[];
        //console.log("22222222222222",user)
        //console.log("333333333333", placeReviews)
        
        if(placeReviews.length > 0) {
            return (
                <div className="review row " style={{height:"100% !important"}}>
                    <h2  className="text-center col-12 pb-0 mb-0 mt-5">User Reviews</h2>
                    
{/*                     
                    <div className="col-3 ">
                        {user.slice(0,3).map(user => (
                        
                        <div className="col-6 ml-auto pb-5 users">
                            <p className=" text-center h4" >{user.name}</p>
                            <div className="user-photo  m-auto">
                                {user.profile_image ? <img src={`http://localhost:8080/${user.profile_image}`} /> : <img src={`/img/avatar.png`} />}
                            </div>
                        </div>
                        
                        
                      ))}
                    </div> 

                    <div className="col-8 users">
                      {allreviews.slice(0,3).map(rev => (
                        <div>
                        <div className="pl-4 col-12 py-3 ">
                        <p className="h4">{rev.comment}</p>
                        </div>
                        <div className="pl-4 col-12 py-3">
                        <p className="h4 pl-5 pb-2">{rev.rating} <span className="text-muted">/5</span></p>
                        </div>
                        </div>
                        ))}
                    </div> 
                         */} 

                    <div className="container users">
                      {placeReviews.slice(0,3).map((rev,index) =>(
                          <>
                        <div className="row my-2">
                            <div className="col-3">
                                <div className="user-photo  m-auto">
                                    {userimg[index] ? <img src={`http://localhost:8080/${userimg[index]}`} /> : <img src={`/img/avatar.png`} />}
                                </div>
                            </div>
                            <div className="col-9">
                            <p className="h4" >{username[index]}</p>
                            <p className="h4">{rev.comment}</p>
                            <p className="h4 pl-5 pb-2">{rev.rating} <span className="text-muted">/5</span></p>
                            </div>
                            
                        </div>
                        <hr style={{borderColor:"gray",width:"75%"}}/>
                        </>
                        ))}
                    </div>  
                </div>
            )
        }
        }
    }
Model(){
    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header border-0">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <ReviewAdding history={this.props.history} />
                </div>
                
                </div>
            </div>
            </div>
    )
}
btnModel(){
    return(<div className="row justify-content-end">
            <button type="button" className="btn mr-5 mt-auto main-btn"
                data-toggle="modal" data-target="#exampleModal">
                Add Review
            </button>
            <Link to={`/reservation/${this.props.match.params.id}`} type="button" className="btn mr-5 mt-auto main-btn" >
                Make Reservation
            </Link>
        </div>)
}
    render(){
    return (
        <section id="place-details" style={{position: 'relative', overflow: 'hidden',width:"100%"}}>
            {this.PlaceSlider()}
            {this.Placelocation()}
            {this.Placefetcher()} 
            {this.state.isAuth && this.btnModel()}
            {this.Review()}
           {this.Model()}
        </section>
    )}
}

const mapactiontoprops = (disptch) => {
    return bindActionCreators(
      {
        AllClients,
        getPlaceById,
        getPlaceReviews,
        AllReviews
        
      },
      disptch
    );
  };
  const mapstatetoprops = (state) => {
    return {
      users: state.Clients,
      placeDetails: state.Places.place_details,
      reviews: state.Reviews.place_reviews,
      allreviews:state.Reviews.allreviews
      
      
    };
  };
//   export default connect(mapstatetoprops, mapactiontoprops)(GoogleApiWrapper({
//     apiKey: "AIzaSyDED1xIAqSktQ5LAnZ5BCVIkwtKbJPT31U" })(GetPlaceDetails)) ;

export default connect(mapstatetoprops, mapactiontoprops)(GetPlaceDetails);