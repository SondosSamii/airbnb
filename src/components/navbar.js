import {NavLink as Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{
            position: 'absolute',
            top: 0,
            left: '3%',
            right: '3%',
            zIndex: 9
        }}>
            <Link to="/" className="navbar-brand">
                <img src="logo192.png" width="30" height="30" alt=""/>
                Airbnb</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/addPlace" className="nav-link">+ Add Place</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link btn main-btn">Log In</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;