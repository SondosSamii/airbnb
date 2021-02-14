import React, { Component } from "react";
import "./form.css";
import Signup from "./Signup";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { login } from "../../actions/clients";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Joi, { validate } from "joi-browser";
 import {SessionContext ,setSessionCookie,getSessionCookie} from '../session';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.checked = React.createRef();
    this.addActiveClass = this.addActiveClass.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  //static contextType = SessionContext;
  state = {
    //login state
    Email: "",
    Password: "",
    errors: {},
    token: "",
    isAuth: false,
    user_id: "",
    isChecked:false
  };
  async componentDidMount(){
    if(localStorage.checked==="true"){
      await this.setState({Email:localStorage.email,
        Password:localStorage.password,
        isChecked:localStorage.checked});
        // console.log(localStorage)
        console.log("here true")
    }else{
      await this.setState({Email:"",
        Password:"",
        isChecked:false});
        console.log("here false")
    }
    
  }
  schema = {
    Email: Joi.string().required().email(),
    Password: Joi.string().required(),
  };
  //data = {};
  //   async componentDidMount() {
  //     this.data = await axios.get("http://localhost:3000/clients/");
  //     //const SessionContext = this.context;
  //   }
  ///start login form functions
  handelchange = (e) => {
    this.state.errors[e.currentTarget.name] = null;
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };

  Validations = () => {
    const errors = {};
    let state = { ...this.state };
    delete state.errors;
    delete state.isAuth;
    delete state.token;
    delete state.user_id;
    delete state.isChecked;
    var res = Joi.validate(state, this.schema, { abortEarly: false });
    if (res.error === null) {
      this.setState({ errors: {} });
      return null;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    console.log(res.error.details);
    this.setState({ errors: errors });
    console.log(this.state.errors.Password);
  };
  //  LoginValidations(){
  //     console.log(this.data.data);
  //     for(const data of this.data.data){
  //         if(this.state.Email==data.email ){
  //             var validEmail= true;
  //             if(this.state.Password==data.password ){
  //                 var validPass= true;
  //             }
  //         }
  //     }
  //     if(validEmail){
  //         if(validPass){
  //             return true;
  //         }
  //         else{
  //             this.setState({errors:{Password:"The Password is not correct!"}})
  //         }

  //     }
  //     else{
  //         this.setState({errors:{Email:"This Email is not exists!"}})
  //     }
  // }

  handleInputChange=async e=> {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const targetname = target.name;
    let state={...this.state};
    state[targetname]=value;
    await this.setState(state);
    console.log(state)
    console.log(value)
  }

  handelLogin = async (e) => {
    e.preventDefault();

    const errors = this.Validations();
    // const valid=this.LoginValidations();
    if (errors !== null) return;
    var formData = new FormData();
    formData.append("email", this.state.Email);
    formData.append("password", this.state.Password);
    console.log(this.state.Email);
    let url = "http://localhost:8080/api/login";
    await this.props.login(formData,url);
    console.log("login data",this.props.client)

    if(this.props.client.message === "A user with this email could not be found.") {
      window.alert("A user with this email could not be found.");
    }
    else if(this.props.client.message === "Wrong password!") {
      window.alert("Wrong password!");
    }
    else {
      await localStorage.setItem("token", this.props.client.token);
      await localStorage.setItem("user_id", this.props.client.user_id);  
    }
    if(this.state.isChecked==="true"){
      await localStorage.setItem("email", this.state.Email);
      await localStorage.setItem("password", this.state.Password);
      await localStorage.setItem("checked", this.state.isChecked);
    }else{
      await localStorage.removeItem("email");
      await localStorage.removeItem("password");
      await localStorage.removeItem("checked");
    }
    if(this.props.client.token){
      this.setState({
        isAuth: true,
        token: this.props.client.token,
        user_id: this.props.client.user_id,
        
      })
      console.log(this.state);
      this.props.history.push("/");
      // <Redirect push to="/"/>
    }


    // fetch("http://localhost:8080/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: this.state.Email,
    //     password: this.state.Password,
    //   }),
    // })
    //   .then((response) => {
    //     if (response.statusText === "created") {
    //       this.props.handleSuccessfulAuth(response.data);
    //     }
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log("response: ", response);
    //     console.log("token: ", response.token);
    //     this.setState({
    //       isAuth: true,
    //       token: response.token,
    //       user_id: response.user_id,
    //     });
    //     localStorage.setItem("token", response.token);
    //     localStorage.setItem("user_id", response.user_id);
    //     // const remainingMilliseconds = 60 * 60 * 1000;
    //     // const expiryDate = new Date(
    //     //   new Date().getTime() + remainingMilliseconds
    //     // );
    //     // localStorage.setItem("expiryDate", expiryDate.toISOString());
    //     // this.setAutoLogout(remainingMilliseconds);
    //   })
    //   .catch((error) => {
    //     console.log("login error", error);
    //   });
    // var email=this.state.Email;
    // setSessionCookie({ email });
  };

 

  addActiveClass(i) {
    var li1 = document.getElementById("li1");
    var li2 = document.getElementById("li2");
    var a1 = document.getElementById("a1");
    var a2 = document.getElementById("a2");
    var signin = document.getElementById("signin");
    var signup = document.getElementById("signup");
    if (i === "1") {
      li1.classList.add("active");
      a1.classList.add("active-text");
      li2.classList.remove("active");
      a2.classList.remove("active-text");
      signin.classList.remove("d-none");
      signup.classList.add("d-none");
    } else if (i === "2") {
      li1.classList.remove("active");
      a1.classList.remove("active-text");
      li2.classList.add("active");
      a2.classList.add("active-text");
      signin.classList.add("d-none");
      signup.classList.remove("d-none");
    }
  }
  render() {
    return (
      <section
        id="login_form"
        className="background"
        style={{ backgroundImage: "url(/bg.jpg)" }}
      >
        <div className="background p-3">
          <div className="pt-4">
            <div
              className="buttons-container mx-auto mt-5"
              style={{ width: "220px" }}
            >
              <ul>
                <li
                  onClick={() => this.addActiveClass("1")}
                  id="li1"
                  className="active"
                >
                  <a id="a1" className="active-text">
                    <FiLogIn />
                  </a>
                </li>

                <li onClick={() => this.addActiveClass("2")} id="li2">
                  <a id="a2">
                    <FaUserPlus />{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div id="signin" className="container signinClass">
            <div className="row">
              <div className="col-sm-9 col-md-6 col-lg-4 mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center mt-0">
                      Welcome back!
                    </h5>
                    <form
                      onSubmit={this.handelLogin}
                      className="form-signin"
                      method="POST"
                    >
                      <div className="form-label-group">
                        <input
                          name="Email"
                          value={this.state.Email}
                          onChange={this.handelchange}
                          type="email"
                          className="form-control"
                          placeholder="Email address"
                        />
                        {this.state.errors.Email && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.Email}
                          </div>
                        )}
                      </div>

                      <div className="form-label-group">
                        <input
                          name="Password"
                          value={this.state.Password}
                          onChange={this.handelchange}
                          type="password"
                          className="form-control"
                          placeholder="Password"
                        />
                        {this.state.errors.Password && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.Password}
                          </div>
                        )}
                      </div>
                      <div className="custom-control custom-checkbox text-center mt-2 mb-2">
                        <input
                        name="isChecked"
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                          checked={this.state.isChecked}
                          onChange={this.handleInputChange}

                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember Me
                        </label>
                      </div>

                      <button
                        className="mybtn btn-lg btn-block text-uppercase submit-button"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="signup" className="container d-none signupClass">
            <Signup history={this.props.history} />
          </div>
        </div>
      </section>
    );
  }
}
const mapactiontoprops = (disptch) => {
  return bindActionCreators(
    {
      login
    },
    disptch
  );
};
const mapstatetoprops = (state) => {
  return {
    client: state.Clients    
  };
}
export default connect(mapstatetoprops, mapactiontoprops) (Login);
