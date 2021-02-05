import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import {getAllPlaces , getLocation} from "../actions";
import Mapp from "./map2";
// import Mapping from './map3';
// import Mapping from "./map3";

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
       document.title = "Search";
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
            <section
                id="search"
                className="py-5"
                style={{
                    marginTop: '63px', // Header Height
                }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-1 col-lg-6">
                            <input
                                type="search"
                                name="search"
                                className="form-control"
                                placeholder="Search..."/>
                        </div>
                    </div>
                    <div className="row justify-content-between my-4">
                        <div className="col-8 col-md-8">
                            <div className="w-100">
                            <Mapp
					// google={this.props.google}
					// center={{lat: 18.5204, lng: 73.8567}}
					// height='300px'
					// zoom={15}
				/>
                            </div>
                        </div>
                        <div className="col-4 col-md-4 col-lg-3">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="has_tv"
                                    name="has_tv"
                                    value="TV"
                                    className="custom-control-input"
                                    onClick={()=>{
                                        this.handleClick();
                                }}/>
                                <label
                                    for="has_tv"
                                    className="custom-control-label">TV
                                </label>
                            </div>

                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="has_wifi"
                                    name="has_wifi"
                                    value="Wi Fi"
                                    className="custom-control-input"
                                />
                                <label
                                    for="has_wifi"
                                    className="custom-control-label">Wi-Fi
                                </label>
                            </div>

                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="pets"
                                    name="pets"
                                    value="Pets"
                                    className="custom-control-input"
                                />
                                <label
                                    for="pets"
                                    className="custom-control-label">Allow Pets
                                </label>
                            </div>

                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="has_heating_system"
                                    name="has_heating_system"
                                    value="Heating"
                                    className="custom-control-input"
                                />
                                <label
                                    for="has_heating_system"
                                    className="custom-control-label">Heating System
                                </label>
                            </div>

                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="has_air_conditioner"
                                    name="has_air_conditioner"
                                    value="Air Conditioner"
                                    className="custom-control-input"
                                />
                                <label
                                    for="has_air_conditioner"
                                    className="custom-control-label">Air Conditioner
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                    </div>
                </div>
            </section>
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