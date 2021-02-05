import {NavLink as Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <header
            style={{
                position: 'absolute',
                top: 0,
                left: '0',
                right: '0',
                zIndex: 9,
                backgroundColor: 'rgba(99, 99, 99, 0.3)'
        }}>
            <nav className="navbar navbar-expand-lg navbar-light mx-0 mx-md-5">
                <Link to="/" className="navbar-brand">
                    <img
                        src="logo192.png"
                        width="30"
                        height="30"
                        alt="Logo"
                        style={{
                        marginRight: '0.5em'
                    }}/>
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
        </header>
    )
}

export default Navbar;