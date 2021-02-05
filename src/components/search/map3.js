// // // MyGoogleMaps.js
// // import React, { Component } from 'react';

// // import GoogleMapReact from 'google-map-react';

// //  import styled from 'styled-components';

// // import AutoComplete from './AutoComplete';
// // import Marker from './Marker';

// // const Wrapper = styled.main`
// //   width: 100%;
// //   height: 100%;
// // `;

// // class Mapping extends Component {


// //     state = {
// //         mapApiLoaded: false,
// //         mapInstance: null,
// //         mapApi: null,
// //         geoCoder: null,
// //         places: [],
// //         center: [],
// //         zoom: 9,
// //         address: '',
// //         draggable: true,
// //         lat: null,
// //         lng: null
// //     };

// //     componentWillMount() {
// //         this.setCurrentLocation();
// //     }


// //     onMarkerInteraction = (childKey, childProps, mouse) => {
// //         this.setState({
// //             draggable: false,
// //             lat: mouse.lat,
// //             lng: mouse.lng
// //         });
// //     }
// //     onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
// //         this.setState({ draggable: true });
// //         this._generateAddress();
// //     }

// //     _onChange = ({ center, zoom }) => {
// //         this.setState({
// //             center: center,
// //             zoom: zoom,
// //         });

// //     }

// //     _onClick = (value) => {
// //         this.setState({
// //             lat: value.lat,
// //             lng: value.lng
// //         });
// //     }

// //     apiHasLoaded = (map, maps) => {
// //         this.setState({
// //             mapApiLoaded: true,
// //             mapInstance: map,
// //             mapApi: maps,
// //         });

// //         this._generateAddress();
// //     };

// //     addPlace = (place) => {
// //         this.setState({
// //             places: [place],
// //             lat: place.geometry.location.lat(),
// //             lng: place.geometry.location.lng()
// //         });
// //         this._generateAddress()
// //     };

// //     _generateAddress() {
// //         const {
// //             mapApi
// //         } = this.state;

// //         const geocoder = new mapApi.Geocoder;

// //         geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
// //             console.log(results);
// //             console.log(status);
// //             if (status === 'OK') {
// //                 if (results[0]) {
// //                     this.zoom = 12;
// //                     this.setState({ address: results[0].formatted_address });
// //                 } else {
// //                     window.alert('No results found');
// //                 }
// //             } else {
// //                 window.alert('Geocoder failed due to: ' + status);
// //             }

// //         });
// //     }

// //     // Get Current Location Coordinates
// //     setCurrentLocation() {
// //         if ('geolocation' in navigator) {
// //             navigator.geolocation.getCurrentPosition((position) => {
// //                 this.setState({
// //                     center: [position.coords.latitude, position.coords.longitude],
// //                     lat: position.coords.latitude,
// //                     lng: position.coords.longitude
// //                 });
// //             });
// //         }
// //     }

// //     render() {
// //         const {
// //             places, mapApiLoaded, mapInstance, mapApi,
// //         } = this.state;


// //         return (
// //             <Wrapper>
// //                 {mapApiLoaded && (
// //                     <div>
// //                         <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
// //                     </div>
// //                 )}
// //                 <GoogleMapReact
// //                     center={this.state.center}
// //                     zoom={this.state.zoom}
// //                     draggable={this.state.draggable}
// //                     onChange={this._onChange}
// //                     onChildMouseDown={this.onMarkerInteraction}
// //                     onChildMouseUp={this.onMarkerInteractionMouseUp}
// //                     onChildMouseMove={this.onMarkerInteraction}
// //                     onChildClick={() => console.log('child click')}
// //                     onClick={this._onClick}
// //                     bootstrapURLKeys={{
// //                         key: 'AIzaSyDED1xIAqSktQ5LAnZ5BCVIkwtKbJPT31U',
// //                         libraries: ['places', 'geometry'],
// //                     }}
// //                     yesIWantToUseGoogleMapApiInternals
// //                     onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
// //                 >

// //                     <Marker
// //                         text={this.state.address}
// //                         lat={this.state.lat}
// //                         lng={this.state.lng}
// //                     />


// //                 </GoogleMapReact>

// //                 <div className="info-wrapper">
// //                     <div className="map-details">Latitude: <span>{this.state.lat}</span>, Longitude: <span>{this.state.lng}</span></div>
// //                     <div className="map-details">Zoom: <span>{this.state.zoom}</span></div>
// //                     <div className="map-details">Address: <span>{this.state.address}</span></div>
// //                 </div>


