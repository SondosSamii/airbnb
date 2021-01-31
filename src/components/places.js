// import {useState, useEffect} from "react";
import { NavLink as Link } from "react-router-dom";
// // import axios from "axios";

// const Places = () => {
//     const [places, setPlaces] = useState({});
//     const baseURL = "http://localhost:4200/places";

//     useEffect(() => {
//         async function fetchMyAPI() {
//           let response = await fetch(baseURL)
//           response = await response.json()
//           setPlaces(response)
//           console.log(";;;;;;;;;;;;;;;;;;;;;;",response);
//           console.log("[[[[[[[[[[[[[[[[[",places);
//         }
//         fetchMyAPI()
//       }, [])

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //       const result = await axios(
//     //         baseURL,
//     //       );
//     //       setPlaces(result.data);
//     //     };
     
//     //     fetchData();
//     //   }, []);

//     // useEffect(async () => {
//     //     await fetch(baseURL, {method: 'GET'})
//     //     .then(res => {
//     //         return res.json();
//     //     }).then(data => {
//     //         console.log("................",data);
//     //         setPlaces(data);
//     //     }).catch(err => {
//     //         console.log(err);
//     //     })
//     // }, []);

//     const renderPlaces = (places)=>{
//         console.log("places",places);
//         // <div>{places[0].id}</div>
//     //     if (places) {
//     //         return (
//     //             <div className="row justify-content-center">
//     //                     <div className="col-10 col-md-5">
//     //                         <div className="card-item card-item-lg">
//     //                             <Link
//     //                                 to={`/places/${places[0].id}`}
//     //                                 className="card-item-bg"
//     //                                 style={{
//     //                                 backgroundImage: `url(images/places/${places[0].images[2]}.jpeg)`
//     //                             }}>
//     //                                 <div className="card-item-details">
//     //                                     <h3>{places[0].type}</h3>
//     //                                 </div>
//     //                             </Link>
//     //                         </div>
//     //                     </div>
//     //                     <div className="col-10 col-md-7">
//     //                         <div className="row">
//     //                             <div className="col-6">
//     //                                 <div className="card-item card-item-sm">
//     //                                     <Link
//     //                                         to={`/places/${places[1].id}`}
//     //                                         className="card-item-bg"
//     //                                         style={{
//     //                                             backgroundImage: `url(images/places/${places[1].images[0]}.jpeg)`
//     //                                         }}>
//     //                                             <div className="card-item-details">
//     //                                                 <h3>{places[1].type}</h3>
//     //                                             </div>
//     //                                     </Link>
//     //                                 </div>
//     //                             </div>
//     //                             <div className="col-6">
//     //                                 <div className="card-item card-item-sm">
//     //                                     <Link
//     //                                         to={`/places/${places[2].id}`}
//     //                                         className="card-item-bg"
//     //                                         style={{
//     //                                             backgroundImage: `url(images/places/${places[2].images[0]}.jpeg)`
//     //                                         }}>
//     //                                             <div className="card-item-details">
//     //                                                 <h3>{places[2].type}</h3>
//     //                                             </div>
//     //                                     </Link>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                         <div
//     //                             className="row"
//     //                             style={{
//     //                             marginTop: '30px'
//     //                         }}>
//     //                             <div className="col-12">
//     //                                 <div className="card-item card-item-sm">
//     //                                     <Link
//     //                                         to={`/places/${places[0].id}`}
//     //                                         className="card-item-bg"
//     //                                         style={{
//     //                                             backgroundImage: `url(images/places/${places[0].images[1]}.jpeg)`
//     //                                         }}>
//     //                                             <div className="card-item-details">
//     //                                                 <h3>{places[0].type}</h3>
//     //                                             </div>
//     //                                     </Link>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //         )
//     //     }
//     //     return (
//     //         <h2 className="text-center my-5">No Places... </h2>
//     //     )
//     // }
//     }
//     return (
//         <div className="container my-5">
//             <h2 className="text-center mb-4">Our Places</h2>
//             {renderPlaces(places)}
//         </div>
//     )
// }

// export default Places;

import React, { Component } from 'react';

class Places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places:[]
          }
          this.baseURL = "http://localhost:4200/places";
    }
     componentDidMount(){
         fetch(this.baseURL, { method: "GET" })
        .then((resp) => {
            
          return resp.json();
        })
        .then((data) => {
          console.log(data);
          console.log(".........." , data);
          this.setState({places: data});
        })
        .catch((err) => {
          console.log(console.err);
        });
    }
    renderPlaces = ()=>{
      console.log("llllllllllllll" , this.state.places);
        if(this.state.places){
            console.log("yes");
            var i =0;
            
            return this.state.places.slice(0, 1).map((place)=>{ //3
                
                console.log("dddddddddddd: " , i);
                
                // if(i== 0) {
                    // i++;
                return (
                 <div className="row justify-content-center">
                        <div className="col-10 col-md-5">
                            <div className="card-item card-item-lg">
                                <Link
                                    to={`/places/${this.state.places[0].id}`}
                                    className="card-item-bg"
                                    style={{
                                    backgroundImage: `url(images/places/${this.state.places[0].images[2]}.jpeg)`
                                }}>
                                    <div className="card-item-details">
                                        <h3>{this.state.places[0].type}</h3>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-10 col-md-7">
                            <div className="row">
                                <div className="col-6">
                                    <div className="card-item card-item-sm">
                                        <Link
                                            to={`/places/${this.state.places[1].id}`}
                                            className="card-item-bg"
                                            style={{
                                                backgroundImage: `url(images/places/${this.state.places[1].images[0]}.jpeg)`
                                            }}>
                                                <div className="card-item-details">
                                                    <h3>{this.state.places[1].type}</h3>
                                                </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card-item card-item-sm">
                                        <Link
                                            to={`/places/${this.state.places[2].id}`}
                                            className="card-item-bg"
                                            style={{
                                                backgroundImage: `url(images/places/${this.state.places[2].images[0]}.jpeg)`
                                            }}>
                                                <div className="card-item-details">
                                                    <h3>{this.state.places[2].type}</h3>
                                                </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="row"
                                style={{
                                marginTop: '30px'
                            }}>
                                <div className="col-12">
                                    <div className="card-item card-item-sm">
                                        <Link
                                            to={`/places/${this.state.places[0].id}`}
                                            className="card-item-bg"
                                            style={{
                                                backgroundImage: `url(images/places/${this.state.places[0].images[1]}.jpeg)`
                                            }}>
                                                 <div className="card-item-details">
                                                     <h3>{this.state.places[0].type}</h3>
                                                 </div>
                                         </Link>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                );
                
            //   }
            }
            )
            
        }
        else{
            return <h1>Nooooo</h1>
        }
    //   return <div>{places[0].id}</div>
        // return this.places.map((place)=>{
        //     return <div>{place.id}</div>
        // })
    }
    
     render () { 
        
        return (  
                <div className="container my-5">
                         <h2 className="text-center mb-4">Our Places</h2>
                         {this.renderPlaces()}
                     </div>
        );
    }
}
 
export default Places;