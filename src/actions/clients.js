import axios from "axios";

// const baseUrl = "http://localhost:1337/api/clients";
const url = "http://localhost:8080/api/client";
const baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/clients";

// const baseUrl = "http://localhost:4200/students";




export async function getAllClients(){
    console.log("iiiiiiii");
    var payload = null;
    try{
        let response = await fetch(`${baseUrl}`);
        payload = await response.json();
        console.log(payload);
     }catch(e){
         console.log( e);
     }
     return {
         type:"AllClients",
         payload
     }
     
 }
export async function updateClient(client){
    var payload=null;
     try{
         console.log("studentid: ",client);
         await axios.put(`${baseUrl}/${client._id}` , client )
         .then(res => {
           console.log(res);
           console.log(res.data);
           payload ="successUpdated";
         })
         .catch(err=>{payload="fail To update"})      
     }catch(e){
         console.log("erorrrrrrrrrr");
     }
     return {
         type:"update_Client",
         payload
     }
     
 }

 

export async function getclientById (token){
    console.log("toooooooken:   " , token);
    var payload=null;
     try{
         let response = await fetch(`${url}` , {
        method: "GET",
        headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json",
             },
         }
       
      );
         payload = await response.json();
          console.log("loooooooolololooooo:  ", payload);
         
     }catch(e){
         console.log("errrrroooooooooooorrrrrrr", e);
     }
     return {
         type:"clientDetails",
         payload
     }
     
 }