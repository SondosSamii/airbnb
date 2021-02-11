import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import {getAllPlaces , getLocation} from "../../actions";
import Mapp from "./map";
import Cards from "../home/places-cards";

// import Mapping from './map3';
// import Mapping from "./map3";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            currentLocation :{},
            lat:null,
            long:null,
            filteredPlaces:[],
            searchedPlaces: [],
            searchedWord: "",
            wordFromHome: ""
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
        this.setState({filteredPlaces: this.props.places});

        this.setState({
            wordFromHome: (new URL(document.location)).searchParams.get("keyword")
            // wordFromHome: this.props.location.search
        });

        // console.log("***********************");
        // console.log(this.state.wordFromHome, typeof(this.state.wordFromHome), this.state.wordFromHome.length);

        if(this.state.wordFromHome && this.state.wordFromHome.length > 0) {
            this.getPlacesBySearch(this.state.wordFromHome);
        }
        
        // this.getPlacesBySearch(this.state.wordFromHome);        
    }

    checkSearchedPlaces = async (string) => {
        if (string && string.length > 0) {
            await this.setState({filteredPlaces: await this.state.searchedPlaces});                    
        } else {
            await this.setState({filteredPlaces: await this.props.places});                
        }
    }

    checkFilteredPlaces = async (string) => {
        await this.setState((state) => {
            // eslint-disable-next-line
            state.filteredPlaces = this.state.filteredPlaces.filter((place) => {
                // console.log("place", place);
                // console.log(place[string]);
                if(place[string]){
                    return place;
                }
            })
            return state;
        }) 
    }

    handleFiltersOnCheck = async (str) => {
        let checkedFilter = document.getElementById(str).checked;

        if (checkedFilter) {
            this.checkFilteredPlaces(str);
        } else if (!checkedFilter) {
            this.checkSearchedPlaces(await this.state.searchedWord);
        }
    }

    renderFeatures() {
        return (
            <>
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        id="has_tv"
                        name="has_tv"
                        value="TV"
                        className="custom-control-input"
                        onClick={()=>{
                            this.handleFiltersOnCheck("has_tv");
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
                            this.handleFiltersOnCheck("has_wifi");
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
                            this.handleFiltersOnCheck("pets");
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
                            this.handleFiltersOnCheck("has_heating_system");
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
                            this.handleFiltersOnCheck("has_air_conditioner");
                        }}
                    />
                    <label
                        htmlFor="has_air_conditioner"
                        className="custom-control-label">Air Conditioner
                    </label>
                </div>
            </>
        )
    }

    getPlacesBySearch = async (word) => {
        await this.setState({searchedWord: word.toLowerCase()});
        // console.log(await this.state.searchedWord);
        
        if(this.state.searchedWord.length === 0) {
            await this.setState({filteredPlaces: this.props.places});
        }

        let searchedArr = [];
        if(this.state.filteredPlaces) {
            await this.state.filteredPlaces.map(async place => {
                const cityAndCountry = place.address.city.concat(" ", place.address.country).toLocaleLowerCase();
                // console.log(cityAndCountry);
                if (cityAndCountry.includes(this.state.searchedWord)) {
                    // console.log(place);
                    searchedArr.push(place);
                }
            })
            await this.setState({filteredPlaces: searchedArr});
            await this.setState({searchedPlaces: searchedArr});
        }
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
                    <div className="row mb-5">
                        <div className="col-8 mb-3"
                            style={{height: '350px'}}> {/* The same height of map */}
                            <Mapp word={this.getPlacesBySearch}/>
                        </div>
                        <div className="col-4 mt-5 pt-3">
                            <h4>Filters</h4>
                            <hr/>
                            {this.renderFeatures()}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <Cards places={this.state.filteredPlaces}/>
                    </div>
                </div>
            </section>
         );
    }
}
 
const mapActionToProps = (disptch) =>{
    return bindActionCreators({
        getAllPlaces,
        getLocation
    },
    disptch);
};

const mapStateToProps = (state) =>{
    return {
        places: state.Places,
        position: state.Places
    }
};

export default connect(mapStateToProps , mapActionToProps)(Search);