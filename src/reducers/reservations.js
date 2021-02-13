function Reservations(state = {} , action) {
    // console.log("............" , action);
    switch(action.type){
        case "AllReservations": {
            // console.log("llllllyyyyyyyyyylll")
            return action.payload;
        }
        
        case "reservationDetails": {
            // console.log("llllllyyyyyyyyyylll")
            return {...state,reservation_details:action.payload}
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