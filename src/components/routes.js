import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Profile from "./profile/profile";
import Home from './home/home';
import NotFound from './not-found';


const Routes = ()=> {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/profile" component={Profile}></Route>
               
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </Router>
    )
}

export default Routes;