import React, { Component } from 'react';
// import HPlatform, { HMap, HMapPolyLine ,HMapMarker } from "react-here-map";

import { bindActionCreators } from "redux";  
import {getAllPlaces , getLocation } from "../../actions/places";

import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import { connect } from 'react-redux';
import axios from "axios";

const mapStyles = {
  width: "100%",
  height: "100%"
};

const containerStyle = {
  position: 'relative',  
  width: '100%',
  height: '350px' // The same height of its parent in render
};

var params = {
  access_key: '6895d17a0165c9fa200e743be896862d',
  query: '1600 Pennsylvania Ave NW'
};

 export  class Mapp extends Component {
   state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}  ,
        coords:{},
        places :[],
        search_place:"",
        word: "",
        search: ""
      };
      getlocation =  () =>{
        navigator.geolocation.getCurrentPosition(position =>{
    //  position.coords.latitude.toString(),
    //   position.coords.longitude.toString()
        // console.log(position.coords.latitude ,  position.coords.longitude);
        var pos = {
            lat:position.coords.latitude,
            long:position.coords.latitude
        }
        this.setState({coords : pos });
        return null;
    })
    }
    handleClick = async()=>{
      var coordinates ={
          lat: "",
          lng: ""
      }
      params.query = this.state.search_place;
      await axios.get('http://api.positionstack.com/v1/forward', {params})
      .then(response => {
          console.log(response.data.data[0]);
           coordinates ={
              lat: response.data.data[0].latitude,
              lng: response.data.data[0].longitude,

          }  
      }).catch(error => {
          console.log(error);
      });
      
     await this.setState({coords:coordinates});
      console.log(this.state.coords);
  }
        async componentDidMount(){
        await this.props.getLocation();
        // this.getlocation();
        console.log("heremmmmmmmm: " , this.props);       
        console.log("position:    " , this.props.position);
        // await this.setState({lat : this.props.position.lat , lng: this.props.position.lng});
        await this.setState({coords:this.props.position});
        console.log("laattt:    " , this.state.coords);
        await this.props.getAllPlaces();
        await this.setState({places:this.props.places.places});
        this.displayMarkers();
        // console.log("places: " , this.state.places);
        console.log("/////////////" , this.state.lat , "  ",this.state.lng);

        await this.setState({
          search: (new URL(document.location)).searchParams.get("keyword")
        });
    }

    handleValueChange = async (value) => {
      await this.setState({
        word: this.props.word(value),
        search_place: value,
        search: value
      });
      console.log("Woooord: ", this.state.search);
    }

      displayMarkers = () => {
        return this.state.places.map((place, index) => {
          if(this.state.places.location) {
            return <Marker key={index} id={index} position={{
             lat: place.location.lat,
             lng: place.location.lng
           }}
           onClick={() => console.log("You clicked me!")} />
          }
        })
      }
    onMarkerClick = (props, marker, e) =>
    {
        console.log("yyyy");
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });

    }
    onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
      };
      mapClicked(mapProps, map, clickEvent) {
          console.log("......",map, "   " , mapProps ,"   " , clickEvent.latLng.lat() ,"  ", clickEvent.latLng.lng());
        // ...
      }
  render() {
    // let 
    return (
      <>
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-8 col-md-7">
            <input
              type="search"
              name="search"
              className="form-control"
              placeholder="Search..."
              value={this.state.search}
              onChange={e => this.handleValueChange(e.target.value)}
            />
          </div>
          <div className="col-4">
            <button
              type="button"
              className="btn main-btn"
              onClick={()=>{
                this.handleClick();
              }}>Find On Map
            </button>
          </div>
        </div>
      </div>
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        containerStyle={containerStyle}
        initialCenter={{
          lat:47.49855629475769,
          lng: -122.14184416996333
        }}
        center={this.state.coords}
        onClick={this.mapClicked}
      >
        {this.displayMarkers()}
        <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
      </Map>
      </>
    );
  }
}
const mapactiontoprops = (disptch) =>{
    return bindActionCreators({getAllPlaces , getLocation } ,disptch);
}
const mapstatetoprops = (state) =>{
    
    return {
        places : state.Places,
        position : state.Places
       
    }
}
export default connect(mapstatetoprops, mapactiontoprops)(GoogleApiWrapper({
    apiKey: "AIzaSyDED1xIAqSktQ5LAnZ5BCVIkwtKbJPT31U"  
})(Mapp))
// export default 
