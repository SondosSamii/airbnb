// import React, { Component } from 'react';
 
// const e = React.createElement;
// class Map extends Component {
//     // mapRef = React.createRef();

//     state = {
//       // The map instance to use during cleanup
//       map: null
//     };

//      loadMap() {
//         const H = window.H;
//         var platform = new H.service.Platform({
//         'apikey': 'CCXmODx5Od9rWDCHw65Euvmwh7X88epgmdpokuW-CcU'
//         });
      
//         var defaultLayers = platform.createDefaultLayers();
      
//         var map = new H.Map(
//           document.getElementById('mapContainer'),
//           defaultLayers.vector.normal.map,
//           {
//             zoom: 10,
//             center: { lat: 52.5, lng: 13.4 }
//           });
//       }
//     componentDidMount() {
//         this.loadMap();
//         // const H = window.H;
//         // const platform = new H.service.Platform({
//         //         'apikey': 'CCXmODx5Od9rWDCHw65Euvmwh7X88epgmdpokuW-CcU'
//         //       });
              
//         // var layers = platform.createDefaultLayers();
//         // var map = new H.Map(
//         //     document.getElementById('map'),
//         //     layers.vector.normal.map,
//         // {
//         //   zoom: 6,
//         //   center: { lat: 52.5159, lng: 13.3777  }
//         // });
//         // this.setState({map});
    
//         // var events = new H.mapevents.MapEvents(map);
//         // var behavior = new H.mapevents.Behavior(events);
//         // var ui = H.ui.UI.createDefault(map, layers);
//       }
    
//       render() {
//           return  <div id="mapContainer"></div>
//       }
//     }
    
//     export default Map;
   

// import React, { Component } from "react";
// import HEREMap from "react-here-maps";

// export default class Map extends Component {
//    render() {
//        // center the map somewhere in London
//        const center = {
//            lat: 51.5,
//            lng: 0,
//        };
       
//        return (
// //            <HEREMap
// //                appId="ztDVN5FrygKJepRqBvZf"
// //                apikey="CCXmODx5Od9rWDCHw65Euvmwh7X88epgmdpokuW-CcU"
// //                center={center}
// //                zoom={8}
// //            />
// //        )
// //    }
// // }


import React, { Component } from 'react';
import HPlatform, { HMap, HMapPolyLine ,HMapMarker } from "react-here-map";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import {getAllPlaces , getLocation } from "../actions";
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
const mapStyles = {
  width: '1000px',
  height: '1000px'
};

class Mapp extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
        {latitude: 47.359423, longitude: -122.021071},
        {latitude: 48.78496848869904    , longitude: -120.18015041856468},
        {latitude: 47.6307081, longitude: -122.1434325},
        {latitude: 47.3084488, longitude: -122.2140121},
        {latitude: 47.5524695, longitude: -122.0425407}],
    selectedPlace: {}        // Shows the InfoWindow to the selected place upon a marker
  };

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
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
  render(){
    return(
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176}}
        onClick={this.mapClicked}
      >
        {this.displayMarkers()}
      </Map>
    )
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

export default connect(mapstatetoprops , mapactiontoprops)(Mapp);
//     constructor(props) {
//         super(props);
//         this.state = {
//              coords : { lat: 52.5309825, lng: 13.3845921 },
//              places:[],
//             points : [
//                 { lat: 52.5309825, lng: 13.3845921 },
//                 { lat: 52.5311923, lng: 13.3853495 },
//                 { lat: 52.5313532, lng: 13.3861756 },
//                 { lat: 52.5315142, lng: 13.3872163 },
//                 { lat: 52.5316215, lng: 13.3885574 },
//                 { lat: 52.5320399, lng: 13.3925807 },
//                 { lat: 52.5321472, lng: 13.3935785 },
//               ],
//             //coords:{},
//             lng:null,
//             lat:null
//           }
//          this.icon =
//   '<svg width="24" height="24" ' +
//   'xmlns="http://www.w3.org/2000/svg">' +
//   '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
//   'height="22" /><text x="12" y="18" font-size="12pt" ' +
//   'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//   'fill="white">H</text></svg>';
//     }
    
// //     renderMarker=()=>{
// //         return (
// //           this.state.points.map((point)=>{
// //             console.log("point: ", point);
            
// //              return <HMapMarker coords={point} icon={this.icon} /> 
            
// //             })
// //         );
// // }

// getlocation =  () =>{
//   navigator.geolocation.getCurrentPosition(position =>{
// //  position.coords.latitude.toString(),
// //   position.coords.longitude.toString()
//   // console.log(position.coords.latitude ,  position.coords.longitude);
//   var pos = {
//       lat:position.coords.latitude,
//       long:position.coords.latitude
//   }
//   this.setState({coords : pos });
//   return null;
// })
// }
//      async componentDidMount(){
//       await this.props.getLocation();
//       console.log("here: " , this.props);
     
//       console.log("position:    " , this.props.position);
//       await this.setState({lat : this.props.position.lat , lng: this.props.position.lng});
//       this.setState({coords:this.props.position});
//       console.log("laattt:    " , this.state.coords);
//       await this.props.getAllPlaces();
//       this.setState({places:this.props.places});
//     }
//     render() { 
//         return (
            
//     <HPlatform
//     app_id="ztDVN5FrygKJepRqBvZf"
//     apikey="CCXmODx5Od9rWDCHw65Euvmwh7X88epgmdpokuW-CcU"
//     useCIT
//     useHTTPS
//     includeUI
//     includePlaces
//     interactive 
//   >
//     <HMap
//       style={{
//         height: "400px",
//         // width: "800px",
//         width: "100%"        
//       }}
      
//       mapOptions={{ center: this.state.coords, zoom: 7 }}
//       // mapOptions={{ center:   this.state.coords , zoom: 5 }}
//     >
//         <HMapMarker coords={this.state.coords} icon={this.icon} />
//         {this.state.places.map(place => (
//            <HMapMarker coords={place.location} icon={this.icon} /> 
//         ))} 
//            {/* <HMapMarker  coords={this.state.points} icon={this.icon} /> */}
//       {/* {this.renderMarker()} */}
      
//     </HMap>
//   </HPlatform>
//           );
//     }
