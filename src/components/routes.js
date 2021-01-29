import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './home';

const Routes = ()=> {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
            </Switch>
        </Router>
    )
}

export default Routes;