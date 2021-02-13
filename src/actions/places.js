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
        console.log("id", id);
        console.log(payload.place);
         
     }catch(e){
         console.log("errrrroooooooooooorrrrrrr",id , e);
     }
     return {
         type:"Place_Details",
         payload: payload.place
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

export async function addplace (formData,url,token){
    var payload=null;
     try{
         let response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: 'Bearer ' + token
                }
         }
      ).then((response) => {
        return response.json();
        
      }).then((response)=>{
        payload = response;
        console.log("place added: ", payload);
      })
      .catch((error) => {
        console.log("place added error", error);
      });
     }catch(error){
         console.log("place added error: ", error);
     }
     return {
         type:"addplace",
         payload
     }
     
 }

export async function updatePlace (formData,url,token){
    var payload=null;
    console.log(token)
     try{
         let response = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: 'Bearer ' + token
                }
         }
      ).then((response) => {
        return response.json();
        
      }).then((response)=>{
        payload = response;
        console.log("place updated: ", payload);
      })
      .catch((error) => {
        console.log("place updated error", error);
      });
     }catch(error){
         console.log("place updated error: ", error);
     }
     return {
         type:"updatePlace",
         payload
     }
     
 }
