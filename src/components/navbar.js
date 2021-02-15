import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { BsFillPersonFill } from "react-icons/bs";

function LoginButton(props) {
    console.log("LoginButton");
    return (
        // <button className="btn main-btn" onClick={props.onClick}>
        //     Login
        // </button>

      <Link to="/login" className="nav-link btn main-btn" onClick={props.onClick}>
        Login
      </Link>
    );
  }
  
function LogoutButton(props) {
    console.log("LogoutButton");
    return (
        // <button className="btn main-btn" onClick={props.onClick}>
        //     Logout
        // </button>

    <Link to="/" className="nav-link btn main-btn" onClick={props.onClick}>
      Logout
    </Link>
  );
}


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnValue: "Log In",
            path: "", 
            isAuth : false,
            login:false
        }
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }
    componentDidMount() {
        if(localStorage.getItem("token")){
            console.log("///////////////////////////////////");
            this.setState({
                isAuth : true,
                login: true,
                // btnValue: "Log Out",
                path: "/"
            });
        }
        else {
            console.log(".............................................");
            this.setState({
                isAuth : false,
                login: false,
                // btnValue: "Log In",
                path: "/login"
            })
        }

        // this.handleClick(this.state.btnValue);
    }

    // componentDidUpdate() {
    //     console.log("******", this.state.btnValue);
    // }

    handleLoginClick() {
        console.log("***handleLoginClick***");
        this.setState({isAuth: true});
        // if(localStorage.getItem("token")) {
        //     window.location.reload();
        // }
    }
    
    handleLogoutClick() {
        console.log("===handleLogoutClick===");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        this.setState({isAuth: false});
    }

    handleClick(val) {
        // if (val === "Log In" && this.state.isAuth) {
        if (val === "Log In") {
            console.log("ifffffff");
            this.setState({btnValue: "Log Out"});
            // this.props.history.push("/login");
        } else {
            console.log("elseeeeee");
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            this.setState({btnValue: "Log In"});
            // this.props.history.push("/team");
        }
    }

    // forceUpdateHandler(){
    //     this.forceUpdate();
    // };

    render() { 
        let isAuth = false;
        if(localStorage.getItem("token")) {
            console.log("render ifffff");
            isAuth = true;
            // this.setState({isAuth: true});
        } else {
            console.log("render elseeee");
            isAuth = false;
            // this.setState({isAuth: false});
        }
        // const isAuth = this.state.isAuth;
        let button;
        if (isAuth) {
          button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
          button = <LoginButton onClick={this.handleLoginClick} />;
        }
        return (
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9,
                    backgroundColor: 'rgba(99, 99, 99, 0.5)'
            }}>
                <nav className="navbar navbar-expand-lg navbar-light mx-0 mx-md-5 py-0">
                    <Link to="/" className="navbar-brand">
                        <img
                            // src="/images/Logo/Logo-Icon-2.png"
                            src="/images/Logo/Logo_where-to-3.png"
                            // width="60"
                            height="60"
                            alt="Logo"
                            style={{
                            marginRight: '0.5em'
                        }}/>
                        </Link>
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
                                <Link to="/host" className="nav-link">Add Place</Link>
                            </li>
                           
                            
                                {/* {button} */}

                                {isAuth ? (
                                      <li className="nav-item">
                                      {/* <Link to="" className="nav-link btn main-btn"onClick={()=>{ */}
                                      <LogoutButton onClick={this.handleLogoutClick} />
                                  </li>
                                ):(
                                    <li className="nav-item">
                                    {/* <Link to="/login" className="nav-link btn main-btn" */}
                                    <LoginButton onClick={this.handleLoginClick} />
                                </li>

                                )}
                                {/* {!isAuth &&   
                                } */}

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