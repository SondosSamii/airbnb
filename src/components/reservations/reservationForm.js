import "./reservationForm.css";
import { getAllReservation , addReservation } from "../../actions/reservations";
import { getAllClients, updateClient } from "../../actions/clients";
import { getAllPlaces, getPlaceById } from "../../actions/places";
import Joi, { validate } from "joi-browser";
import { ToastContainer, toast } from 'react-toastify';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
import moment from "moment"

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
          // console.log(moment(document.getElementById("")))
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

// Validations = () => {
//   const errors = {};
//   let state = { ...this.state };
//   delete state.errors;
//   var res = Joi.validate(state, this.schema, { abortEarly: false });
//   if (res.error === null || res.error <= 0 ) {
//     this.setState({ errors: {} });
//     return null;
//   }
//   for (const error of res.error.details) {
//     errors[error.path] = error.message;
//   }
//   // console.log(res.error.details);
//   // console.log(state);
//   this.setState({ errors: errors });
//   // console.log(this.state.errors.Password);
// };

  handleClick = async ()=>{
    var reservation = {
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      total_nights: this.state.total_nights,
      num_of_guests: this.state.num_of_guests
    };
    var flag= true;
    if(reservation.start_date && reservation.end_date <= reservation.start_date) {
      flag = false;
      toast.error('🙄 Select Valid Dates', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    if(!reservation.start_date){
      flag=false;
      toast.error('🙄 Select Start Date', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    if(!reservation.end_date){
      flag=false;
      toast.error('😏 Select End Date', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    if(!reservation.total_nights || reservation.total_nights < 0 ){
      flag=false;
      toast.error('🤔 Enter Valid Number', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    if(!reservation.num_of_guests || reservation.num_of_guests <= 0  ){
      flag=false;
      toast.error('🤨 Enter Valid Number of Guests', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    if(flag){
      console.log(reservation);
      await this.props.addReservation(this.state.token , this.state.placeID,reservation);
      console.log("^^^^^^^^", this.props.msg);
      // if(this.props.msg === "reservation created successfully!") {
      if(this.props.msg === "success") {
        toast.success('🤩 Reservation created Successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
          setTimeout(()=>{
            this.props.history.push(`/place-details/${this.state.placeID}`);
        }, 5500)
      }
    }
  }

  render() {      
    return (
      <>
        <section id="login" className="py-5">
            <div className="container">
              <ToastContainer />
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12 ">
                            <form id="login-form" className="form" action="" method="post">
                                <h3 className="text-center text-info">Reservation</h3>

                                <div className="form-group">
                                    <label className="text-info">Check In :</label>
                                    <input type="date"
                                    id="start_date"
                                     className="form-control"
                                     value={this.state.start_date}
                                    //  placeholder={this.state.user.start_date}
                                     onChange={(e) => {
                                        this.setState({start_date : e.target.value });
                                        document.getElementById('start_err').innerHTML = "";
                                      }}/>
                                         {/* {this.state.errors.start_date && (
                                          <div className="alert alert-danger form-control">
                                         {this.state.errors.start_date}
                                        </div>
                                       )} */}
                                <small id="start_err">

                                </small>
                                </div>
                                <div className="form-group">
                                    <label className="text-info">Check Out :</label>
                                    <input type="date"
                                    id="end_date"
                                     className="form-control" 
                                     value={this.state.end_date}
                                    //  placeholder={this.state.user.end_date}
                                     onChange={(e) => {
                                        this.setState({ end_date: e.target.value });
                                        document.getElementById('end_err').innerHTML = "";
                                      }}/>
                                         {/* {this.state.errors.end_date && (
                                          <div className="alert alert-danger form-control">
                                         {this.state.errors.end_date}
                                        </div>
                                       )} */}
                                <small id="end_err">
                                  
                                </small>
                                </div>

                                <div className="form-group">
                                    <label className="text-info">Total Nights :</label>
                                    <input type="number" 
                                    className="form-control"
                                    value={this.state.total_nights} 
                                    // placeholder={this.state.user.total_nights}
                                    onChange={(e) => {
                                        this.setState({ total_nights: e.target.value });
                                        document.getElementById('total_nights_err').innerHTML = "";
                                      }}/>
                                       {/* {this.state.errors.total_nights && (
                                          <div className="alert alert-danger form-control">
                                         {this.state.errors.total_nights}
                                        </div>
                                       )} */}
                                      <small id="total_nights_err">
                                  
                                  </small>
                                </div>
                                <div className="form-group">
                                    <label className="text-info">Number of guests :</label>
                                    <input type="number" 
                                    // placeholder={this.state.user.num_of_guests}
                                    value={this.state.num_of_guests}
                                    className="form-control" 
                                    onChange={(e) => {
                                        this.setState({ num_of_guests: e.target.value });
                                        document.getElementById('num_guests_err').innerHTML = "";
                                      }}/>
                                       {/* {this.state.errors.num_of_guests && (
                                          <div className="alert alert-danger form-control">
                                         {this.state.errors.num_of_guests}
                                        </div>
                                       )} */}
                                      <small id="num_guests_err">
                                  
                                    </small>


                                    <div className="form-group">
                                    <div className="col-auto my-2">
                                        <button  id="submit" type="button" className="btn btn-primary float-right  bg-info"  onClick= {()=>{
                                          this.handleClick()
                                        }}>Submit</button>
                                    </div>
                                </div>
                                </div>
                                {/* <div className="form-group">
                                    <div className="col-auto my-1">
                                        <button  id="submit" type="button" className="btn btn-primary float-right  bg-info"  onClick= {()=>{
                                          this.handleClick()
                                        }}>Submit</button>
                                    </div>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
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
      msg: state.Reservations.message
    };
  };

// export default Reservastion
export default connect(mapstatetoprops, mapactiontoprops)(Reservastion);