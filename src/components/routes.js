import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './navbar';
import Home from './home/home';
import About from './about/about'; 
import Profile from "./profile/profile";
import Reservastion from './reservations/reservationForm';
import NotFound from './not-found';
import Footer from './footer';

const Routes = ()=> {
    return(
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/reservation" component={Reservastion}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="*" component={NotFound}></Route>
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Routes;