// //             </Wrapper >
// //         );
// //     }
// // }

// // export default Mapping;



// // import React from 'react'
// // import _ from 'lodash'
// // import { compose, withProps, lifecycle } from 'recompose'
// // import {
// //   withScriptjs,
// //   withGoogleMap,
// //   GoogleMap,
// //   Marker,
// //   GroundOverlay } from 'react-google-maps'
// // const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

// //  const Mapping = compose(
// //   withProps({
// //     googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyDED1xIAqSktQ5LAnZ5BCVIkwtKbJPT31U&v=3.exp&libraries=geometry,drawing,places`,
// //     loadingElement: <div style={{ height: `100%` }} />,
// //     containerElement: <div style={{ height: `400px` }} />,
// //     mapElement: <div style={{ height: `100%` }} />,
// //   }),
// //   lifecycle({
// //     componentWillMount() {
// //       const refs = {}

// //       this.setState({
// //         bounds: null,
// //         center: {
// //           lat: 41.9, lng: -87.624
// //         },
// //         markers: [],
// //         onMapMounted: ref => {
// //           refs.map = ref;
// //         },
// //         onBoundsChanged: () => {
// //           this.setState({
// //             bounds: refs.map.getBounds(),
// //             center: refs.map.getCenter(),
// //           })
// //         },
// //         onSearchBoxMounted: ref => {
// //           refs.searchBox = ref;
// //         },
// //         onPlacesChanged: () => {
// //           const places = refs.searchBox.getPlaces();
// //         //   const google = window.google;
// //           const bounds = new window.google.maps.LatLngBounds();

// //           places.forEach(place => {
// //             if (place.geometry.viewport) {
// //               bounds.union(place.geometry.viewport)
// //             } else {
// //               bounds.extend(place.geometry.location)
// //             }
// //           });
// //           const nextMarkers = places.map(place => ({
// //             position: place.geometry.location,
// //           }));
// //           const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

// //           this.setState({
// //             center: nextCenter,
// //             markers: nextMarkers,
// //           });
// //           // refs.map.fitBounds(bounds);
// //         },
// //       })
// //     },
// //   }),
// //   withScriptjs,
// //   withGoogleMap
// // )(props =>
// //   <GoogleMap
// //     ref={props.onMapMounted}
// //     defaultZoom={15}
// //     center={props.center}
// //     onBoundsChanged={props.onBoundsChanged}
// //   >
// //     <SearchBox
// //       ref={props.onSearchBoxMounted}
// //       bounds={props.bounds}
// //       controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
// //       onPlacesChanged={props.onPlacesChanged}
// //     >
// //       <input
// //         type="text"
// //         placeholder="Customized your placeholder"
// //         style={{
// //           boxSizing: `border-box`,
// //           border: `1px solid transparent`,
// //           width: `240px`,
// //           height: `32px`,
// //           marginTop: `27px`,
// //           padding: `0 12px`,
// //           borderRadius: `3px`,
// //           boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
// //           fontSize: `14px`,
// //           outline: `none`,
// //           textOverflow: `ellipses`,
// //         }}
// //       />
// //     </SearchBox>
// //     {props.markers.map((marker, index) =>
// //       <Marker key={index} position={marker.position} />
// //     )}
// //   </GoogleMap>
// // );
// // export default Mapping;

// // // const _ = require("lodash");
// // // const { compose, withProps, lifecycle } = require("recompose");
// // // const {
// // //   withScriptjs,
// // //   withGoogleMap,
// // //   GoogleMap,
// // //   Marker,
// // // } = require("react-google-maps");
// // // const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

// // // const Mapping = compose(
// // //   withProps({
// // //     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
// // //     loadingElement: <div style={{ height: `100%` }} />,
// // //     containerElement: <div style={{ height: `400px` }} />,
// // //     mapElement: <div style={{ height: `100%` }} />,
// // //   }),
// // //   lifecycle({
// // //     componentWillMount() {
// // //       const refs = {}

// // //       this.setState({
// // //         bounds: null,
// // //         center: {
// // //           lat: 41.9, lng: -87.624
// // //         },
// // //         markers: [],
// // //         onMapMounted: ref => {
// // //           refs.map = ref;
// // //         },
// // //         onBoundsChanged: () => {
// // //           this.setState({
// // //             bounds: refs.map.getBounds(),
// // //             center: refs.map.getCenter(),
// // //           })
// // //         },
// // //         onSearchBoxMounted: ref => {
// // //           refs.searchBox = ref;
// // //         },
// // //         onPlacesChanged: () => {
// // //             const google = window.google;
// // //           const places = refs.searchBox.getPlaces();
// // //           const bounds = new google.maps.LatLngBounds();

