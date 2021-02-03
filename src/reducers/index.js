import { combineReducers } from "redux";
import Places from "./places";
import Wishlists from "./wishlists";
import Reservations from "./reservations";
import Clients from "./clients";


export default combineReducers({
    Places,
    Wishlists,
    Reservations,
    Clients

})