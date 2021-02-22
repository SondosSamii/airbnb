import { NavLink as Link } from "react-router-dom";
import { SiGithub, SiFacebook, SiTwitter, SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <footer
      className="bg-dark py-3"
      style={{
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          className="row align-items-center"
          style={{
            justifyContent: "space-around",
          }}
        >
          <div>
            <Link to="/about-us" className="nav-link">
              About Us
            </Link>
            {/* <Link to="/contact-us" className="nav-link">Contact Us</Link> */}
            <Link to="/team" className="nav-link">
              Our Team
            </Link>
            {/* <Link to="/terms" className="nav-link">Terms and Conditions</Link> */}
          </div>
          <div>
            <p className="nav-link h5 text-center m-0 icons">
              Powered By&nbsp;
              <a
                href="https://github.com/SondosSamii/airbnb"
                className="text-white h5 ml-3"
                target="_blank"
                rel="noreferrer"
              >
                <SiGithub />
              </a>
              <a
                href="https://github.com/SondosSamii/airbnb"
                className="text-white h5 ml-3"
                target="_blank"
                rel="noreferrer"
              >
                <SiFacebook />
              </a>
              <a
                href="https://github.com/SondosSamii/airbnb"
                className="text-white h5 ml-3"
                target="_blank"
                rel="noreferrer"
              >
                <SiTwitter />
              </a>
              <a
                href="https://github.com/SondosSamii/airbnb"
                className="text-white h5 ml-3"
                target="_blank"
                rel="noreferrer"
              >
                <SiInstagram />
              </a>
            </p>
            <p className="nav-link text-center small mb-0">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
