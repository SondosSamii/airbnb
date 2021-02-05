function Clients(state = null , action) {
    // console.log("............" , action);
    switch(action.type){
        case "AllClients": {
            // console.log("cliiinenntnntntntn")
            return action.payload;
        }
        case "update_Client":{
            // console.log("cliiinenntnntntntn")
            return action.payload;
        }
        case "clientDetails":{
            console.log("cliiinenntnntntntn")            
            return action.payload;
        }
        default:{
            return state;
        }

    }
}
export default Clients;