// // //           places.forEach(place => {
// // //             if (place.geometry.viewport) {
// // //               bounds.union(place.geometry.viewport)
// // //             } else {
// // //               bounds.extend(place.geometry.location)
// // //             }
// // //           });
// // //           const nextMarkers = places.map(place => ({
// // //             position: place.geometry.location,
// // //           }));
// // //           const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

// // //           this.setState({
// // //             center: nextCenter,
// // //             markers: nextMarkers,
// // //           });
// // //           // refs.map.fitBounds(bounds);
// // //         },
// // //       })
// // //     },
// // //   }),
// // //   withScriptjs,
// // //   withGoogleMap
// // // )(props =>
// // //   <GoogleMap
// // //     ref={props.onMapMounted}
// // //     defaultZoom={15}
// // //     center={props.center}
// // //     onBoundsChanged={props.onBoundsChanged}
// // //   >
// // //     <SearchBox
// // //       ref={props.onSearchBoxMounted}
// // //       bounds={props.bounds}
// // //       controlPosition={google.maps.ControlPosition.TOP_LEFT}
// // //       onPlacesChanged={props.onPlacesChanged}
// // //     >
// // //       <input
// // //         type="text"
// // //         placeholder="Customized your placeholder"
// // //         style={{
// // //           boxSizing: `border-box`,
// // //           border: `1px solid transparent`,
// // //           width: `240px`,
// // //           height: `32px`,
// // //           marginTop: `27px`,
// // //           padding: `0 12px`,
// // //           borderRadius: `3px`,
// // //           boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
// // //           fontSize: `14px`,
// // //           outline: `none`,
// // //           textOverflow: `ellipses`,
// // //         }}
// // //       />
// // //     </SearchBox>
// // //     {props.markers.map((marker, index) =>
// // //       <Marker key={index} position={marker.position} />
// // //     )}
// // //   </GoogleMap>
// // // );

// // // // export default Mapping;
// // import Geocode from "react-geocode";
 
// // // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.

 
// // // set response language. Defaults to english.


// // import React, { Component } from 'react';
// // class Mapping extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {  }
// //     }

// //     componentDidMount(){
// //         Geocode.setApiKey("AIzaSyDED1xIAqSktQ5LAnZ5BCVIkwtKbJPT31U");
 
// // // set response language. Defaults to english.
// // Geocode.setLanguage("en");
 
// // // set response region. Its optional.
// // // A Geocoding request with region=es (Spain) will return the Spanish city.
// // Geocode.setRegion("es");
 
// // // Enable or disable logs. Its optional.
// // Geocode.enableDebug();
 
// // // Get address from latitude & longitude.
// // Geocode.fromLatLng("48.8583701", "2.2922926").then(
// //   response => {
// //     const address = response.results[0].formatted_address;
// //     console.log(address);
// //   },
// //   error => {
// //     console.error(error);
// //   }
// // );
 
// // // Get latitude & longitude from address.
// // Geocode.fromAddress("Eiffel Tower").then(
// //   response => {
// //     const { lat, lng } = response.results[0].geometry.location;
// //     console.log(";;;;;;;;;;;;;;",lat, lng);
// //   },
// //   error => {
// //     console.error(error);
// //   }
// // );
// //     }
// //     render() { 
// //         return ( 
// //             <h1>MMM</h1>
// //          );
// //     }
// // }
 

// // export default Mapping;
// let DEBUG = false;
// let API_KEY = null;
// let LANGUAGE = "en";
// let REGION = null;
// const GOOGLE_API = "https://maps.googleapis.com/maps/api/geocode/json";

// function log(message, warn = false) {
//   if (DEBUG) {
//     if (warn) {
//       console.warn(message);
//     } else {
//       console.log(message);
//     }
//   }
// }

// async function handleUrl(url) {
//   const response = await fetch(url).catch(() =>
//     Promise.reject(new Error("Error fetching data"))
//   );

//   const json = await response.json().catch(() => {
//     log("Error parsing server response");
//     return Promise.reject(new Error("Error parsing server response"));
//   });

//   if (json.status === "OK") {
//     log(json);
//     return json;
//   }
//   log(
//     `${json.error_message}.\nServer returned status code ${json.status}`,
//     true
//   );
//   return Promise.reject(
//     new Error(
//       `${json.error_message}.\nServer returned status code ${json.status}`
//     )
//   );
// }

