import {NavLink as Link} from 'react-router-dom';
import {SiGithub, SiFacebook, SiTwitter, SiInstagram} from "react-icons/si";

const Footer = () => {
    return (
        <footer style={{
            overflow: 'hidden'
        }}>
            <div className="bg-dark py-4">
                <div className="row justify-content-around align-items-center">
                    <div>
                        <Link to="/about-us" className="nav-link">About Us</Link>
                        <Link to="/contact-us" className="nav-link">Contact Us</Link>
                        <Link to="/team" className="nav-link">Our Team</Link>
                        <Link to="/terms" className="nav-link text-center">Terms and Conditions</Link>
                    </div>
                    <div>
                        <a
                            href="https://github.com/SondosSamii/airbnb"
                            className="text-white h4"
                            target="_blank"
                            rel="noreferrer">
                            Powered By&nbsp;<SiGithub/>
                        </a>
                        <p className="text-white mt-3">
                            <a
                                href="https://github.com/SondosSamii/airbnb"
                                className="text-white h4"
                                target="_blank"
                                rel="noreferrer">
                                <SiFacebook/>
                            </a>
                            <a
                                href="https://github.com/SondosSamii/airbnb"
                                className="text-white h4 mx-3"
                                target="_blank"
                                rel="noreferrer">
                                <SiTwitter/>
                            </a>
                            <a
                                href="https://github.com/SondosSamii/airbnb"
                                className="text-white h4"
                                target="_blank"
                                rel="noreferrer">
                                <SiInstagram/>
                            </a>
                        </p>
                    </div>
                </div>
                <p className="text-white text-center mb-0">
                    All Rights Reserved &copy; {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    )
}

export default Footer;