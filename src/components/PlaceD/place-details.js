import React, {Component} from "react";
import {SiGithub} from "react-icons/si";
import {useState, useEffect} from "react";
import Slider from "react-slick";
import {FaTv, FaWifi, FaFan, FaUserAlt, FaBath} from "react-icons/fa";
import {IoIosBed} from "react-icons/io";
import {MdPets} from "react-icons/md";
import {GiHeatHaze,GiCampCookingPot} from "react-icons/gi";
import axios from "axios";
import Places from "../home/places";

class GetPlaceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeData: [],
            img:[],
            address:[],
            reviews: [],
            Users:[],
            placeID:1
        }
    }

    async componentDidMount() {
        await fetch("http://localhost:3001/places/", {method: 'GET'})
            .then(res => {
                return res.json();
            }).then( data => {
                console.log(data);
                for(const place of data)
                if(place._id==1){
                     this.setState({placeData:place});
                    this.setState({img:place.images});
                    this.setState({address:place.address});
                    console.log("#########################",place.images)
                    console.log(this.state.placeData.type);
                    console.log("............",this.state.address);
                };
            }).catch(err => {
                console.log(err);
            });
            await fetch("http://localhost:3001/reviews/", {method: "GET"})
            .then((res) => {
                return res.json();
            }).then((data) => {
                const reviews =[];
                for(const review of data)
                if(review.place_id==1){
                    reviews.push(review);
                }
                this.setState({reviews: reviews});
                console.log(reviews);
            }).catch((err) => {
                console.log(err);
            });
            await fetch("http://localhost:3001/users/", {method: "GET"})
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({Users: data});
            }).catch((err) => {
                console.log(err);
            });
        }
        



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
                <Slider  >
                    
                      {this.state.img.map((images)=>{
                    return (
                       <div><img className="slideshow-bg img-slide" src={`/img/${images}`}/></div>

                       );})}  
                            {/* <div><img style={{width:"100%"}} className="slideshow-bg" src="/img/pexels-photo-59520.jpeg"/></div>
                            <div><img style={{width:"100%"}} className="slideshow-bg" src="/img/pexels-photo-59520.jpeg"/></div> */}
                            {/* <div><img className="slideshow-bg" src={`/img/${this.state.placeData.images[0]}`}/></div> */}
                    
                </Slider>
            )
        }
        else{
            return (
                <h2 className="text-center my-5">No Places...</h2>
            )
        }
    }

     Placelocation(){
        if(this.state.placeData){
            const place=this.state.placeData;
            console.log(place.address)
            return (
                <div className="featchers row">
                    <h2 className="text-center col-12 pt-3">Place Information</h2>
                        <div className=" col-lg-8 col-md-12 pl-3 pt-5">
                            <div className="ml-3">
                            <p className="h4 pl-5 d-inline-block w-25">Price Per Night:</p>
                            <p className=" h5 pl-3 d-inline-block m-0 col-6">$ { this.state.placeData.price}</p>
                            </div>
                            <div className="ml-3">
                            <p className="h4 pl-5 d-inline-block w-25">Type:</p>
                            <p className=" h5 pl- d-inline-block m-0 col-6">{ this.state.placeData.type}</p>
                            </div>
                            <div className="ml-3">
                            <p className="h4 pl-5 d-inline-block vertical-align-middle w-25">Discription:</p>
                            <p className=" h5 pl-3 d-inline-block m-0 col-6 text-justify">{ this.state.placeData.description}</p>
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
                    <div className=" col-lg-4 col-md-6 pr-5">
                    <img className="d-inline w-100" src="/bg.jpg"/>
                    </div>
                </div>
            )
        }
    }
     Placefetcher=()=>{
        if(this.state.placeData)
        var place=this.state.placeData;{
            return (
                <div className="featchers row">
                     <h2 style={{height:"40px"}} className="text-center col-12 p-0">Available Features</h2>
                    <div className=" col-lg-12 col-md-6 ">
                    <ul>
                        <div className=" pb-5">
                        {place.has_wifi && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><FaWifi className=" mr-3"/> WIFI</li> )}
                        {place.has_heating_system && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><GiHeatHaze className=" mr-3"/> Heating System </li> )}
                        {place.has_air_conditioner && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><FaFan className=" mr-3"/> Air Conditioner </li> )}
                        </div>
                        <div className=" pt-3">
                        {place.has_tv && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><FaTv className=" mr-3"/> TV </li> )}
                        {place.pets && ( <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"><MdPets className=" mr-3 "/> Allow Pets </li> )}
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
                        <div className="pt-3">
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center"> Available Bathroom </li>
                        <li className="h4 col-lg-4 col-md-6 d-inline-block text-center">Available Kitchen </li>
                        </div>
                        <div>
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
        if(this.state.placeData){
        var users=this.state.Users;
        var allreviews=this.state.reviews;
        let rate=0;
        let user=[];
        
        allreviews.map(rev => {
            users.map(oneuser =>{
                if(rev.user_id==oneuser._id)
                user.push(oneuser);
            })
            rate += rev.rating;
            return rate;
        
            
        });
        console.log(rate);
        console.log(user.name)
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

                    <div className="col-8 users">
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
                    </div> 
                        
                  
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
export default GetPlaceDetails;