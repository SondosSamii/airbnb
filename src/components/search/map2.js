
import React, { Component } from 'react';
import HPlatform, { HMap, HMapPolyLine ,HMapMarker } from "react-here-map";

import { bindActionCreators } from "redux";  
import {getAllPlaces , getLocation } from "../actions";


import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStyles = {
  width: '1000px',
  height: '1000px'
};

 export  class Mapp extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
            {latitude: 47.359423, longitude: -122.021071},
            {latitude: 48.78496848869904    , longitude: -120.18015041856468},
            {latitude: 47.6307081, longitude: -122.1434325},
            {latitude: 47.3084488, longitude: -122.2140121},
            {latitude: 47.5524695, longitude: -122.0425407}],
        selectedPlace: {}  ,
        lat:"",
        lng:"" ,
        coords:{},
        places :[]    // Shows the InfoWindow to the selected place upon a marker
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
            async componentDidMount(){
            await this.props.getLocation();
            // this.getlocation();
            console.log("heremmmmmmmm: " , this.props);
            
            console.log("position:    " , this.props.position);
            await this.setState({lat : this.props.position.lat , lng: this.props.position.lng});
            await this.setState({coords:this.props.position});
            console.log("laattt:    " , this.state.coords);
            await this.props.getAllPlaces();
            await this.setState({places:this.props.places});
            this.displayMarkers();
            console.log("places: " , this.state.places);

            console.log("/////////////" , this.state.lat , "  ",this.state.lng);
        }
      displayMarkers = () => {
        return this.state.places.map((place, index) => {
          return <Marker key={index} id={index} position={{
           lat: place.location.lat,
           lng: place.location.lng
         }}
         onClick={() => console.log("You clicked me!")} />
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
    return (
        
        <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
//   initialCenter={{ lat:this.state.coords.lat      , lng: this.state.coords.lng}}
         initialCenter={this.state.coords}
        onClick={this.mapClicked}
      >
        {this.displayMarkers()}
      </Map>
    //   <Map
    //     google={this.props.google}
    //     zoom={14}
    //     style={mapStyles}
    //     initialCenter={
    //       {
    //         lat: -1.2884,
    //         lng: 36.8233
    //       }
    //     }
    //   >
    //       <Marker
    //       onClick={this.onMarkerClick}
    //       name={'Kenyatta International Convention Centre'}
    //     />
    //     <InfoWindow
    //       marker={this.state.activeMarker}
    //       visible={this.state.showingInfoWindow}
    //       onClose={this.onClose}
    //     >
    //       <div>
    //         <h4>{this.state.selectedPlace.name}</h4>
    //       </div>
    //     </InfoWindow>
    //       </Map>
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
