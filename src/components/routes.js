import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { getSessionCookie, SessionContext } from "./session";

import Navbar from './navbar';
import Home from './home/home';
import Profile from "./profile/profile";
import About from './about/about'; 
import Host from './Forms/host'
import Login from './Forms/login'
import OurTeam from './Team/our-team';
import NotFound from './not-found';
import Footer from './footer';

const Routes = ()=> {
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
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/profile" component={Profile}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/team" component={OurTeam}></Route>
                    <Route path="/host" component={Host}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
                <Footer/>
            </Router>
        </SessionContext.Provider>
    )
}
export default Routes;