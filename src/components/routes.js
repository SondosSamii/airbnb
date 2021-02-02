import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './home/home';
import SearchBar from './home/searchbar';
import NotFound from './not-found';
import Search from './search/search';

const Routes = ()=> {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/search/" component={Search}></Route>
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </Router>
    )
}

export default Routes;