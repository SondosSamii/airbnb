import "./reservationForm.css";
import { getAllReservation } from "../../actions/reservations";
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
          reserve_Places: [],
          Reservations: [],
          user_Id: "",
          place_Id: "",
          user: {},
          hasPlaces: false,
          UserPlaces: [],
          AllPlaces: [],
          start_date: "",
          end_date: "",
          total_nights: "",
          num_of_guests: "",
          token: "",
          isAuth: false,
          isOpen: false,
          isLogin: true,
        };
        this.baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/reservations";
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
  
      fetch("http://localhost:8080/api/reservation", {
        method: "POST",
        headers: {
          // Authorization: 'Bearer ' + token,
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
          console.log("token: ", response.token);
          this.setState({
            isAuth: true,
            token: response.token,
            user_id: response.user_id,
          });
          localStorage.setItem("token", response.token);
          localStorage.setItem("user_id", response.user_id);

        })
        .catch((error) => {
          console.log("registration error", error);
        });
      this.props.history.push("/");
    };
    
        openModal = () => this.setState({ isOpen: true });
        closeModal = () => this.setState({ isOpen: false });



        

        async componentDidMount() {
          await this.props.getAllPlaces();
      
          this.UserPlaces();
         
      
          await this.props.getAllReservation();
          await this.setState({ Reservations: this.props.reservations });
          this.get_reserve_places();
          await this.props.getAllClients();
          this.getUser();
        }

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
    if(this.props.clients > 0){
        var user = this.props.clients.find(
          (client) => client._id === this.state.userId
        );
        this.setState({
          user,
          start_date: user.start_date,
          end_date: user.end_date,
          total_nights: user.total_nights,
          num_of_guests: user.num_of_guests,
        });
    }
  };


  UserPlaces = async () => {
    
    if(this.props.places){
        var newArr = await this.props.places.filter(
          (place) => place.user_id === this.state.userId
        );
        
        await this.setState({ UserPlaces: newArr });
    }
  };

        
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
                                </div>
                                <div className="form-group">
                                    <label className="text-info">Check Out :</label>
                                    <input type="date" className="form-control" 
                                    placeholder={this.state.user.end_date}
                                    onChange={(e) => {
                                        this.setState({ end_date: e.target.value });
                                      }}/>
                                </div>

                                <div className="form-group">
                                    <label className="text-info">Total Nights :</label>
                                    <input type="number" className="form-control" 
                                    placeholder={this.state.user.total_nights}
                                    onChange={(e) => {
                                        this.setState({ total_nights: e.target.value });
                                      }}/>
                                </div>
                                <div className="form-group">
                                    <label className="text-info">Number of guests :</label>
                                    <input type="number" 
                                    placeholder={this.state.user.num_of_guests}
                                    className="form-control" 
                                    onChange={(e) => {
                                        this.setState({ num_of_guests: e.target.value });
                                      }}/>
                                </div>
                                <div className="form-group">
                                    <div className="col-auto my-1">
                                        <button type="submit" className="btn btn-primary float-right  bg-info"  onClick={async () => {
                          var client = {
                            _id: this.state.user._id,
                            _id: this.state.places._id,
                            start_date: this.state.start_date,
                            end_date: this.state.end_date,
                            price_per_night: this.state.price_per_night,
                            total_nights: this.state.total_nights,
                            num_of_guests: this.state.num_of_guests
                          };
                            
                          await this.props.updateClient(client);
                          window.location.reload();
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