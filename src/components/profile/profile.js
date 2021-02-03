import { FaFacebook } from "react-icons/fa";
import  {AiFillInstagram} from "react-icons/ai";
import  {GiEarthAfricaEurope} from "react-icons/gi";
import  {FaHeart} from "react-icons/fa";
import { Card ,Button } from 'react-bootstrap';
import "./profile.css";


import {NavLink as Link} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import {getAllPlaces , getPlaceById} from "../../actions/places";
import {getAllWishlists , getwishlistById , deleteByID } from "../../actions/wishlist";
import {getAllReservation  } from "../../actions/reservations";
import {getAllClients , updateClient} from "../../actions/clients";
import React, { Component } from 'react';
import Model from "./model";
import Places from "../../reducers/places";

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Wishlists:[],
            Places:[],
            reserve_Places:[],
            Reservations:[],
            userId: "60044953de30a61a6c0ede19",
            user:{},
            hasPlaces:false,
            UserPlaces:[],
            AllPlaces:[],
            isOpen: false,
            name:"",
            email:"",
            password:"",
            phone:"",

         }
         this.baseUrl = "http://localhost:1337/api/place";
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
   async componentDidMount(){
    await this.props.getAllPlaces();
      
    this.UserPlaces();

       await this.props.getAllWishlists();
       await this.setState({Wishlists : this.props.wishlists});
      await this.User_Wishlist();
      console.log("User_Wishlists:    " , this.state.Wishlists);
       this.getPlaces();
       //////////////////////////////////////////////

       await this.props.getAllReservation();
       await this.setState({Reservations: this.props.reservations});
       await this.UserTrips();
        this.get_reserve_places();
       await this.props.getAllClients();
       this.getUser();
    
    }
 
    User_Wishlist =async () =>{
        var newArr = await this.state.Wishlists.filter( wishlist => wishlist.user_id === this.state.userId);
            // console.log("User Filter Array :   " ,newArr);
            await this.setState({Wishlists:newArr });
    }
     getPlaces= async() => {
        var arr = [];
        var place = null;
        // console.log("HHHHHHHHHHhhh: " , this.props.places);
        if(this.state.Wishlists.length > 0){    
            this.state.Wishlists.map(async(wishlist)=>{ //3 Times
            // console.log("Before Filter######:   ", wishlist.place_id);
             place = await this.props.places.filter(place => {
                // console.log("wishlist_Place_id:   ", wishlist.place_id );
                // console.log("Place_id:   " , place._id );
                 if(place._id === wishlist.place_id){
                    // console.log("Wishlist PlaceDetails   :     ",place);
                    arr.push(place);
                 }
            });
                
              
            })
            //  this.setState({AllPlaces:this.props.places});
            await this.setState({Places:arr});
             console.log("array: " , this.state.Places);
        }
    }


    ///////////////////////////////////////////////////////////
    async get_reserve_places(){
        // console.log("arrayyyyyyyyyyyyyyyyyy: " , this.state.Reservations);
        var arr = [];
        var place = null;
        if(this.state.Reservations.length>0){
              this.state.Reservations.map(async(reservation)=>{
                place = await this.props.places.filter(place => {
                     if(place._id === reservation.place_id){
                        // console.log("Reservation PlaceDetails   :     ",place);
                        arr.push(place);
                     }
                });
            await this.setState({reserve_Places : arr})
            // console.log("arrayyyyyyyyyyyyyyyyyy: " , this.state.reserve_Places);
        });
    }
    }

    getUser =async () =>{
        
        // console.log("/////////////////////" , this.props.clients);
        var user =  this.props.clients.find(client => client._id === this.state.userId);
        // console.log("/////////////////////" , user);
        this.setState({user , name:user.name , email: user.email , password:user.password , phone : user.phone});
        
        
    }
    UserTrips =async () =>{
        var newArr =  this.state.Reservations.filter( reservation => reservation.user_id === this.state.userId);
            // console.log(",,,mmmmm,mmmmmmmmmmmmmmmmmmmm,,," ,newArr);
             this.setState({Reservations:newArr });
    }
    UserPlaces =async () =>{
            //  console.log(",,,,,,," ,this.props.places);
        var newArr = await this.props.places.filter( place => place.user_id === this.state.userId);
            // console.log(",,,,,,," ,newArr);
            await this.setState({UserPlaces:newArr});
    }
    renderPlaces = ()=>{
        // console.log("........lllll......" , this.state.UserPlaces);
        return (
            this.state.UserPlaces.slice(0,3).map((placeElement,index )=>{
                
                
                if(this.state.UserPlaces){
                    // console.log("jjjj: " ,this.state.Places[i]);
                    return (
                        <div className="col-4 ">        
                        <Card style={{ width: '18rem' }}>
                         <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2021/01/08/07/52/trees-5899195_960_720.jpg" />
                         <Card.Body>
                             <Card.Title>{placeElement.price}</Card.Title>
                             <Card.Text>
                             Some quick example text to build on the card title and make up the bulk of
                             the card's content.
                             </Card.Text>
                             <Button variant="primary">Go somewhere</Button>
                         </Card.Body>
                         </Card>
                                </div>
                            );
                }
              
                
            })
        )
    }

    renderWishlist = () =>{
        document.title = "Profile";
        var i = 0;
        // console.log("Wishlist_Places: " , this.state.Places);
        return (
            this.state.Wishlists.slice(0,3).map((wishlist_Element,index )=>{
                // console.log("");
                i++;
                
                if(this.state.Places[index]){
                    // console.log("jjjj: " ,this.state.Places[index]);
                    return (
                        <div className="col-4 ">        
                        <Card style={{ width: '18rem' }}>
                         <Card.Img variant="top" src={`images/places/${this.state.Places[index].images[0]}.jpeg`} />
                         <Card.Body>
                         <FaHeart onClick={()=>{
                            //  console.log("...." , wishlist_Element._id);
                             this.props.deleteByID(wishlist_Element._id);
                         }} />
                             <Card.Title>{this.state.Places[index].address.country}</Card.Title>
                             <Card.Title>{this.state.Places[index].type}</Card.Title>
                             <Card.Text>
                             Some quick example text to build on the card title and make up the bulk of
                             the card's content.
                             </Card.Text>
                             <Button variant="primary">Go somewhere</Button>
                         </Card.Body>
                         </Card>
                                </div>
                            );
                }
              
                
            })
        )
    }
    renderTrips = () =>{
        var i =0;
        // console.log("weeeeeee: " , this.state.reserve_Places);
        // console.log("######333333..................: " ,this.state.Reservations , "   " , this.state.reserve_Places.length);
        return (
            this.state.Reservations.slice(0,4).map((reservation_Element, index )=>{

                if(this.state.reserve_Places[index]){
                    
                    // console.log("jjjj: " ,this.state.reserve_Places[index]);
                    return (
                       <div className="col-9 col-sm-6 col-md-4 col-lg-3 mt-4 mt-md-0">
                            <div className=" card-item card-item-md">
                                <Link
                                    to={`/places/${this.state.reserve_Places[index].address}`}
                                    className="card-item-bg"
                                    style={{
                                    backgroundImage: `url(images/places/${this.state.reserve_Places[index].images[0]}.jpeg)`
                                }}>
                                    <div className="card-item-details">
                                        <h3>{this.state.reserve_Places[index].type}</h3>
                                    </div>
                                </Link>
                                {/* <AiOutlineHeart /> */}
                            </div>
                            </div>                      
                        
                            );
                }
              
                
            })
        )
    }
    

    render() { 
        return(
            <div  className="container--fluid hero">
               <div style={{ 
             backgroundImage: `url('https://cdn.pixabay.com/photo/2017/07/29/13/24/background-2551501_960_720.jpg')`, 
             backgroundRepeat: 'no-repeat',
             backgroundSize:"cover",
             backgroundPosition:"",
             
           }} className="bg-light about-content">
                 <div className="row justify-content-center">
                         <img className="rounded-circle"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" width="250px" height="250px"/>
                 </div>
                 <div className="row justify-content-center">
                    <div className="col-6 col-md-4 p-3 mt-2  text-center">
                         <span className="about-text">Hi , I am {this.state.user.name} </span>
                         <br></br>
                         <span className="about-text">I love Traveling</span>
                         <br></br>
                         <span className="about-text">My Email: {this.state.user.email}</span>
                         <br></br>
                         <FaFacebook className="icon"/>
                         <AiFillInstagram className="icon"/>
                         <GiEarthAfricaEurope className="icon"/>
                     
                    </div>
                 </div>
               </div>
                <div className="row justify-content-center p-4 ">
                  <div className="col-6 text-center m-5 ">
                  <span className="wishlist_header ">
                         My WishList
                     </span>
                         <img src="https://educlever.beplusthemes.com/high-school/wp-content/uploads/2019/05/sapec.png" />
                  </div>
                 
                      <div className="container ">
                     <div className="row">
                     {this.renderWishlist()}
                       </div>
                    </div>
                
                </div>
                
                <div className="container pb-5">
                 <div className="row justify-content-center">
                 <div className="col-6 text-center m-5 ">
                  <span className="wishlist_header ">
                         My Trips
                     </span>
                         <img src="https://educlever.beplusthemes.com/high-school/wp-content/uploads/2019/05/sapec.png" />
                  </div>
                  <div className="container">
                    <div className="row justify-content-center">
                     {this.renderTrips()}
                     </div>
                  </div>
                  {
                     (this.state.UserPlaces.length>0)&&
                  <div className="col-6 text-center m-5 ">
                  <span className="wishlist_header ">
                         My Places
                     </span>
                         <img src="https://educlever.beplusthemes.com/high-school/wp-content/uploads/2019/05/sapec.png" />
                  </div>
    }
                  <div className="container">
                    <div className="row justify-content-center">
                     {this.renderPlaces()}
                     </div>
                  </div>
                  
{/* 
<button  onClick={this.openModal}>
  Launch demo modal
</button> */}
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
    <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input id="name" type="text" placeholder={this.state.user.name} class="form-control" onChange={(e)=>{
            this.setState({name: e.target.value});
        }} />
        {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input id="email" type="text" placeholder={this.state.user.email} class="form-control" onChange={(e)=>{
            this.setState({email: e.target.value});
        }} />
        <small  class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1">Password </label>
        <input id="pass" type="text" placeholder={this.state.user.password} class="form-control" onChange={(e)=>{
            this.setState({password: e.target.value});
        }} />
        
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1">Phone</label>
        <input id="phone" type="text" placeholder={this.state.user.phone} class="form-control" onChange={(e)=>{
            this.setState({phone: e.target.value});
        }} />
    </div>

  
  <button type="button" class="btn btn-primary" onClick={async()=>{
    //   var client_name = document.getElementById("name").value;

    //   console.log("loooo" , client_name);
        var client = {
            _id: this.state.user._id,
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            phone:this.state.phone,

        }
        // var client_id = this.state.user._id;
        await this.props.updateClient(client);
        window.location.reload();
  }}>Submit</button>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
{/* {this.state.user._id} */}
 {/* <Model history={this.props.history} clientId = {this.state.user._id} show={this.state.isOpen} onHide={this.closeModal} /> */}
                  
    
                 </div>
                </div>
            </div>   
         )
    }
}
 
const mapactiontoprops = (disptch) =>{
    return bindActionCreators({getAllPlaces,getAllClients ,updateClient, getPlaceById  , getAllWishlists , getAllReservation ,deleteByID} ,disptch);
}
const mapstatetoprops = (state) =>{
    return {
        places : state.Places,
        clients : state.Clients ,   
        placeDetails: state.Places ,  
        wishlists: state.Wishlists,
        reservations : state.Reservations,
    }
}

export default connect(mapstatetoprops , mapactiontoprops)(ViewProfile);