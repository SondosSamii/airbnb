function Reservations(state = {} , action) {
    // console.log("............" , action);
    switch(action.type){
        case "AllReservations": {
            // console.log("llllllyyyyyyyyyylll")
            return action.payload;
        }
        case "place_reservations": {
            // console.log("llllllyyyyyyyyyylll")
            return  {...state,place_reservations:action.payload}
        }
        
        case "reservationDetails": {
            // console.log("llllllyyyyyyyyyylll")
            return {...state,reservation_details:action.payload}
        }
        case "reservationDetails_Not_auth": {
            console.log("llllllyyyyyyyyyylll" , action.payload)
            return {...state,reservation_details_Not_Auth:action.payload}
        }
        case "add_reservation": {
            // console.log("llllllyyyyyyyyyylll")
            return {...state,message:action.payload}
        }
        
        default:{
            return state;
        }

    }
}
export default Reservations;