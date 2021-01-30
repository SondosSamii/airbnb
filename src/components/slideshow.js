import React, {Component} from "react";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchBar from "./searchbar";

export default class Slideshow extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        };
        return (
            <div style={{
                position: 'relative'
            }}>
                <Slider {...settings}>
                    <div>
                        <img
                            src="images/home-slideshow/pexels-photo-3266523.jpeg"
                            className="img-fluid"
                            alt="Travel 1"/>
                    </div>
                    <div>
                        <img
                            src="images/home-slideshow/pexels-photo-1271619.jpeg"
                            className="img-fluid"
                            alt="Travel 2"/>
                    </div>
                    <div>
                        <img
                            src="images/home-slideshow/pexels-photo-59520.jpeg"
                            className="img-fluid"
                            alt="Travel 3"/>
                    </div>
                    <div>
                        <img
                            src="images/home-slideshow/pexels-photo-2398220.jpeg"
                            className="img-fluid"
                            alt="Travel 4"/>
                    </div>
                </Slider>
                <SearchBar/>
            </div>
        );
    }
}