// export default {
//   /**
//    *
//    *
//    * @param {string} apiKey
//    */
//   setApiKey(apiKey) {
//     API_KEY = apiKey;
//   },

//   /**
//    *
//    *
//    * @param {string} language
//    */
//   setLanguage(language) {
//     LANGUAGE = language;
//   },

//   /**
//    *
//    *
//    * @param {string} region
//    */
//   setRegion(region) {
//     REGION = region;
//   },

//   /**
//    *
//    *
//    * @param {boolean} [flag=true]
//    */
//   enableDebug(flag = true) {
//     DEBUG = flag;
//   },

//   /**
//    *
//    *
//    * @param {string} lat
//    * @param {string} lng
//    * @param {string} [apiKey]
//    * @param {string} [language]
//    * @param {string} [region]
//    * @returns {Promise}
//    */
//   async fromLatLng(lat, lng, apiKey, language, region) {
//     if (!lat || !lng) {
//       log("Provided coordinates are invalid", true);
//       return Promise.reject(new Error("Provided coordinates are invalid"));
//     }

//     const latLng = `${lat},${lng}`;
//     let url = `${GOOGLE_API}?latlng=${encodeURIComponent(latLng)}`;

//     if (apiKey || API_KEY) {
//       API_KEY = apiKey || API_KEY;
//       url += `&key=${API_KEY}`;
//     }

//     if (language || LANGUAGE) {
//       LANGUAGE = language || LANGUAGE;
//       url += `&language=${LANGUAGE}`;
//     }

//     if (region || REGION) {
//       REGION = region || REGION;
//       url += `&region=${encodeURIComponent(REGION)}`;
//     }

//     return handleUrl(url);
//   },

//   /**
//    *
//    *
//    * @param {string} address
//    * @param {string} [apiKey]
//    * @param {string} [language]
//    * @param {string} [region]
//    * @returns {Promise}
//    */
//   async fromAddress(address, apiKey, language, region) {
//     if (!address) {
//       log("Provided address is invalid", true);
//       return Promise.reject(new Error("Provided address is invalid"));
//     }

//     let url = `${GOOGLE_API}?address=${encodeURIComponent(address)}`;

//     if (apiKey || API_KEY) {
//       API_KEY = apiKey || API_KEY;
//       url += `&key=${API_KEY}`;
//     }

//     if (language || LANGUAGE) {
//       LANGUAGE = language || LANGUAGE;
//       url += `&language=${LANGUAGE}`;
//     }

//     if (region || REGION) {
//       REGION = region || REGION;
//       url += `&region=${encodeURIComponent(REGION)}`;
//     }

//     return handleUrl(url);
//   },
// };


var React = require('react');

var INITIAL_LOCATION = {
  address: 'London, United Kingdom',
  position: {
    latitude: 51.5085300,
    longitude: -0.1257400
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 8;

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

var Mapping = React.createClass({  
  getInitialState: function () {
    return {
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address
    };
  },

  geocodeAddress: function (address) {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === window.google.maps.GeocoderStatus.OK) {

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        });

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      this.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

    }.bind(this));
  },

  handleFormSubmit: function (submitEvent) {
    submitEvent.preventDefault();

    var address = this.searchInputElement.value;

    this.geocodeAddress(address);
  },

  componentDidMount: function () {
    var mapElement = this.mapElement;
    
    this.map = new Window.google.maps.Map(mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.marker = new Window.google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.geocoder = new Window.google.maps.Geocoder();
  },

  setSearchInputElementReference: function (inputReference) {
    this.searchInputElement = inputReference;
  },

  setMapElementReference: function (mapElementReference) {
    this.mapElement = mapElementReference;
  },

  render: function () {
    return (
      <div className="container">

        <div className="row">
          <div className="col-sm-12">

            <form className="form-inline" onSubmit={this.handleFormSubmit}>
              <div className="row">
                <div className="col-xs-8 col-sm-10">

                  <div className="form-group">
                    <label className="sr-only" htmlFor="address">Address</label>
                    <input type="text" className="form-control input-lg" id="address" placeholder="London, United Kingdom" ref={this.setSearchInputElementReference} required />
                  </div>

                </div>
                <div className="col-xs-4 col-sm-2">

                  <button type="submit" className="btn btn-default btn-lg">
                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </button>

                </div>
              </div>
            </form>

          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">

            {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}

            <div className="map" ref={this.setMapElementReference}></div>
            
          </div>
        </div>
      </div>
    );
  }
});

export default Mapping;