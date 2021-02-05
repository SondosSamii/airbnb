function Places(state = null , action) {
    // console.log("............" , action);
    switch(action.type){
        case "AllPlaces": {
            // console.log("llllllyyyyyyyyyylll")
            return action.payload;
        }

        case "PlaceDetails": {
            console.log("lllllllllllllllllllllllllllllll" , action.payload);
            return action.payload;
        }
        default:{
            return state;
        }

    }
}
export default Places;