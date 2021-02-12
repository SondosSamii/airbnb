// import axios from "axios";
 
// const baseUrl = "http://localhost:1337/api/places";
const url = "http://localhost:8080/api/place";

const baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/places";

// const baseUrl = "http://localhost:8080/api/allPlaces";

// const allPlacesUrl = "https://node-airbnb.herokuapp.com/api/allPlaces";

const allPlacesUrl = "http://localhost:8080/api/allPlaces";

export async function getAllPlaces(){
    let payload = null;
    try{
        let response = await fetch(`${allPlacesUrl}`);
        // let response = await fetch(`${baseUrl}`);
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


export async function getPlaceById (id){
    let payload=null;
     try{
         let response = await fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
             },
         });
         payload = await response.json();
        //   console.log("id", id , " " , payload);
         
     }catch(e){
         console.log("errrrroooooooooooorrrrrrr",id , e);
     }
     return {
         type:"Place_Details",
         payload
     }
     
}

export async function getPlaceByID (id){
    let payload=null;
     try{
         let response = await fetch(`${baseUrl}/${id}`);
         payload = await response.json();
          console.log("id", id , " " , payload);
         
     }catch(e){
         console.log("errrrroooooooooooorrrrrrr",id , e);
     }
     return {
         type:"PlaceDetails",
         payload
     }
     
}

//  export async function addClient (student){
     
//     let payload=null;
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
