function Wishlists(state = null , action) {
    // console.log("............" , action);
    switch(action.type){
        case "AllWishlists": {
            // console.log("llllllyyyyyyyyyylll")
            return action.payload;
        }

        case "WishlistDetails": {
            // console.log("lllllllllllllllllllllllllllllll")
            return action.payload;
        }
        case "deleteByID" :{
            console.log("lllllllllllllllllllllllllllllll");
            return action.payload;
        }
        case "addWishlist" :{
            console.log("lllllllllllllllllllllllllllllll");
            return action.payload;
        }
        default:{
            return state;
        }

    }
}
export default Wishlists;