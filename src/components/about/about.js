import React, {Component} from "react";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./about.css";
import { FaFacebook } from "react-icons/fa";
import  {AiFillInstagram} from "react-icons/ai";
import  {AiFillTwitterCircle} from "react-icons/ai";
import  {FcGoogle} from "react-icons/fc";
import  {RiLinkedinBoxFill} from "react-icons/ri";

export default class About extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1900
        };
        return (
            <section id="about"
                style={{
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Slider {...settings}>
                    <div className="slideshow-bg about-bg1"></div>
                    <div className="slideshow-bg about-bg2"></div>
                    <div className="slideshow-bg about-bg3"></div>
                </Slider>
                <div className="icons">
                    

                <div class="row banner">
         <div class="banner-text">
            <h1 class="responsive-headline">AirBnb</h1>
            <h3>I'm a Manila based <span>graphic designer</span>, <span>illustrator</span> and <span>webdesigner</span> creating awesome and
            effective visual identities for companies of all sizes around the globe. Let's <a class="smoothscroll" href="#about">start scrolling</a>
            and learn more <a class="smoothscroll" href="#about">about me</a>.</h3>
            <hr />
            <div class="social">
                <div class="d1">
               <a href="#"><FaFacebook class="f"/></a>
               </div>
               <hr />
               <div class="d1">
               <a href="#"><AiFillTwitterCircle/></a>
               </div>
               <hr />
               <div class="d1">
               <a href="#"><FcGoogle/></a>
               </div>
               <hr />
               <div class="d1">
               <a href="#"><RiLinkedinBoxFill/></a>
               </div>
               <hr />
               <div class="d1">
               <a href="#"><AiFillInstagram/></a>
               </div>
              
            </div>
         </div>
      </div>

                </div>
                
               
            </section>
        );
    }
}
