function Reservations(state = null , action) {
    // console.log("............" , action);
    switch(action.type){
        case "AllReservations": {
            // console.log("llllllyyyyyyyyyylll")
            return action.payload;
        }
        
        case "reservationDetails": {
            // console.log("llllllyyyyyyyyyylll")
            return action.payload;
        }
        default:{
            return state;
        }

    }
}
export default Reservations;