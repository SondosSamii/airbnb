import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
// import { Card, Button } from "react-bootstrap";
import "./profile.css";
import Joi from "joi-browser";

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
import { getAllReservation , getReservationByID } from "../../actions/reservations";
import { getAllClients, updateClient , getclientById , updatePassword } from "../../actions/clients";
import React, { Component } from "react";

import { FaStar, FaTv, FaWifi, FaFan } from "react-icons/fa";
// import { FaRegHeart, FaStar, FaTv, FaWifi, FaFan } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { GiHeatHaze } from "react-icons/gi";
import { AiFillEdit } from "react-icons/ai";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User_wishlists: [],
      Places: [],
      reserve_Places: [],
      All_User_places:[],
      isOpen: false,
      name: "",
      email: "",
      phone: "",
      isLogin: true,
      token: "",
      user: {},
      isOpen2:true,
      old_pass:"",
      new_pass:"",
      profile_image:"",
      // userId: "60044953de30a61a6c0ede19",
      userId: "5",
      hasPlaces: false,
      Reservations: [],
      UserPlaces: [],
      AllPlaces: [],
      places_id:[],


    };
   
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  openModal2 = () => this.setState({ isOpen2: true });
  closeModal2 = () => this.setState({ isOpen2: false });
  async componentDidMount() {
    this.setState({token: localStorage.getItem("token")}); 
    console.log("here token:  ",localStorage.getItem("token"));
    if(localStorage.getItem("token")===""){
      this.setState({isLogin:false});
      this.props.history.push("/");
    }
    await this.props.getclientById(localStorage.getItem("token"));
    console.log("heerreee:     ",this.props.client.user);
    if(this.props.client.message === "jwt expired"){
      this.props.history.push("/login");
    }
    this.setState({user: this.props.client.user });
    await this.get_Wishlist_places();
    await this.get_Trips_places();
    await this.get_user_places();
    console.log(".......",this.state.reserve_Places);
    // await this.props.getReservationByID(this.state.token,"60230037b84a5619c83f4222");
    // this.props.getPlaceById("601cd04e9b694d3c30abc913");
    // console.log(this.props.wishlistDetails);
    

    // await this.props.getWishlistsByUserId(localStorage.getItem("token"));
    //  this.setState({User_wishlists : this.props.User_wishlists.wishlists });
    // console.log("state:    " , this.state.User_wishlists);


    // await this.props.getAllPlaces();

    // this.UserPlaces();

    // await this.props.getAllWishlists();
    // await this.setState({ Wishlists: this.props.wishlists });
    // await this.User_Wishlist();
    // console.log("User_Wishlists:    ", this.state.Wishlists);
    // this.getPlaces();
    // //////////////////////////////////////////////

    // await this.props.getAllReservation();
    // await this.setState({ Reservations: this.props.reservations });
    // await this.UserTrips();
    // this.get_reserve_places();
    // await this.props.getAllClients();
    // this.getUser();
  }


  get_Wishlist_places = async() => {
    var arr = [];
    var place = null;
    console.log("userWishslits:   " , this.state.user.wishlists);
    
    if (this.state.user.wishlists.length > 0) {

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
    
    if (this.state.user.reservations.length > 0) {
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
    
    if (this.state.user.places.length > 0) {

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
    // console.log("........lllll......" , this.state.UserPlaces);
    return this.state.All_User_places.slice(0, 3).map((placeElement, index) => {
      if (placeElement) {
        // console.log("jjjj: " ,this.state.Places[i]);
        return (
          <div className="col-9 col-sm-6 col-lg-4 mt-4" key={placeElement}>
            <div className="card-item">
              <div
                className="card-item-highlight"
                style={{
                  backgroundImage: `url(images/places/place1-1.jpeg)`,
                }}
              >
                <h3 className="card-item-name">
                  {placeElement.name}
                  <br />
                  {this.icons(placeElement)}
                </h3>
                <h4 className="card-item-type">{placeElement.type}</h4>
              </div>
              <div className="card-item-details">
                <h4>
                  {placeElement.address.city}, {placeElement.address.country}
                </h4>
                <p className="desc">{placeElement.description}</p>
                <p className="price">${placeElement.price}</p>
                <p className="rating">
                  <FaStar />
                  &nbsp;4.8
                </p>
                {/* {this.renderRating(this.state.Places[index]._id)} */}
              </div>
            </div>
          </div>
          // <div className="col-4 ">
          // <Card style={{ width: '18rem' }}>
          //  <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2021/01/08/07/52/trees-5899195_960_720.jpg" />
          //  <Card.Body>
          //      <Card.Title>{placeElement.price}</Card.Title>
          //      <Card.Text>
          //      Some quick example text to build on the card title and make up the bulk of
          //      the card's content.
          //      </Card.Text>
          //      <Button variant="primary">Go somewhere</Button>
          //  </Card.Body>
          //  </Card>
          //         </div>
        );
      }
    });
  };
// componentDidUpdate(){
//   this.forceUpdate();
// }
  renderWishlist = () => {
    document.title = "Profile";
    // var i = 0;
    // console.log("Wishlist_Places: " , this.state.user.wishlists);
    // if(this.state.wishlists > 0) {
    if(this.state.user.wishlists) {
    return this.state.user.wishlists.slice(0, 3).map((wishlist_Element,index) => {
      // console.log("aaaaaaaaaaaaaa:  ", wishlist_Element);

      if (this.state.Places[index]) {
        // console.log("jjjj: " ,this.state.Places[index]);
        return (
          <div
            className="col-9 col-sm-6 col-lg-4 mt-4"
            key={this.state.Places[index]._id}
          >
            <div className="card-item">
              <div
                className="card-item-highlight"
                style={{
                  backgroundImage: `url(images/places/place1-1.jpeg)`,
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
                    // this.forceUpdate();
                    this.renderWishlist();
                    // window.location.reload();

                  }}
                />
              </div>
              <div className="card-item-details">
                <h4>
                  {this.state.Places[index].address.city},{" "}
                  {this.state.Places[index].address.country}
                </h4>
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
          // <div className="col-4 ">
          // <Card style={{ width: '18rem' }}>
          //  <Card.Img variant="top" src={`images/places/${this.state.Places[index].images[0]}.jpeg`} />
          //  <Card.Body>
          //  <FaHeart onClick={()=>{
          //     //  console.log("...." , wishlist_Element._id);
          //      this.props.deleteByID(wishlist_Element._id);
          //  }} />
          //      <Card.Title>{this.state.Places[index].address.country}</Card.Title>
          //      <Card.Title>{this.state.Places[index].type}</Card.Title>
          //      <Card.Text>
          //      Some quick example text to build on the card title and make up the bulk of
          //      the card's content.
          //      </Card.Text>
          //      <Button variant="primary">Go somewhere</Button>
          //  </Card.Body>
          //  </Card>
          //         </div>
        );
      }
    });
    }
  };
  renderTrips = () => {
    // var i = 0;
    // console.log("weeeeeee: " , this.state.reserve_Places);
    // console.log("######333333..................: " ,this.state.Reservations , "   " , this.state.reserve_Places.length);
    // if(this.state.Reservations > 0) {
    if(this.state.user.reservations) {
      return this.state.user.reservations.slice(0, 4).map(
      (reservation_Element, index) => {
        if (this.state.reserve_Places[index]) {
          // console.log("jjjj: " ,this.state.reserve_Places[index]);
          return (
            <div className=" col-9 col-sm-6  col-lg-4 mt-4 " key={index}>
              <div className=" card-item card-item-sm ">
                <Link
                  to=""
                  className="card-item-bg"
                  style={{
                    backgroundImage: `url(images/places/place1-1.jpeg)`,
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

  handleUpdate = ()=>{
    console.log("kkkkkkkkk" , this.state.profile_image);
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
    if(!client.name.match(/^[a-zA-Z]+$/) )
    {
      flag = false;
      document.getElementById("nameError").innerHTML="Name must be letters";
    }
    if(flag){
      // this.setState({profile_image: e.target.files[0]});
      // client.profile_image =  
      var formData = new FormData();
      formData.append("name", client.name);
      formData.append("phone", client.phone);
      formData.append("profile_image", client.profile_image);
      console.log("yes" , client);
      // for(var e of formData.entries()){
      //   console.log(e);
      // }

      // var confirm = window.confirm("are you sure you want to update");
      this.props.updateClient(this.state.token,formData );
      // if(confirm){
      //   window.location.reload();
      // }
      
    }

    // if(client.name.match(/^[A-Z][-a-zA-Z]+$/ )){

    // }
    
    // await this.props.updateClient(client);
    // window.location.reload();
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
            <div className="user_img " 
            style={{
            // backgroundImage: `url('https://i.stack.imgur.com/l60Hf.png')`,
            backgroundImage:`url('http://localhost:8080/${this.state.user.profile_image}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
        {/* <img src="http://localhost:8080/images/Alaa.jpg" /> */}
            </div>
          
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
            <div className="row">{this.renderWishlist()}</div>
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
                        <label htmlFor="img">upload Your photo</label>
                         <input type="file" id="img" name="img" accept="image/*" onChange={(e) => {
                            this.setState({ profile_image: e.target.files[0] });
                          }} />
                          {/* <input type="file" onChange={this.fileChangedHandler}/>
                            <button onClick={this.uploadHandler}>Upload!</button> */}
                          <input type="text" value={this.state.profile_image}/>
                        <small id="nameError"></small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          id="name"
                          type="text"
                          placeholder={this.state.user.name}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                        />
                        <small id="nameError"></small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder={this.state.user.phone}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ phone: e.target.value });
                          }}
                          />
                          <small id="phoneError"></small>
        
                      </div>

                      <button
                        type="button"
                        className="btn update-btn"
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
                          }}
                        />
                        <small id="old_pass_Error"></small>
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
                          }}
                        />
                        <small id="new_pass_Error"></small>
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
      // getAllPlaces,
      // getAllClients,
      // updateClient,
      // getPlaceById,
      // getAllReservation,
      // deleteByID,
      getclientById,
      getWishlistByID,
      getPlaceById,
      getReservationByID,
      deleteWishlistById,
      updateClient,
      updatePassword
      // getReservationByID
    },
    disptch
    );
  };
  const mapstatetoprops = (state) => {
  return {
    // places: state.Places,
    // placeDetails: state.Places,
    // reservations: state.Reservations,
    // User_wishlists: state.Wishlists,
    client: state.Clients,
    wishlistDetails : state.Wishlists.wishlist_details,
    placeDetails: state.Places.place_details,
    reservationDetails: state.Reservations.reservation_details
    
    
  };
};

export default connect(mapstatetoprops, mapactiontoprops)(ViewProfile);

{/* <div className="form-group">
  <label htmlFor="email">Email address</label>
  <input
    id="email"
    type="email"
    placeholder={this.state.user.email}
    className="form-control"
    onChange={(e) => {
      this.setState({ email: e.target.value });
    }}
  >
     
  </input>
  <small className="form-text text-muted">
    We'll never share your email with anyone else.
  </small>
</div> */}