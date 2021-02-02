import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import {getAllPlaces , getLocation} from "../actions";
import Map from "./map";



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentLocation :{},
            lat:null,
            long:null,
            filtered:[]

         }
    }
   async componentDidMount(){
      
        await this.props.getLocation();
        // console.log("here: " , this.props);
       
        // console.log("position:    " , this.props.position);
        await this.props.getAllPlaces();
        // console.log("places:    " , this.props.places);
        // this.setState({long:long , lat :lat})
 
    }
    handleClick = async () => {
        var hasTv = document.getElementById("has_tv");
        if (hasTv.checked){
            console.log("uuuuuuuuuuu");
           await this.setState((state) => {
                state.filtered = this.props.places.filter((item) => {
                    // console.log(name.toLowerCase())
                    // console.log("$$$$" , item.name.toLowerCase().includes(name.toLowerCase()) )
                    console.log("item: " , item);
                    if(item.has_wifi==true){
                        console.log("yeeeeeeeeeeeee");
                        return item;
                    }
                })
                return state;
            }) 
        }
        console.log("llllllll: " , this.state.filtered);

    }

    
    render() { 
        return ( 
            <div className = "container bg-light">
                <div className="row justify-content-center">
                <input type="text" className="rounded-pill"/>
                <input type="checkbox" id="has_tv" name="hasTV" onClick={()=>{
                    this.handleClick();
                }}/>
                </div>
                <div className="row mt-5">
                <Map currentLocation = {this.state.currentLocation}/>
                </div>
                <div className="row">

                </div>
            </div>
         );
    }
}
 
const mapactiontoprops = (disptch) =>{
    return bindActionCreators({getAllPlaces , getLocation} ,disptch);
}
const mapstatetoprops = (state) =>{
    
    return {
        places : state.Places,
        position : state.Places
    }
}

export default connect(mapstatetoprops , mapactiontoprops)(Search);