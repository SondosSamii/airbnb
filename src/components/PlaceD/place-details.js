import React, {Component} from "react";
import {SiGithub} from "react-icons/si";
import {useState, useEffect} from "react";
import Slider from "react-slick";
import {FaTv, FaWifi, FaFan, FaUserAlt, FaBath} from "react-icons/fa";
import {IoIosBed} from "react-icons/io";
import {MdPets} from "react-icons/md";
import {GiHeatHaze,GiCampCookingPot} from "react-icons/gi";
import { getPlaceById ,updatePlace } from "../../actions/places";
import { AllClients } from "../../actions/clients";
import {getPlaceReviews,AllReviews} from "../../actions/reviews";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Mapp from "../search/map"


class GetPlaceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placedata: [],
            place_id:"6024167de5ac3946c8952f89",
            img:[],
            address:[],
            reviews: [],
            allreviews:[],
            Users:[],
            placeID:1
        }
    }
    async componentDidMount(){
        this.setState({token: localStorage.getItem("token")});
        this.setState({UserId: localStorage.getItem("user_id")});
        if(!localStorage.getItem("token")){
            alert("please log in frist!")
        this.props.history.push("/");
        }
        await this.props.getPlaceById(localStorage.token ,this.state.place_id);
        await this.props.AllClients();
        await this.props.getPlaceReviews(localStorage.token ,this.state.place_id);
        this.setState({reviews:this.props.reviews});
        await this.props.AllReviews(localStorage.token);
        this.setState({allreviews:this.props.reviews});
        console.log(this.props.placeDetails.place)
        var place= this.props.placeDetails.place;
        this.setState({address:place.address});
        this.setState({img:place.images});
        this.setState({placedata:place});
        this.setState({users:this.props.client});
        
        console.log(this.state.reviews)
        console.log(this.state.allreviews)
        console.log(this.state.users)
        
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
                <Slider  >
                      {this.state.img.map((images)=>{
                    return (
                       <div><img className="slideshow-bg img-slide" src={`http://localhost:8080/${images}`}/></div>
                        
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
                <div className="featchers row">
                    <h2 className="text-center col-12">Place Information</h2>
                        <div className="ml-3 col-12 pt-3 pb-3">
                            <p className="h4 col-12 pl-5 d-block vertical-align-middle ">Discription:</p>
                            <p className=" h5 pl-5 pr-5 d-block m-0 ml-5 col-12 text-left">{ this.state.placedata.description}</p>
                        </div>
                        <div className=" col-lg-8 col-md-12 pt-3 ">
                            <div className="ml-3">
                            <p className="h4 pl-5 d-inline-block w-25">Price Per Night:</p>
                            <p className=" h5 pl-3 d-inline-block m-0 col-6">$ { this.state.placedata.price}</p>
                            </div>
                            <div className="ml-3">
                            <p className="h4 pl-5 d-inline-block w-25">Type:</p>
                            <p className=" h5 pl- d-inline-block m-0 col-6">{ this.state.placedata.type}</p>
                            </div>
                            <div className="ml-3">
                            <p className="h4 pl-5 d-inline-block w-25">country:</p>
                            <p className="h5 pl-3 d-inline">{this.state.address.country}</p> 
                            
                            </div>
                            <div className="ml-3">
                            <p className="h4 pl-5 d-inline-block w-25 ">city:</p>
                             <p className="h5 pl-3 d-inline">{this.state.address.city}</p> 
                            </div>
                            <div className="ml-3">
                            <p className="h4 pl-5 d-inline-block w-25">zipcode:</p>
                             <p className="h5 pl-3 d-inline">{  this.state.address.zipcode}</p> 
                            
                            </div>
                            
                        </div>
                    <div className=" col-lg-4 col-md-6 pr-5" style={{height: '350px'}}>
                    {/* <img className="d-inline w-100" src="/bg.jpg"/> */}
                             {/* <Mapp {} /> */}
                         
                    </div>
                </div>
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
                    <div className=" col-lg-12 col-md-6 ">
                    <ul>
                        <div className="pb-3">
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"> Max Number of Guests </li>
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center">Beds Number </li>
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><FaFan className=" mr-3"/> Available Rooms </li>
                        </div>
                        <div lassName="pb-3">
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
        var users=this.state.Users;
        var allreviews=this.state.reviews;
        let rate=0;
        let user=[];
        
        // allreviews.map(rev => {
        //     users.map(oneuser =>{
        //         if(rev.user_id==oneuser._id)
        //         user.push(oneuser);
        //     })
        //     rate += rev.rating;
        //     return rate;
        
            
        // });
        // console.log(rate);
        // console.log(user.name)
        const avg = rate / allreviews.length;
        
            return (
                <div className="review row ">
                    <h2 style={{height:"50px !important"}} className="text-center col-12 pb-0 mb-0 mt-5">User Reviwes</h2>
                    
                    
                    <div className="col-3 users">
                        {user.map(user => (
                        
                        <div className="col-6 ml-auto pb-5">
                            <p className=" text-center h4" >{user.name}</p>
                            <div className="user-photo  m-auto">
                                {user.profile_image ? <img src={`/img/${user.profile_image}`} /> : <img src={`/img/avatar.png`} />}
                            </div>
                        </div>
                        
                        
                      ))}
                    </div> 

                    {/* <div className="col-8 users">
                      {allreviews.map(rev => (
                        <div>
                        <div className="pl-3 col-12 pb-5">
                        <p className="h4">{rev.comment}</p>
                        </div>
                        <div className="pl-3 col-12">
                        <p className="h4 pl-5 pb-2">{rev.rating} <span className="text-muted">/5</span></p>
                        </div>
                        </div>
                        ))}
                    </div>  */}
                        
                  
                </div>
            )
        }
    }

    render(){
    return (
        <section style={{ marginTop: '63px',position: 'relative', overflow: 'hidden',width:"100%"}}>
            {this.PlaceSlider()}
            {this.Placelocation()}
            {this.Placefetcher()} 
            {this.Review()}
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
      client: state.Clients,
      placeDetails: state.Places,
      reviews: state.Reviews
      
      
    };
  };
export default connect(mapstatetoprops, mapactiontoprops) (GetPlaceDetails);