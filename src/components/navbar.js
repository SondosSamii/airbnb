import React, { Component } from 'react';
import {NavLink as Link} from 'react-router-dom';
import { BsFillPersonFill } from "react-icons/bs";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isAuth : false,
            login:false
        }
    }
    componentDidMount() {
    if(localStorage.getItem("token")){
        console.log("///////////////////////////////////");
        this.setState({isAuth : true})
        this.setState({login: true});
    }
 else{
     console.log(".............................................");
        this.setState({isAuth : false})
        this.setState({login: false});

    }
    
    }
    

    


    render() { 
        return (
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: '0',
                    right: '0',
                    zIndex: 9,
                    backgroundColor: 'rgba(99, 99, 99, 0.5)'
            }}>
                <nav className="navbar navbar-expand-lg navbar-light mx-0 mx-md-5">
                    <Link to="/" className="navbar-brand">
                        <img
                            src="/logo192.png"
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
                            {/* <li className="nav-item">
                                <Link to="/addPlace" className="nav-link">+ Add Place</Link>
                            </li> */}
                           
                            
                                {
                                    this.state.login ?(
                                        <li className="nav-item">
                                        {/* <button to="/login" className="nav-link btn main-btn" onClick={()=>{
                                            localStorage.removeItem("token");
                                            localStorage.removeItem("user_id");
                                            
                                        }}>Log out</button> */}
                                            {/* <Redirect to="/login" className="nav-link btn main-btn" onClick={()=>{
                                                localStorage.removeItem("token");
                                                localStorage.removeItem("user_id");
                                                // window.location.reload();
                                            }}>Log out</Redirect> */}
                                            <Link to="/login" className="nav-link btn main-btn" onClick={()=>{
                                                localStorage.removeItem("token");
                                                localStorage.removeItem("user_id");
                                                // window.location.reload();
                                               
                                            }}>Out</Link>
                                        </li>
                                    ):(
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link btn main-btn">IN</Link>
                                        </li>
                                    )
                                }
                               {this.state.isAuth &&
                                      <li className="nav-item">
                                      <Link to=""  className="nav-link btn main-btn"onClick={()=>{
                                                localStorage.removeItem("token");
                                                localStorage.removeItem("user_id");
                                                // this.props.history.push("/");
                                                window.location.reload();
                                                // this.forceUpdate();
                                                // this.setState({isAuth: false});
                                            }}>LogOut</Link>
                                  </li>
    
                                }
                                {!this.state.isAuth &&   
                                    <li className="nav-item">
                                    <Link to="/login" className="nav-link btn main-btn" onClick={()=>{
                                                
                                                // this.forceUpdate();
                                                // this.setState({isAuth: true});
                                    }}>Log In</Link>
                                </li>
                                }
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link btn">
                                    <BsFillPersonFill className="user-icon"/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}
    
export default Navbar;

// const Navbar = () => {


//     var login = false;
//     var button = "";
//     if (localStorage.getItem("token")){
//         button = "logout"
//         login =true;
//     }
//     else{
//         button = "login"
//         login =false;
//     }
//     var isAuth = false;
//     var button = "";
//     if (localStorage.getItem("token")){
//         button = "logout"
//         isAuth =true;
//     }
//     else{
//         button = "login"
//         isAuth =false;
//     }
//     return (
//         <header
//             style={{
//                 position: 'fixed',
//                 top: 0,
//                 left: '0',
//                 right: '0',
//                 zIndex: 9,
//                 backgroundColor: 'rgba(99, 99, 99, 0.5)'
//         }}>
//             <nav className="navbar navbar-expand-lg navbar-light mx-0 mx-md-5">
//                 <Link to="/" className="navbar-brand">
//                     <img
//                         src="/logo192.png"
//                         width="30"
//                         height="30"
//                         alt="Logo"
//                         style={{
//                         marginRight: '0.5em'
//                     }}/>
//                     Airbnb</Link>
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-toggle="collapse"
//                     data-target="#navbarSupportedContent"
//                     aria-controls="navbarSupportedContent"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav ml-auto">
//                         <li className="nav-item">
//                             <Link to="/addPlace" className="nav-link">+ Add Place</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/signup" className="nav-link">Sign Up</Link>
//                         </li>
                        
//                             {
//                                 login ?(
//                                     <li className="nav-item">
//                                     {/* <button to="/login" className="nav-link btn main-btn" onClick={()=>{
//                                         localStorage.removeItem("token");
//                                         localStorage.removeItem("user_id");
                                        
//                                     }}>Log out</button> */}
//                                         {/* <Redirect to="/login" className="nav-link btn main-btn" onClick={()=>{
//                                             localStorage.removeItem("token");
//                                             localStorage.removeItem("user_id");
//                                             // window.location.reload();
//                                         }}>Log out</Redirect> */}
//                                         <Link to="/login" className="nav-link btn main-btn" onClick={()=>{
//                                             localStorage.removeItem("token");
//                                             localStorage.removeItem("user_id");
//                                             window.location.reload();
//                                         }}>Out</Link>
//                                     </li>
//                                 ):(
//                                     <li className="nav-item">
//                                         <Link to="/login" className="nav-link btn main-btn">IN</Link>
//                                     </li>
//                                 )
//                             }
//                            {login &&
//                                   <li className="nav-item">
//                                   <Link to="/login" className="nav-link btn main-btn"onClick={()=>{
//                                             localStorage.removeItem("token");
//                                             localStorage.removeItem("user_id");
//                                             // window.location.reload();
//                                         }}>LogOut</Link>
//                               </li>

//                             }
//                             {!login &&   
//                                 <li className="nav-item">
//                                 <Link to="/login" className="nav-link btn main-btn">Log In</Link>
//                             </li>
//                             }
//                         <li className="nav-item">
//                             <Link to="/profile" className="nav-link btn">
//                                 <BsFillPersonFill className="user-icon"/>
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         </header>
//     )
// }