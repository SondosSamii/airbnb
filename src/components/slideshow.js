import React, {Component} from "react";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import { NavLink as Link } from "react-router-dom";
import { AiFillHeart, AiOutlineSearch } from "react-icons/ai";

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
                <div
                    style={{
                    position: 'absolute',
                    top: '30%',
                    left: 0,
                    width: '100%',
                    zIndex: 99
                }}>
                    <div className="w-50 mx-auto">
                        <h1 className="text-center">Hello World!</h1>
                        <p className="text-center">Search for your favourite country <AiFillHeart/></p>
                        <div className="form-group d-flex">
                            <input
                                type="search"
                                name="search"
                                className="form-control"
                                placeholder="Search..."/>
                            <Link to="/search" className="btn main-btn ml-2 px-2">
                                <AiOutlineSearch className="mb-1"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
