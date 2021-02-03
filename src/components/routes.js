import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './home/home';
import NotFound from './not-found';
import About from './about/about'; 

const Routes = ()=> {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </Router>
    )
}

export default Routes;