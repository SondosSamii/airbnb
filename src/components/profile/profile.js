import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { Card, Button } from "react-bootstrap";
import "./profile.css";

import { NavLink as Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllPlaces, getPlaceById } from "../../actions/places";
import {
  getAllWishlists,
  getwishlistById,
  deleteByID,
} from "../../actions/wishlist";
import { getAllReservation } from "../../actions/reservations";
import { getAllClients, updateClient } from "../../actions/clients";
import React, { Component } from "react";
import { FaRegHeart, FaStar, FaTv, FaWifi, FaFan } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { GiHeatHaze } from "react-icons/gi";
import { AiFillEdit } from "react-icons/ai";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Wishlists: [],
      Places: [],
      reserve_Places: [],
      Reservations: [],
      userId: "60044953de30a61a6c0ede19",
      user: {},
      hasPlaces: false,
      UserPlaces: [],
      AllPlaces: [],
      isOpen: false,
      name: "",
      email: "",
      password: "",
      phone: "",
      isLogin: true,
    };
    // this.baseUrl = "http://localhost:1337/api/place";
    this.baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/places";
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  async componentDidMount() {
    await this.props.getAllPlaces();

    this.UserPlaces();

    await this.props.getAllWishlists();
    await this.setState({ Wishlists: this.props.wishlists });
    await this.User_Wishlist();
    console.log("User_Wishlists:    ", this.state.Wishlists);
    this.getPlaces();
    //////////////////////////////////////////////

    await this.props.getAllReservation();
    await this.setState({ Reservations: this.props.reservations });
    await this.UserTrips();
    this.get_reserve_places();
    await this.props.getAllClients();
    this.getUser();
  }

  User_Wishlist = async () => {
      if(this.state.wishlists){
          var newArr = await this.state.Wishlists.filter(
            (wishlist) => wishlist.user_id === this.state.userId
          );
          await this.setState({ Wishlists: newArr });
      }
  };
  getPlaces = async () => {
    var arr = [];
    var place = null;
    if (this.state.Wishlists.length > 0) {
      this.state.Wishlists.map(async (wishlist) => {
        place = await this.props.places.filter((place) => {
          if (place._id === wishlist.place_id) {
            arr.push(place);
          }
        });
      });
      await this.setState({ Places: arr });
      console.log("array: ", this.state.Places);
    }
  };

  ///////////////////////////////////////////////////////////
  async get_reserve_places() {
     var arr = [];
    var place = null;
    if (this.state.Reservations.length > 0) {
      this.state.Reservations.map(async (reservation) => {
        place = await this.props.places.filter((place) => {
          if (place._id === reservation.place_id) {
           arr.push(place);
          }
        });
        await this.setState({ reserve_Places: arr });
      });
    }
  }

  getUser = async () => {
    // console.log("/////////////////////" , this.props.clients);
    if(this.props.clients){
        var user = this.props.clients.find(
          (client) => client._id === this.state.userId
        );
        // console.log("/////////////////////" , user);
        this.setState({
          user,
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
        });
    }
  };
  UserTrips = async () => {
      if(this.state.Reservations){
          var newArr = this.state.Reservations.filter(
            (reservation) => reservation.user_id === this.state.userId
          );
          // console.log(",,,mmmmm,mmmmmmmmmmmmmmmmmmmm,,," ,newArr);
          this.setState({ Reservations: newArr });
      }
  };
  UserPlaces = async () => {
    //  console.log(",,,,,,," ,this.props.places);
    if(this.props.places){
        var newArr = await this.props.places.filter(
          (place) => place.user_id === this.state.userId
        );
        // console.log(",,,,,,," ,newArr);
        await this.setState({ UserPlaces: newArr });
    }
  };
  renderPlaces = () => {
    // console.log("........lllll......" , this.state.UserPlaces);
    return this.state.UserPlaces.slice(0, 3).map((placeElement, index) => {
      if (this.state.UserPlaces) {
        // console.log("jjjj: " ,this.state.Places[i]);
        return (
          <div className="col-9 col-sm-6 col-lg-4 mt-4" key={placeElement._id}>
            <div className="card-item">
              <div
                className="card-item-highlight"
                style={{
                  backgroundImage: `url(images/places/${placeElement.images[1]}.jpeg)`,
                }}
              >
                <h3 className="card-item-type">
                  {placeElement.type}
                  <br />
                  {this.icons(placeElement)}
                </h3>
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

  renderWishlist = () => {
    document.title = "Profile";
    var i = 0;
    // console.log("Wishlist_Places: " , this.state.Places);
    return this.state.Wishlists.slice(0, 3).map((wishlist_Element, index) => {
      // console.log("");

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
                  backgroundImage: `url(images/places/${this.state.Places[index].images[1]}.jpeg)`,
                }}
              >
                <h3 className="card-item-type">
                  {this.state.Places[index].type}
                  <br />
                  {this.icons(this.state.Places[index])}
                </h3>
                <FaHeart
                  className="wishlist-icon"
                  title="Remove from wishlist"
                  onClick={() => {
                    this.setState({ isWishlisted: !this.state.isWishlisted });
                    this.props.deleteByID(wishlist_Element._id);
                    window.location.reload();

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
  };
  renderTrips = () => {
    var i = 0;
    // console.log("weeeeeee: " , this.state.reserve_Places);
    // console.log("######333333..................: " ,this.state.Reservations , "   " , this.state.reserve_Places.length);
    return this.state.Reservations.slice(0, 4).map(
      (reservation_Element, index) => {
        if (this.state.reserve_Places[index]) {
          // console.log("jjjj: " ,this.state.reserve_Places[index]);
          return (
            <div className=" col-9 col-sm-6  col-lg-4 mt-4 ">
              <div className=" card-item card-item-sm ">
                <Link
                  to=""
                  className="card-item-bg"
                  style={{
                    backgroundImage: `url(images/places/${this.state.reserve_Places[index].images[0]}.jpeg)`,
                  }}
                >
                  <h3 className="card-item-type">
                    {this.state.reserve_Places[index].type}
                  </h3>
                </Link>
                {/* <AiOutlineHeart /> */}
              </div>
            </div>
          );
        }
      }
    );
  };

  icons = (place) => {
    return (
      <>
        {place.has_tv && <FaTv className="highlight-icon" />}
        {place.has_wifi && <FaWifi className="highlight-icon" />}
        {place.pets && <MdPets className="highlight-icon" />}
        {place.has_air_conditioner && <FaFan className="highlight-icon" />}
        {place.has_heating_system && <GiHeatHaze className="highlight-icon" />}
      </>
    );
  };

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

          <div className="row justify-content-center">
            <img
              className="rounded-circle"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
              alt=""
              width="250px"
              height="250px"
            />
          </div>
          <div className="row justify-content-center">
            <div className="col-8  col-md-6 p-3 mt-2  text-center">
              <span className="about-text">
                Hi , I am {this.state.user.name}{" "}
              </span>
              <br></br>
              <span className="about-text">I love Traveling</span>
              <br></br>
              <span className="about-text">
                My Email: {this.state.user.email}
              </span>
              <br></br>

              <FaFacebook className="icon" />
              <AiFillInstagram className="icon" />
              <GiEarthAfricaEurope className="icon" />
            </div>
          </div>
        </div>
        <div className="row justify-content-center p-4 ">
          <div className="col-6 text-center m-5 ">
            <span className="wishlist_header ">My WishList</span>
            <img src="https://educlever.beplusthemes.com/high-school/wp-content/uploads/2019/05/sapec.png" />
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
              <img src="https://educlever.beplusthemes.com/high-school/wp-content/uploads/2019/05/sapec.png" />
            </div>
            )}
            {this.state.reserve_Places.length > 0 && (
            <div className="container">
              <div className="row justify-content-center">
                {this.renderTrips()}
              </div>
            </div>
            )}
            {this.state.UserPlaces.length > 0 && (
              <div className="col-6 text-center m-5 ">
                <span className="wishlist_header ">My Places</span>
                <img src="https://educlever.beplusthemes.com/high-school/wp-content/uploads/2019/05/sapec.png" />
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
              tabindex="-1"
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
                        <label for="exampleInputEmail1">Name</label>
                        <input
                          id="name"
                          type="text"
                          placeholder={this.state.user.name}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                        />
                        {/* <small  className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                          id="email"
                          type="text"
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
                      </div>
                      <div className="form-group">
                        <label for="exampleInputEmail1">Password </label>
                        <input
                          id="pass"
                          type="password"
                          placeholder={this.state.user.password}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ password: e.target.value });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputEmail1">Phone</label>
                        <input
                          id="phone"
                          type="text"
                          placeholder={this.state.user.phone}
                          className="form-control"
                          onChange={(e) => {
                            this.setState({ phone: e.target.value });
                          }}
                        />
                        
                      </div>

                      <button
                        type="button"
                        className="btn update-btn"
                        onClick={async () => {
                          var client = {
                            _id: this.state.user._id,
                            name: this.state.name,
                            email: this.state.email,
                            password: this.state.password,
                            phone: this.state.phone,
                          };
                            
                          await this.props.updateClient(client);
                          window.location.reload();
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
      getAllPlaces,
      getAllClients,
      updateClient,
      getPlaceById,
      getAllWishlists,
      getAllReservation,
      deleteByID,
    },
    disptch
  );
};
const mapstatetoprops = (state) => {
  return {
    places: state.Places,
    clients: state.Clients,
    placeDetails: state.Places,
    wishlists: state.Wishlists,
    reservations: state.Reservations,
  };
};

export default connect(mapstatetoprops, mapactiontoprops)(ViewProfile);
