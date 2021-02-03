import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ViewProfile from "./profile/profile";
import profileEdit from "./profile/profileEdit";
import Home from './home/home';
import NotFound from './not-found';

const Routes = ()=> {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/profile" component={ViewProfile}></Route>
                <Route exact path="/profileEdit" component={profileEdit}></Route>
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </Router>
    )
}

export default Routes;