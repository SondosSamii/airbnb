import axios from "axios";
 
const baseUrl = "http://localhost:1337/api/reservations";
const Url = "http://localhost:1337/api/reservation";

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
