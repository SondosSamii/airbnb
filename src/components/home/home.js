import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import { getAllPlaces } from "../../actions";

import Slideshow from "./slideshow";
import Places from "./places";
import Cards from "./places-cards";

class Home extends Component {
    componentDidMount(){
        // window.location.reload();
    }
    render() {
        document.title = "Home";
        return (
        <section id="home">
            <Slideshow/>
            <div className="container">
                <div className="my-5">
                    <h2 className="text-center mb-4">Our Places</h2>
                    <Places/>
                </div>
                <div className="my-5">
                    <h2 className="text-center mb-0">Explore Our Highlights</h2>
                    <div className="row justify-content-center">
                        <Cards places={this.props.places}/>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({
        getAllPlaces
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        places: state.Places
    };
};

export default connect(mapStateToProps, mapActionToProps)(Home);