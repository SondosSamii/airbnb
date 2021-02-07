import axios from "axios";
 
// const baseUrl = "http://localhost:1337/api/wishlists";
// const Url = "http://localhost:1337/api/wishlist";

const baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/wishlists";

// const baseUrl = "http://localhost:4200/students";

export async function getAllWishlists(){
    var payload = null;
    try{
        let response = await fetch(`${baseUrl}`);
        payload = await response.json();
        console.log(payload);
     }catch(e){
         console.log( e);
     }
     return {
         type:"AllWishlists",
         payload
     }
     
 }
 




 export async function getWishlistsByUserId(id){
    var payload=null;
     try{
        //  let response = await fetch(`${baseUrl}/${id}`);
         let response = await fetch(`${baseUrl}?user_id=${id}`);
         payload = await response.json();
         console.log("id", id , " " , payload);
         
     }catch(e){
         console.log(e);
     }
     return {
         type:"WishlistDetails",
         payload
     }
     
 }
export async function deleteByID (id){

   var payload=null;
    try{
        await axios.delete(`${baseUrl}/${id}`)
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
        type:"deleteByID",
        payload
    }
    
}
export async function addWishlist (wishlist){

    var payload=null;
     try{
         await axios.post(baseUrl,  wishlist )
         .then(res => {
           console.log(res);
           console.log(res.data);
           payload ="success";
         }).catch(err=>{payload="fail"})
         
     }catch(e){
         console.log("erorrrrrrrrrr");
     }
     return {
         type:"addWishlist",
         payload
     }
     
 }
 