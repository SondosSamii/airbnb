import React, {Component} from "react";
import {NavLink as Link} from 'react-router-dom';
import {SiGithub} from "react-icons/si";
import {useState, useEffect} from "react";
import Slider from "react-slick";
import {FaTv, FaWifi, FaUserAlt, FaBath, FaHome, FaStar} from "react-icons/fa";
import {FiEdit} from "react-icons/fi";
import {IoIosBed, IoIosSnow} from "react-icons/io";
import {MdPets} from "react-icons/md";
import {GoGlobe} from "react-icons/go";
import {GiFireplace, GiForkKnifeSpoon, GiMoneyStack, GiDoorHandle} from "react-icons/gi";
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
            isAuth: false,
            rate:"new"
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
        this.state({rate:this.place.ratingsValue})
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
        



     placeSlider= () => {
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
                <h1 className="Place-name" >{this.state.placedata.name}</h1> 
                <span className="place-rate"><FaStar/> {this.state.placedata.ratingsValue}</span>
                </div>
            )
        }
        else{
            return (
                <h2 className="text-center my-5">No Places...</h2>
            )
        }
    }

     placeLocation(){
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
                    <div className="row">
                        <div className="col-12 col-md-6"
                            style={{position: 'relative'}}>
                            <div className="row justify-content-center mb-5 pb-5 mb-md-0 pb-md-0">
                                <div className="outer-circle first">
                                  <div className="inner-circle">
                                    <div className="circle-container">
                                        <div className="text">
                                            <p className="value">${this.state.placedata.price}</p>
                                            <p className="type"><GiMoneyStack/></p>
                                        </div>
                                    </div>
                                  </div>
                                  <span className="circle-span"></span>
                                  <span className="circle-span"></span>
                                  <span className="circle-span"></span>
                                  <span className="circle-span"></span>
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
                                  <span className="circle-span"></span>
                                  <span className="circle-span"></span>
                                  <span className="circle-span"></span>
                                  <span className="circle-span"></span>
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
                                  <span className="circle-span"></span>
                                  <span className="circle-span"></span>
                                  <span className="circle-span"></span>
                                  <span className="circle-span"></span>
                                </div>
                            </div>
                        </div>

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

     placeFeature=()=>{
        if(this.state.placedata)
        var place=this.state.placedata;
        console.log("place>>>>>", place);
        return (
            <div className="container">
                <div className="row py-5">
                    <div className="col-12 col-md-8">
                        <div className="row">
                            <div className="col">
                                <h2 className="py-3">Description</h2>
                                <p className="lead">{place.description}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h4 className="place-header"><IoIosBed/><br/>
                                    {place.total_beds > 1 ? ('Beds') : ('Bed')}
                                    <span>{place.total_beds}</span>
                                </h4>
                                <h4 className="place-header"><GiDoorHandle/><br/>
                                    {place.total_rooms > 1 ? ('Rooms') : ('Room')}
                                    <span>{place.total_rooms}</span>
                                </h4>
                                <h4 className="place-header"><FaBath/><br/>
                                    {place.total_bathrooms > 1 ? ('Bathrooms') : ('Bathroom')}
                                    <span>{place.total_bathrooms}</span>
                                </h4>
                            </div>
                            <div className="col">
                                <h4 className="place-header"><GiForkKnifeSpoon/><br/>
                                    {place.total_kitchens > 1 ? ('Kitchens') : ('Kitchen')}
                                    <span>{place.total_kitchens}</span>
                                </h4>
                                <h4 className="place-header"><FaUserAlt/><br/>
                                    Maximum Guests
                                    <span>{place.max_guests}</span>
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <h2 className="py-3">Features</h2>
                        {this.state.placedata.has_tv && (
                            <h4><FaTv/> TV </h4> )}

                        {this.state.placedata.has_wifi && (
                            <h4><FaWifi/> Wi-Fi</h4>)}

                        {this.state.placedata.pets && (
                            <h4><MdPets/> Allow Pets </h4>)}
        
                        {this.state.placedata.has_airconditioner && (
                            <h4><IoIosSnow/> Air Conditioner </h4>)}
                                    
                        {this.state.placedata.has_heating_system && (
                            <h4><GiFireplace/> Heating System </h4>)}
                    </div>
                </div>
            </div>
        )
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
        console.log(newavg);
        // this.setState({rate: newavg});
        this.state.rate = newavg;
        var uName=[];
        var uImg=[];
        //console.log("22222222222222",user)
        //console.log("333333333333", placeReviews)
        
        if(placeReviews.length > 0) {
            return (
                // style={{height:"100% !important"}}
                <div className="review">
                    <div className="container ">
                        <h2 className="text-center py-4">User Reviews</h2>
                        <div className="row users">
                            {placeReviews.slice(0,6).map((rev,index) =>(
                                <div className="col-12 col-lg-6 ">
                                    <div className="row align-items-center" style={{position: 'relative'}}>
                                        <div className="col-3">
                                            {userimg[index] ? (
                                                <div 
                                                  className="rounded-circle ml-auto"
                                                  style={{
                                                      width: '85px',
                                                      height: '85px',
                                                      backgroundImage: `url('http://localhost:8080/${userimg[index]}')`,
                                                      backgroundPosition: 'center',
                                                      backgroundSize: 'cover'
                                                }}></div>)
                                                : (
                                                  <div 
                                                  className="rounded-circle ml-auto"
                                                  style={{
                                                      width: '85px',
                                                      height: '85px',
                                                      backgroundImage: `url('/img/avatar.png')`,
                                                      backgroundPosition: 'center',
                                                      backgroundSize: 'cover'
                                                }}></div>
                                            )}
                                        </div>
                                        <div className="col-9">
                                            <p className="h4">{username[index]}</p>
                                            <p className="text-muted mb-0">{rev.createdAt.slice(0, 10)}</p>
                                        </div>
                                        <span
                                            style={{
                                                fontSize: '1.3em',
                                                position: 'absolute',
                                                top: '12%',
                                                right: '10%'
                                                }}>
                                                <FaStar style={{marginBottom: '0.25em'}}/>&nbsp;{rev.rating}
                                        </span>
                                    </div>
                                        
                                    <div className="row">
                                        <div className="col">
                                            <p className="lead py-3" style={{marginLeft: '1.15em'}}>
                                                {rev.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
    return(<div className="fixed-btns">
            <button type="button" className="btn secondary-btn w-100 mb-2"
                data-toggle="modal" data-target="#exampleModal">
                Add Review
            </button>
            <Link to={`/reservation/${this.props.match.params.id}`} type="button"
                className="btn secondary-btn w-100">
                Make Reservation
            </Link>
        </div>)
}
    render(){
    return (
        <section id="place-details" style={{position: 'relative', overflow: 'hidden',width:"100%"}}>
            {this.placeSlider()}
            {this.placeLocation()}
            {this.placeFeature()} 
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