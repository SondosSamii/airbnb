import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './home/home';
import NotFound from './not-found';
import ProfileEdit from './profile/profileEdit';
import Profile from './profile/profileView';

const Routes = ()=> {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/profile" component={Profile}></Route>
                <Route exact path="/profileEdit" component={ProfileEdit}></Route>
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </Router>
    )
}

export default Routes;