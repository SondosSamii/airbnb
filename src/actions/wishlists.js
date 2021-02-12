import axios from "axios";
 
// const baseUrl = "http://localhost:1337/api/wishlists";
const url = "http://localhost:8080/api/wishlist";

const deleteByID_url = "http://localhost:8080/api/wishlist";

const getById_url = "http://localhost:8080/api/wishlist"
// const Url = "http://localhost:1337/api/wishlist";

const baseUrl = "http://my-json-server.typicode.com/sondossamii/airbnb/wishlists";

const wishlistsUrl = "http://localhost:8080/api/wishlists";
// const wishlistsUrl = "https://node-airbnb.herokuapp.com/api/wishlists";

// const baseUrl = " http://localhost:2400/wishlists";

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
export async function getWishlistByID(token,id){
    var payload=null;
    // console.log("kkkkkkklkkkkkkkk");
     try{
        //  let response = await fetch(`${baseUrl}/${id}`);
         let response = await fetch(`${getById_url}/${id}`, {
        method: "GET",
        headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json",
             },
         });
         payload = await response.json();
        //  console.log( " " , payload);
         
     }catch(e){
         console.log(e);
     }
     return {
         type:"WishlistDetails",
         payload
     }
     
}


 export async function getWishlistsByUserId(token){
     console.log("yes");
    var payload=null;
     try{
        //  let response = await fetch(`${baseUrl}/${id}`);
        //  let response = await fetch(`${baseUrl}?user_id=${id}`);
        let response = await fetch(`${wishlistsUrl}`, {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "application/json",
            }
        });
         payload = await response.json();
        //  console.log("getWishlistsByUserId" , payload);
         
     }catch(e){
         console.log(e);
     }
     return {
         type:"Wishlist_By_user",
         payload
     }
     
 }
export async function deleteByID (id){

   var payload=null;
    try{
        await axios.delete(`${url}/${id}`)
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
export async function addWishlist (token, wishlist){
    console.log("here:   ",wishlist)
    var payload=null;
     try{
         await axios.post(url, wishlist, { headers: {
            Authorization: 'Bearer ' + token,
            "Content-Type": "application/json",
                 },
             })
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
 export async function deleteWishlistById (token,id){

    var payload=null;
     try{
         await axios.delete(`${deleteByID_url}/${id}`, {
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
         type:"deleteByIDwithtoken",
         payload
     }
     
 }
 