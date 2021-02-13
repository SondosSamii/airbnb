function Wishlists(state = {} , action) {
    // console.log("............" , action);
    switch(action.type){
        case "AllWishlists": {
            // console.log("llllllyyyyyyyyyylll")
            return action.payload;
        }

        case "WishlistDetails": {
            // console.log("lllllllllllllllllllllllllllllll")
            return {...state,wishlist_details:action.payload}
        }
        
        case "deleteByIDwithtoken" :{
            // console.log("lllllllllllllllllllllllllllllll");
            return action.payload;
        }
        case "deleteByID" :{
            // console.log("lllllllllllllllllllllllllllllll");
            return action.payload;
        }
        case "addWishlist" :{
            // console.log("lllllllllllllllllllllllllllllll" , action.payload);
            return {...state, addWishlist : action.payload}
        }
        case "Wishlist_By_user": {
            // console.log("/////////////" , action.payload);
            return {...state, wishlistsByUserId : action.payload}
        }
        default:{
            return state;
        }

    }
}
export default Wishlists;