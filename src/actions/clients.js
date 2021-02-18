import axios from "axios";

// const baseUrl = "http://localhost:1337/api/clients";
const url = "https://node-airbnb.herokuapp.com/api/client";
const baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/clients";
const update_pass_url = "https://node-airbnb.herokuapp.com/api/clientPassword"
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
export async function AllClients() {
    var payload = null;
    try {
        let url="https://node-airbnb.herokuapp.com/api/clients"
        const res = await fetch(url);
        payload = await res.json();
        console.log("clients: ", payload);
    } catch (err) {
        console.log(err);
    }
    return {type: "AllClients2", payload}
}

export async function updateClient(token,client){
    var payload=null;
    for(var e of client.entries()){
        console.log(e);
      }
     try{
         console.log("client: ",client);
         await axios.put(`${url}` , client , {
            headers: {
            Authorization: 'Bearer ' + token,
            "Content-Type": "application/json",
                 },
             }
           
          )
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
export async function updatePassword(token,clientPasswords){
    var payload=null;
     try{
        //  console.log("client: ",client);
         await axios.put(`${update_pass_url}` , clientPasswords , {
            headers: {
            Authorization: 'Bearer ' + token,
            "Content-Type": "application/json",
                 },
             }
           
          )
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
         type:"update_password",
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

 export async function addclient (formData,url){
    var payload=null;
     try{
         let response = await fetch(url, {
        method: "POST",
        body: formData
         }
      ).then((response) => {
        payload =  response.json();
        console.log("registration done: ", payload);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
     }catch(error){
         console.log("registration error: ", error);
     }
     return {
         type:"addClient",
         payload
     }
     
 }

 
 export async function login (formData,url){
    var payload=null;
     try{
         let response = await fetch(url, {
        method: "POST",
        body: formData
         }
      ).then((response) => {
        payload =  response.json();
        console.log("login done: ", payload);
      })
      .catch((error) => {
        console.log("login error", error);
      });
     }catch(error){
         console.log("login error: ", error);
     }
     return {
         type:"login",
         payload
     }
     
 }

