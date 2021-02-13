function Places(state = {} , action) {
    // console.log("............" , action);
    switch(action.type){
        case "AllPlaces": {
            // console.log("llllllyyyyyyyyyylll")
            return action.payload;
        }
        case "Location": {
            console.log("ooooooooooooooo" );
            console.log(action.payload.coords.latitude );
            var position = {
                lat:action.payload.coords.latitude,
                lng:action.payload.coords.longitude,
            }
            return position;
                // ...state,
                // location: {
                //     latitude: action.location.coords.latitude,
                //     longitude: action.location.coords.latitude,
                // }
            
        }
        case "PlaceDetails": {
            // console.log("lllllllllllllllllllllllllllllll" , action.payload);
            return action.payload;
        }
        case "Place_Details": {
            console.log("lllllllllllllllllllllllllllllll" , action.payload);
            return {...state,place_details:action.payload}
        }
        case "addplace": {
             console.log("addplace" , action.payload);
            return action.payload;
        }
        case "updatePlace":{
            console.log("updatePlace" , action.payload);
            return action.payload;
        }
        
        default:{
            return state;
        }
    }
}
export default Places;