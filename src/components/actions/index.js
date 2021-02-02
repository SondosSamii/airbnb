import axios from "axios";
 
// const baseUrl = "http://localhost:1337/api/places";
const baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/places";
const Url = "http://localhost:1337/api/place";
// const baseUrl = "http://localhost:4200/students";

export async function getAllPlaces(){
    var payload = null;
    try{
        let response = await fetch(`${baseUrl}`);
        payload = await response.json();
        console.log(payload);
     }catch(e){
         console.log( e);
     }
     return {
         type:"AllPlaces",
         payload
     }
     
 }
 export const getLocation = () => {
    const geolocation = navigator.geolocation;

    const location = new Promise((resolve, reject) => {
        if (!geolocation) {
            reject(new Error('Not Supported'));
        }

    geolocation.getCurrentPosition((position) => {
        resolve(position);
    }, () => {
        reject (new Error('Permission denied'));
    });
  });

  return {
      type: "Location",
      payload: location
  }
};
 function location(){
     var latt = null , long = null
     var pos = null;
    navigator.geolocation.getCurrentPosition(position =>{
        console.log(position.coords.latitude ,  position.coords.longitude);
            latt = position.coords.latitude
            long = position.coords.latitude
            pos = position;
        });
        return pos;
 }
// export async function getlocation(){
//     console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
//     var payload = null;
//     try{
//       var long =null , latt =null;
//         var position =  await location();
//                 await console.log("how: " , position);
//             //     var pos = {
//             //       lat: latt,
//             //       lon: long
//             //   }
//             //     payload = pos;
//             //     console.log("hereeeeeee:  ", payload);
//             }catch(e){
//          console.log("niiiiiiiiiiiiii" , e);
//      }
//      return {
//          type:"CurrentLocation",
//          payload
//      }
     
//  }

 export async function getPlaceById (id){

    var payload=null;
     try{
         let response = await fetch(`${baseUrl}/${id}`);
         payload = await response.json();
         console.log("id", id , " " , payload);
         
     }catch(e){
         console.log(e);
     }
     return {
         type:"PlaceDetails",
         payload
     }
     
 }

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