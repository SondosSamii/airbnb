import axios from "axios";
 
// const baseUrl = "http://localhost:1337/api/reservations";
const url = "http://localhost:8080/api/reservation";
const get_Place_reservations_url = "http://localhost:8080/api/placeReservations";
const get_Reservation_Details_Not_Auth = "http://localhost:8080/api/reservationNotAuth";

const baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/reservations";

// const baseUrl = "http://localhost:4200/students";

export async function getAllReservation(){
    var payload = null;
    try{
        let response = await fetch(`${baseUrl}`);
        payload = await response.json();
        console.log(payload);
     }catch(e){
         console.log( e);
     }
     return {
         type:"AllReservations",
         payload
     }
     
 }

export async function getReservationByID(token , id){
    var payload = null;
    try{
        let response = await fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json",
             },
         });
        payload = await response.json();
        console.log(payload);
     }catch(e){
         console.log( e);
     }
     return {
         type:"reservationDetails",
         payload
     }
     
 }
export async function getReservationByID_NotAuth(id){ //for calender
    var payload = null;
    try{
        let response = await fetch(`${get_Reservation_Details_Not_Auth}/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
             },
         });
        payload = await response.json();
        console.log(payload);
     }catch(e){
         console.log( e);
     }
     return {
         type:"reservationDetails_Not_auth",
         payload
     }
     
 }
export async function getPlaceReservations( id){
    var payload = null;
    try{
        let response = await fetch(`${get_Place_reservations_url}/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
             },
         });
        payload = await response.json();
        console.log(payload);
     }catch(e){
         console.log( e);
     }
     return {
         type:"place_reservations",
         payload
     }
     
 }
 export async function addReservation (token, id , reservation){
console.log("..............................");
    var payload=null;
     try{
         await axios.post(`${url}/${id}`,reservation,{
            headers: {
            Authorization: 'Bearer ' + token,
            "Content-Type": "application/json",
                 },
             })
         .then(res => {
           console.log(res);
           console.log(res.data);
           payload ="success";
         })
         .catch(err=>{payload="fail"})
         
         
     }catch(e){
         console.log("erorrrrrrrrrr");
     }
     return {
         type:"add_reservation",
         payload
     }
     
 }
 

//  export async function getPlaceById(id){
//     var payload=null;
//      try{
//          let response = await fetch(`${Url}/${id}`);
//          payload = await response.json();
//          console.log("id", id , " " , payload);
         
//      }catch(e){
//          console.log(e);
//      }
//      return {
//          type:"PlaceDetails",
//          payload
//      }
     
//  }

//  export async function addClient (student){
     
//     var payload=null;
//      try{
//          await axios.post(Url,  student )
//          .then(res => {
//            console.log(res);
//            console.log(res.data);
//            payload ="success";
//          }).catch(err=>{
//              console.log(err);
//              payload="fail"})
         
//      }catch(e){
//          console.log("erorrrrrrrrrr");
//      }
//      return {
//          type:"addClient",
//          payload
//      }
     
//  }
