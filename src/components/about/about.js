import React, { Component } from "react";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./about.css";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { NavLink as Link } from "react-router-dom";

export default class About extends Component {
  render() {
    document.title = "About Us";
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
    };
    return (
      <section
        id="about"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Slider {...settings}>
          <div className="slideshow-bg about-bg1"></div>
          <div className="slideshow-bg about-bg2"></div>
          <div className="slideshow-bg about-bg3"></div>
        </Slider>
        <div className="icons">
          <div className="row banner">
            <div className="banner-text my-5">
              <h1 className="responsive-headline">Where To ?</h1>
              <h3>
                Experiences are not your typical tour. Whether you’re on a trip,
                exploring your own city, or staying at home, learn something new
                from an expert host. You can learn more&nbsp;
                <Link to="/">about us</Link>
              </h3>
              <div className="social">
                <div className="d1 mt-1">
                  <a href="https://www.facebook.com/">
                    <FaFacebook className="f" />
                  </a>
                </div>
                <div className="d1 mt-1">
                  <a href="https://twitter.com/twitter?lang=ar">
                    <AiFillTwitterCircle />
                  </a>
                </div>
                <div className="d1 mt-1">
                  <a href="https://www.google.com/">
                    <FcGoogle />
                  </a>
                </div>
                <div className="d1 mt-1">
                  <a href="https://www.linkedin.cn/login">
                    <RiLinkedinBoxFill />
                  </a>
                </div>
                <div className="d1 mt-1">
                  <a href="https://www.instagram.com/">
                    <AiFillInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
