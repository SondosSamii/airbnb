import {NavLink as Link} from "react-router-dom";
import {AiFillHeart, AiOutlineSearch} from "react-icons/ai";

const SearchBar = () => {
    return (
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
                <p className="text-center">Search for your favourite country
                    <AiFillHeart/></p>
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
    )
}

export default SearchBar;