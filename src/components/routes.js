import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Profile from "./profile/profile";

import Navbar from './navbar';
import Home from './home/home';
import NotFound from './not-found';
import Footer from './footer';


const Routes = ()=> {
    return(
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/profile" component={Profile}></Route>
                <Route path="*" component={NotFound}></Route>
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Routes;