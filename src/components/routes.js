import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { getSessionCookie, SessionContext } from "./session";

import Navbar from './navbar';
import Home from './home/home';
import Profile from './profile/profile';
import Search from './search/search';
import About from './about/about'; 
import Host from './Forms/host'
import Login from './Forms/login'
import OurTeam from './Team/our-team';
import Reservastion from './reservations/reservationForm';
import NotFound from './not-found';
import Footer from './footer';
import CalenderComp from './calender';


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
                    <Route path="/search" component={Search}></Route>
                    <Route path="/profile" component={Profile}></Route>
                    <Route path="/team" component={OurTeam}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/reservation" component={Reservastion}></Route>
                    <Route path="/host" component={Host}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/calender" component={CalenderComp}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
                <Footer/>
            </Router>
        </SessionContext.Provider>
    )
}
export default Routes;