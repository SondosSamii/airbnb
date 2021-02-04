import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './navbar';
import Home from './home/home';
import Search from './search/search';
import About from './about/about'; 
import OurTeam from './our-team';
import NotFound from './not-found';
import Footer from './footer';

const Routes = ()=> {
    return(
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/search" component={Search}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/team" component={OurTeam}></Route>
                <Route path="*" component={NotFound}></Route>
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Routes;