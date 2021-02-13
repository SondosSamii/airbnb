import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
// import { Card, Button } from "react-bootstrap";
import "./profile.css";


import { NavLink as Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllPlaces,getPlaceById } from "../../actions/places";
import {
  getAllWishlists,
  // getWishlistsByUserId,
  deleteWishlistById,
  getWishlistsByUserId,
  getWishlistByID,
  
} from "../../actions/wishlists";
import {  getReservationByID } from "../../actions/reservations";
import {  updateClient , getclientById , updatePassword } from "../../actions/clients";
import React, { Component } from "react";
import Joi, { validate } from "joi-browser";

import { FaStar, FaTv, FaWifi, FaFan } from "react-icons/fa";
// import { FaRegHeart, FaStar, FaTv, FaWifi, FaFan } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { GiHeatHaze } from "react-icons/gi";
import { AiFillEdit } from "react-icons/ai";
import Cards from "../home/places-cards";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User_wishlists: [],
      Places: [],
      reserve_Places: [],
      All_User_places:[],
      name: "",
      email: "",
      phone: "",
      isLogin: true,
      token: "",
      user: {},
      old_pass:"",
      new_pass:"",
      profile_image:"",
      errors : []
     


    };
   
  }

  async componentDidMount() {
    this.setState({token: localStorage.getItem("token")}); 
    console.log("here token:  ",localStorage.getItem("token"));
    if(!localStorage.getItem("token")){
      this.setState({isLogin:false});
      this.props.history.push("/login");
    }

    else{

      await this.props.getclientById(localStorage.getItem("token"));
      if(this.props.client.message === "jwt expired"){
        this.props.history.push("/login");
      }
      this.setState({user: this.props.client.user });
      await this.get_Wishlist_places();
      await this.get_Trips_places();
      await this.get_user_places();
      console.log(".......",this.state.reserve_Places);
    }

  }


  get_Wishlist_places = async() => {
    var arr = [];
    var place = null;
    console.log("userWishslits:   " , this.state.user.wishlists);
    
    if (this.state.user.wishlists && this.state.user.wishlists.length > 0) {

        await this.state.user.wishlists.map(async (wishlist_id) => {
         await this.props.getWishlistByID(this.state.token,wishlist_id);
        // console.log("............" , this.props.wishlistDetails.wishlist);
          var wishlistItem =  this.props.wishlistDetails.wishlist.place_id
        await this.props.getPlaceById(wishlistItem);
        var placeItem = this.props.placeDetails.place
          // arr.push(placeItem);
          this.setState((state) => {
          const Places = state.Places.push(placeItem);
          return Places;
      })
   
      });

      
    }

  };
 

  get_Trips_places = async() => {
    var arr = [];
    var place = null;
    console.log("userTrips:   " , this.state.user.reservations);
    
    if (this.state.user.reservations && this.state.user.reservations.length > 0) {
        await this.state.user.reservations.map(async(reservation_id) => {
         await this.props.getReservationByID(this.state.token,reservation_id);
        // console.log("............" , this.props.wishlistDetails.wishlist);
        var reservationItem =  this.props.reservationDetails.reservation.place_id
        await this.props.getPlaceById(reservationItem);
        var placeItem = this.props.placeDetails.place
          // arr.push(placeItem);
          this.setState((state) => {
          const reserve_Places = state.reserve_Places.push(placeItem);
          return reserve_Places;
      })
   
      });

      
    }

  };

  get_user_places = async() =>{
    var arr = [];
    var place = null;
    console.log("userTrips:   " , this.state.user.places);
    
    if (this.state.user.places && this.state.user.places.length > 0) {

        await this.state.user.places.map(async(place_id) => {
        await this.props.getPlaceById(place_id);
        var placeItem = this.props.placeDetails.place;
          // arr.push(placeItem);
          this.setState((state) => {
          const All_User_places = state.All_User_places.push(placeItem);
          return All_User_places;
      })
   
      });

      
    }
  }
 

  ///////////////////////////////////////////////////////////



  renderPlaces = () => {
    return (
      <Cards cards={this.state.All_User_places}/>
    )
    // return this.state.All_User_places.slice(0, 3).map((placeElement, index) => {
    //   if (placeElement) {
    //     return (
          // <div className="col-9 col-sm-6 col-lg-4 mt-4" key={placeElement._id}>
          //   <div className="card-item">
          //     <Link
          //         to={`/place-details/${placeElement._id}`}
          //       className="card-item-highlight"
          //       style={{
          //         backgroundImage: `url(http://localhost:8080/${placeElement.images[0]})`
          //       }}
          //     >
          //       <h3 className="card-item-name">
          //         {placeElement.name}
          //         <br />
          //         {this.icons(placeElement)}
          //       </h3>
          //       <h4 className="card-item-type">{placeElement.type}</h4>
          //     </Link>
          //     <div className="card-item-details">
          //       <h4>
          //         {placeElement.address.city}, {placeElement.address.country}
          //       </h4>
          //       <p className="desc">{placeElement.description}</p>
          //       <p className="price">${placeElement.price}</p>
          //       <p className="rating">
          //         <FaStar />
          //         &nbsp;4.8
          //       </p>
          //       {/* {this.renderRating(this.state.Places[index]._id)} */}
          //     </div>
          //   </div>
          // </div>
        
        // );
      // }
    // });
  };

  renderWishlist = () => {
    document.title = "Profile";
    // var i = 0;
    console.log("Wishlist_Places: " , this.state.Places);
    // if(this.state.wishlists > 0) {
    if(this.state.user.wishlists) {
    return this.state.user.wishlists.slice(0, 3).map((wishlist_Element,index) => {
      console.log("aaaaaaaaaaaaaa:  ", wishlist_Element);

      if (this.state.Places[index]) {
        var flag = false;
        if(this.state.Places[index].address !=="undefined" && this.state.Places[index].address!=="undefined" ){
          flag = true
        }
        return (
          <div
            className="col-9 col-sm-6 col-lg-4 mt-4"
            key={wishlist_Element._id}
          >
            <div className="card-item">
              <div
                className="card-item-highlight"
                style={{
                  backgroundImage: `url('http://localhost:8080/${this.state.Places[index].images[0]}')`,
                }}
              >
                <h3 className="card-item-name">
                  {this.state.Places[index].name}
                  <br />
                  {this.icons(this.state.Places[index])}
                </h3>
                <h4 className="card-item-type">{this.state.Places[index].type}</h4>
                <FaHeart
                  className="wishlist-icon"
                  title="Remove from wishlist"
                  onClick={() => {
                    this.setState({ isWishlisted: !this.state.isWishlisted });
                    console.log("klklll:    ",wishlist_Element);
                    this.props.deleteWishlistById(this.state.token,wishlist_Element);
                    this.renderWishlist();
                    window.location.reload();

                  }}
                />
              </div>
              <div className="card-item-details">
                
                  {flag  &&(
                    <h4>
                  {this.state.Places[index].address.city},{" "}
                  {this.state.Places[index].address.country}
                </h4>

                  )}
                <p className="desc">{this.state.Places[index].description}</p>
                <p className="price">${this.state.Places[index].price}</p>
                <p className="rating">
                  <FaStar />
                  &nbsp;4.8
                </p>
                {/* {this.renderRating(this.state.Places[index]._id)} */}
              </div>
            </div>
          </div>
        );
      }
    });
    }
  };
  renderTrips = () => {
    if(this.state.user.reservations) {
      return this.state.user.reservations.slice(0, 4).map(
      (reservation_Element, index) => {
        if (this.state.reserve_Places[index]) {
          // console.log("jjjj: " ,this.state.reserve_Places[index]);
          return (
            <div className=" col-9 col-sm-6  col-lg-4 mt-4 " key={index}>
              <div className=" card-item card-item-sm ">
                <Link
                  to={`/place-details/${this.state.reserve_Places[index]._id}`}
                  className="card-item-bg"
                  style={{
                    backgroundImage: `url('http://localhost:8080/${this.state.reserve_Places[index].images[0]}')`,
                  }}
                >

                  <h3 className="card-item-name">
                    {this.state.reserve_Places[index].name}
                  </h3>
                  <h4 className="card-item-type">{this.state.reserve_Places[index].type}</h4>
                </Link>
                {/* <AiOutlineHeart /> */}
              </div>
            </div>
          );
        }
      }
    );
    }
  };

  icons = (place) => {
    return (
      <>
        {place.has_tv && <FaTv className="feature-icon" />}
        {place.has_wifi && <FaWifi className="feature-icon" />}
        {place.pets && <MdPets className="feature-icon" />}
        {place.has_air_conditioner && <FaFan className="feature-icon" />}
        {place.has_heating_system && <GiHeatHaze className="feature-icon" />}
      </>
    );
  };

  schema = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
  };
  validation =(state) =>{
    const errors = {};
    var myState = {...state};
    // delete myState.User_wishlists;
    // delete myState.Places;
    // delete myState.reserve_Places;
    // delete myState.All_User_places;
    // delete myState.isLogin;
    // delete myState.token;
    // delete myState.new_pass;
    // delete myState.user;
    // delete myState.old_pass;
    delete myState.profile_image;

    var res = Joi.validate(myState, this.schema, { abortEarly: false });
    if (res.error === null) {
      this.setState({ errors: {} });
      return null;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    console.log(res.error.details);
    console.log(state);
    this.setState({ errors: errors });
    console.log(this.state.errors.Password);


  }

  handleUpdate = ()=>{

    var client = {
      name: this.state.name,    
      phone: this.state.phone,
      profile_image:this.state.profile_image,
    };

    if(!this.state.name){
      client.name = this.state.user.name
    }
    if(!this.state.phone){
      client.phone = this.state.user.phone
    }
    if(!this.state.profile_image){
      client.profile_image = this.state.user.profile_image
      console.log("typeof:   ", typeof(client.profile_image));
    }
    
    var flag = true;
    if(!client.name.match(/^[a-z A-Z]+$/) )
    {
      flag = false;
      document.getElementById("nameError").innerHTML="Name must be letters";
    }
    if(!client.phone.match(/^[0-9]+$/) )
    {
      flag = false;
      document.getElementById("phoneError").innerHTML="Not Valid";
    }
    if(flag){
      // this.setState({profile_image: e.target.files[0]});
      // client.profile_image =  
      var formData = new FormData();
      formData.append("name", client.name);
      formData.append("phone", client.phone);
      formData.append("profile_image", client.profile_image);
      console.log("yes" , client);
      
      this.props.updateClient(this.state.token,formData );

      // var confirm = window.confirm("are you sure you want to update");
      // if(confirm){
      //   window.location.reload();
      // }      
    }
  }
  handleUpdatePassword = ()=>{
    var clientPasswords = {
      oldPassword:this.state.old_pass,
      newPassword:this.state.new_pass
    }
    var check = true;
    if(!clientPasswords.oldPassword && clientPasswords.newPassword)
    {
      check = false;
      document.getElementById("old_pass_Error").innerHTML="you should enter your old password";
    }
    if(clientPasswords.oldPassword && !clientPasswords.newPassword)
    {
      check = false;
      document.getElementById("old_pass_Error").innerHTML="you should enter your new password";
    }
    if(check){
      this.props.updatePassword(this.state.token , clientPasswords);
    }

  }

  render() {
    return (
      <div className="container--fluid hero">
        <div
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2017/07/29/13/24/background-2551501_960_720.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "",
          }}
          className="bg-light about-content"
        >
          {this.state.isLogin && (
            <div className="row p-4 mr-3 mt-2 justify-content-end">
              <AiFillEdit
                className="edit-icon"
                data-toggle="modal"
                data-target="#exampleModal"
              />
            </div>
          )}

          <div className=" row justify-content-center" >
            {
              this.state.user.profile_image ?(
                <div className="user_img " 
                style={{
                // backgroundImage: `url('https://i.stack.imgur.com/l60Hf.png')`,
                backgroundImage:`url('http://localhost:8080/${this.state.user.profile_image}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
                </div>
              ):(
                <div className="user_img " 
                style={{
                // backgroundImage: `url('https://i.stack.imgur.com/l60Hf.png')`,
                backgroundImage:`url('data:image/jpeg;base64,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')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
            {/* <img src="http://localhost:8080/images/Alaa.jpg" /> */}
                </div>
              )

            }

          
          </div>
          <div className="row justify-content-center">
            <div className="col-8  col-md-6 p-3 mt-2  text-center">
              <span className="about-text">
                 I am {this.state.user.name}{" "},
              </span>
              
              <span className="about-text">Welcome in my profile page</span>
              <br></br>
              <span className="about-text">
                My Email: {this.state.user.email}
              </span>
              <br></br>
              <span className="about-text">
                My phone: {this.state.user.phone}
              </span>
              <br></br>
{/* 
              <FaFacebook className="icon" />
              <AiFillInstagram className="icon" />
              <GiEarthAfricaEurope className="icon" /> */}
            </div>
          </div>
        </div>
        <div className="row justify-content-center p-4 ">
          <div className="col-6 text-center m-5 ">
            <span className="wishlist_header ">My WishList</span>
            <img src="https://educlever.beplusthemes.com/high-school/wp-content/uploads/2019/05/sapec.png" alt="" />
          </div>

          <div className="container ">
            <div className="row justify-content-center">
              {/* {this.renderWishlist()} */}
              <Cards cards={this.state.Places}/>
              {/* {console.log("********** ", this.state.Places)} */}
            </div>
          </div>
        </div>

        <div className="container pb-5">
          <div className="row justify-content-center">
          {this.state.reserve_Places.length > 0 && (
            <div className="col-6 text-center m-5 ">
              <span className="wishlist_header ">My Trips</span>
              <img src="https://educlever.beplusthemes.com/high-school/wp-content/uploads/2019/05/sapec.png" alt="" />
            </div>
            )}
            {this.state.reserve_Places.length > 0 && (
            <div className="container">
              <div className="row justify-content-center">
                {this.renderTrips()}
              </div>
            </div>
            )}
            {this.state.All_User_places.length > 0 && (
              <div className="col-6 text-center m-5 ">
                <span className="wishlist_header ">My Places</span>
                <img src="https://educlever.beplusthemes.com/high-school/wp-content/uploads/2019/05/sapec.png" alt=""/>
              </div>
            )}
            <div className="container">
              <div className="row justify-content-center">
                {this.renderPlaces()}
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Update Your Information
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form className = "update-form">
                      <div className="form-group">
                      {/* <label htmlFor="img" className="btn main-btn text-white">
                        Upload Your Photo
                        <input type="file" id="img" name="img" accept="image/*"
                          onChange={(e) => {
                            this.setState({ profile_image: e.target.files[0] });
                          }}/>
                      </label>
                      <small>{this.state.profile_image}</small> */}

                        <label htmlFor="img" className="btn main-btn">Upload Your Photo</label>
                        <br/>
                         <input type="file" id="img" name="img" accept="image/*" onChange={(e) => {
                            this.setState({ profile_image: e.target.files[0] });
                          }} />
                          <input type="text" value={this.state.profile_image}/>
                        
                      </div>
                      <div className="form-group">
                        <label htmlFor="name" className="label">Name</label>
                        <input
                          id="name"
                          type="text"
                          placeholder={this.state.user.name}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                            document.getElementById('nameError').innerHTML = "";
                          }}
                        />
                        <small  id="nameError" style={{color :"red"}}></small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone" className="label">Phone</label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder={this.state.user.phone}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ phone: e.target.value });
                            document.getElementById('phoneError').innerHTML = "";
                          }}
                          />
                          <small id="phoneError" style={{color :"red"}}></small>
        
                      </div>

                      <button
                        type="button"
                        // className="btn update-btn"
                        className="btn main-btn"
                        onClick={async () => {
                          this.handleUpdate();
                        }}
                        >
                        Update
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal2"
                      >
                      Update Password
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal2"
                      >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            
            <div
              className="modal fade"
              id="exampleModal2"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel2"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Update Your Password
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form className = "update-form">
                      <div className="form-group">
                        <label htmlFor="name">Old Password</label>
                        <input
                          id="old_pass"
                          type="password"
                          placeholder="old password"
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ old_pass: e.target.value });
                            document.getElementById('old_pass_Error').innerHTML = "";
                          }}
                        />
                        <small id="old_pass_Error" style={{color :"red"}}></small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="pass">New Password </label>
                        <input
                          id="new_pass"
                          type="password"
                          placeholder=" new password"
                          className="form-control"
                          onChange={(e) => {
                            this.setState({new_pass: e.target.value });
                            document.getElementById('new_pass_Error').innerHTML = "";
                          }}
                        />
                        <small id="new_pass_Error" style={{color :"red"}}></small>
                      </div>
                      
                      <button
                        type="button"
                        className="btn update-btn"
                        onClick={async () => {
                          this.handleUpdatePassword();
                        }}
                        >
                        Update
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapactiontoprops = (disptch) => {
  return bindActionCreators(
    {
      
      getclientById,
      getWishlistByID,
      getPlaceById,
      getReservationByID,
      deleteWishlistById,
      updateClient,
      updatePassword
    },
    disptch
    );
  };
  const mapstatetoprops = (state) => {
  return {
    client: state.Clients,
    wishlistDetails : state.Wishlists.wishlist_details,
    placeDetails: state.Places.place_details,
    reservationDetails: state.Reservations.reservation_details
    
    
  };
};

export default connect(mapstatetoprops, mapactiontoprops)(ViewProfile);

