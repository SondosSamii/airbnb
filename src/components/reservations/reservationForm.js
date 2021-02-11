import "./reservationForm.css";
import { getAllReservation , addReservation } from "../../actions/reservations";
import { getAllClients, updateClient } from "../../actions/clients";
import { getAllPlaces, getPlaceById } from "../../actions/places";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import React, { Component } from "react";

// const Reservastion = () => {
    class Reservastion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // Places: [],
          // reserve_Places: [],
          // Reservations: [],
          user_Id: "",
          place_Id: "",
          user: {},
          start_date: "",
          end_date: "",
          total_nights: "",
          num_of_guests: "",
          token: "",
          isAuth: false,
          isOpen: false,
          isLogin: true,
          placeID : ""
          
        };
        this.baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/reservations";
    }



    Submit = async  () => {
      var client = {
        _id: this.state.user._id,
        _id: this.state.places._id,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        price_per_night: this.state.price_per_night,
        total_nights: this.state.total_nights,
        num_of_guests: this.state.num_of_guests
      };
        
      // await this.props.updateClient(client);
      // window.location.reload();
    }


    handelReservations = async (e) => {
      e.preventDefault();
  
      // const errors = this.Validations();
      // const valid=this.LoginValidations();
      // if (errors) return;
      // if(!valid)return;
      // var formData = new FormData();
      // formData.append("email", "moataz3@gmail.com");
      // formData.append("password", this.state.Password);
      // console.log(this.state.Email);
      console.log("esraaaaaaaaaaa",localStorage.token);
  
      fetch("http://localhost:8080/api/reservation", {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + localStorage.token,
          "Content-Type": "application/json",
               },
        body: JSON.stringify({
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          total_nights: this.state.total_nights,
          num_of_guests: this.state.num_of_guests,
        }),
      })
        .then((response) => {
          if (response.statusText === "created") {
            this.props.handleSuccessfulAuth(response.data);
          }
          return response.json();
        })
        .then((response) => {
          console.log("response: ", response);
         
        })
        .catch((error) => {
          console.log("registration error", error);
        });
      // this.props.history.push("/");
    };
    
        openModal = () => this.setState({ isOpen: true });
        closeModal = () => this.setState({ isOpen: false });



        

        async componentDidMount() {
            // console.log(",,,,,,,:  ",this.props.match.params.id);
          await this.setState({
              token: localStorage.getItem("token") ,
              placeID :  this.props.match.params.id
        });
          console.log("token: "  , this.state.token);
          // await this.props.getAllPlaces();
      
          // this.UserPlaces();
         
      
          // await this.props.getAllReservation();
          // await this.setState({ Reservations: this.props.reservations });
          // // this.get_reserve_places();
          // await this.props.getAllClients();
          // this.getUser();
        }

        // getPlaces = async () => {
        //     var arr = [];
        //     var place = null;
        //     if (this.state.Wishlists.length > 0) {
        //       this.state.Wishlists.map(async (wishlist) => {
        //         place = await this.props.places.filter((place) => {
        //           if (place._id === wishlist.place_id) {
        //             arr.push(place);
        //           }
        //         });
        //       });
        //       await this.setState({ Places: arr });
        //       console.log("array: ", this.state.Places);
        //     }
        //   };
            
              
//   async get_reserve_places() {
//     var arr = [];
//    var place = null;
//    if (this.state.Reservations.length > 0) {
//      this.state.Reservations.map(async (reservation) => {
//        place = await this.props.places.filter((place) => {
//          if (place._id === reservation.place_id) {
//           arr.push(place);
//          }
//        });
//        await this.setState({ reserve_Places: arr });
//      });
//    }
//  }


//  getUser = async () => {
//     if(this.props.clients > 0){
//         var user = this.props.clients.find(
//           (client) => client._id === this.state.userId
//         );
//         this.setState({
//           user,
//           start_date: user.start_date,
//           end_date: user.end_date,
//           total_nights: user.total_nights,
//           num_of_guests: user.num_of_guests,
//         });
//     }
//   };


  // UserPlaces = async () => {
    
  //   if(this.props.places){
  //       var newArr = await this.props.places.filter(
  //         (place) => place.user_id === this.state.userId
  //       );
        
  //       await this.setState({ UserPlaces: newArr });
  //   }
  // };
  handleClick = ()=>{
    var reservation = {
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      price_per_night: 200,
      total_nights: this.state.total_nights,
      num_of_guests: this.state.num_of_guests
    };
var flag= true;
    if(!reservation.start_date){
      flag=false;
      document.getElementById("start_err").innerHTML= "should Enter start Date";
    }
    if(!reservation.end_date){
      flag=false;
      document.getElementById("end_err").innerHTML= "should Enter start Date";
    }
    if(!reservation.total_nights){
      flag=false;
      document.getElementById("total_nights_err").innerHTML= "should Enter start Date";
    }
    if(!reservation.num_of_guests){
      flag=false;
      document.getElementById("num_guests_err").innerHTML= "should Enter start Date";
    }
    if(flag){
      console.log(reservation);
      this.props.addReservation(this.state.token , this.state.placeID,reservation);
    }


  }

        
        render() {
        
    return (
        <section id="login" className="py-5">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" action="" method="post">
                                <h3 className="text-center text-info">Reservation</h3>

                                <div className="form-group">
                                    <label className="text-info">Check In :</label>
                                    <input type="date" className="form-control"
                                     placeholder={this.state.user.start_date}
                                     onChange={(e) => {
                                        this.setState({start_date : e.target.value });
                                      }}/>
                                <small id="start_err">

                                </small>
                                </div>
                                <div className="form-group">
                                    <label className="text-info">Check Out :</label>
                                    <input type="date" className="form-control" 
                                    placeholder={this.state.user.end_date}
                                    onChange={(e) => {
                                        this.setState({ end_date: e.target.value });
                                      }}/>
                                <small id="end_err">
                                  
                                </small>
                                </div>

                                <div className="form-group">
                                    <label className="text-info">Total Nights :</label>
                                    <input type="number" className="form-control" 
                                    placeholder={this.state.user.total_nights}
                                    onChange={(e) => {
                                        this.setState({ total_nights: e.target.value });
                                      }}/>
                                      <small id="total_nights_err">
                                  
                                  </small>
                                </div>
                                <div className="form-group">
                                    <label className="text-info">Number of guests :</label>
                                    <input type="number" 
                                    placeholder={this.state.user.num_of_guests}
                                    className="form-control" 
                                    onChange={(e) => {
                                        this.setState({ num_of_guests: e.target.value });
                                      }}/>
                                      <small id="num_guests_err">
                                  
                                    </small>
                                </div>
                                <div className="form-group">
                                    <div className="col-auto my-1">
                                        <button type="button" className="btn btn-primary float-right  bg-info"  onClick= {()=>{
                                          this.handleClick()
                                        }}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

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
        getAllReservation,
        addReservation

      },
      disptch
    );
  };
  const mapstatetoprops = (state) => {
    return {
      places: state.Places,
      clients: state.Clients,
      placeDetails: state.Places,
      reservations: state.Reservations,
    };
  };

// export default Reservastion
export default connect(mapstatetoprops, mapactiontoprops)(Reservastion);