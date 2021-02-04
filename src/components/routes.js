import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import { getSessionCookie, SessionContext } from "./session";

import Home from './home';
import Host from '../components/Forms/host'
import Login from '../components/Forms/login'
import PlaceD from '../components/PlaceDetails/placeDetails'
const Routes = ()=> {
    const history = createBrowserHistory();
    const [session, setSession] = useState(getSessionCookie());
    useEffect(
        () => {
            const cookie = getSessionCookie();
            console.log(cookie);
            console.log(session);
            if(cookie.email !== session.email) {
            setSession(getSessionCookie());} 
    },
    [session]
  );
    return(
        <SessionContext.Provider value={session}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/host" component={Host}></Route>
                <Route exact path="/login" component={Login}></Route>
            </Switch>
        </Router>
        </SessionContext.Provider>
    )
}
export default Routes;