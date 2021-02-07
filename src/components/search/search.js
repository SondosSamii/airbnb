import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import {getAllPlaces , getLocation} from "../../actions";
import Mapp from "./map";
import Highlights from "../home/highlights";
// import Mapping from './map3';
// import Mapping from "./map3";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            currentLocation :{},
            lat:null,
            long:null,
            filtered:[],
            seach_place:""
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
       this.setState({filtered: this.props.places});
    }

    // handleClick = async () => {
    //     var hasTv = document.getElementById("has_tv");
    //     if (hasTv.checked){
    //         console.log("uuuuuuuuuuu");
    //         await this.setState((state) => {
    //             state.filtered = this.props.places.filter((item) => {
    //                 // console.log(name.toLowerCase())
    //                 // console.log("$$$$" , item.name.toLowerCase().includes(name.toLowerCase()) )
    //                 console.log("item: " , item);
    //                 if(item.has_wifi==true){
    //                     console.log("yeeeeeeeeeeeee");
    //                     return item;
    //                 }
    //             })
    //             return state;
    //         }) 
    //     }
    //     console.log("llllllll: " , this.state.filtered);

    // }

    handleClick = async (str) => {
        let arr = [];
        if (!document.getElementById("has_tv").checked
            && !document.getElementById("has_wifi").checked
            && !document.getElementById("has_heating_system").checked
            && !document.getElementById("has_air_conditioner").checked
            && !document.getElementById("pets").checked) {
                // console.log("Ifffff");
                this.setState({filtered: this.props.places});
        }
        if (document.getElementById(str).checked){
            await this.setState((state) => {
                state.filtered = this.state.filtered.filter((item) => {
                    // console.log(item);
                    // console.log(item[str]);
                    if(item[str]){
                        // console.log("item", item);
                        return item;
                    }
                })
                return state;
            }) 
        } else {
            console.log("else");
            if(document.getElementById('has_wifi').checked) {
                // console.log('has_wifi.........');
                arr.push('has_wifi');
            }
            if(document.getElementById('pets').checked) {
                // console.log('pets.........');
                arr.push('pets');
            }
            if(document.getElementById('has_tv').checked) {
                // console.log('pets.........');
                arr.push('has_tv');
            }
            if(document.getElementById('has_heating_system').checked) {
                // console.log('pets.........');
                arr.push('has_heating_system');
            }
            if(document.getElementById('has_air_conditioner').checked) {
                // console.log('pets.........');
                arr.push('has_air_conditioner');
            }
            

            console.log("######",arr);
           await this.renderArr(arr);

        }
        // arr = this.state.filtered;
        console.log("Outside if///////////////////////: " , this.state.filtered);
    }

    async renderArr(arr) {
        await this.setState({filtered: this.props.places});
        console.log('____________________');
        console.log(arr);
        arr.map((arrItem)=>{
            this.setState((state) => {
                state.filtered = this.state.filtered.filter((place) => {
                    console.log(place);
                    if(place[arrItem]){
                        return place;
                    }
                })
                return state;
            })
        })
        console.log("............" , this.state.filtered);
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
                                placeholder="Search..."
                                onChange={(e)=>{
                                    this.setState({seach_place : e.target.value})
                                }}/>
                            <input type="button" value="Search" 
                            onClick={()=>{
                                this.handleClick();
                            }}/>
                        </div>
                    </div>
                    <div className="row justify-content-between my-4">
                        <div className="col-8 col-md-8">
                            <div className="w-100 h-100">
                                <Mapp />
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
                                        this.handleClick("has_tv");
                                    }}/>
                                <label
                                    htmlFor="has_tv"
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
                                    onClick={()=>{
                                        this.handleClick("has_wifi");
                                    }}
                                />
                                <label
                                    htmlFor="has_wifi"
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
                                    onClick={()=>{
                                        this.handleClick("pets");
                                    }}
                                />
                                <label
                                    htmlFor="pets"
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
                                    onClick={()=>{
                                        this.handleClick("has_heating_system");
                                    }}
                                />
                                <label
                                    htmlFor="has_heating_system"
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
                                    onClick={()=>{
                                        this.handleClick("has_air_conditioner");
                                    }}
                                />
                                <label
                                    htmlFor="has_air_conditioner"
                                    className="custom-control-label">Air Conditioner
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="container my-5">
                        <div className="row justify-content-center">
                            <Highlights/>
                        </div>
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