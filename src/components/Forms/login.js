import React, { Component }  from 'react';
// import React, {useContext, Component,  createRef }  from 'react';
import './form.css';
import Signup from './Signup';
import { FiLogIn } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import { event } from 'jquery';
import Joi, { validate } from 'joi-browser';
import axios from "axios";
import { setSessionCookie } from '../session'
// import {SessionContext ,setSessionCookie,getSessionCookie} from '../session'

class Login extends Component {
    constructor(props) {

        super(props);
        this.addActiveClass= this.addActiveClass.bind(this);

      }
      //static contextType = SessionContext;
    state={
        //login state
        Email:"",
        Password:"",
        errors:{}
    };
    schema={
        Email: Joi.string().required().email(),
        Password:Joi.string().required()
    };
    data={};
    async componentDidMount(){
        this.data=await axios.get("http://localhost:3000/clients/");
        //const SessionContext = this.context;
    }
    ///start login form functions
    handelchange=e=>{
        this.state.errors[e.currentTarget.name]=null;
        let state={...this.state};
        state[e.currentTarget.name]=e.currentTarget.value;
        this.setState(state)
    }
    
    Validations = () =>{
        const errors=  {};
        let state={...this.state};
        delete state.errors;
        var res=Joi.validate(state,this.schema,{abortEarly:false});
        if(res.error === null){
            this.setState({errors:{}});
            return null};
        for (const error of res.error.details){
            errors[error.path]=error.message;
        }
        console.log(res.error.details)
        console.log(state)
        this.setState({errors:errors})
        console.log(this.state.errors.Password);
    }
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
    handelLogin=async e=>{
        e.preventDefault();
        
        const errors= this.Validations();
        // const valid=this.LoginValidations();
        if(errors) return;
        // if(!valid)return;
        var formData = new FormData();
            formData.append("email", this.state.Email);
            formData.append("password",  this.state.Password);

            let url = "http://localhost:3001/users/";
            let method = "POST";
            fetch(url, {
                method: method,
                body: formData,
                headers: {
                  Authorization: "Bearer " + this.props.token,
                },
              }).then(response => {
                    if (response.statusText === "created") {
                    this.props.handleSuccessfulAuth(response.data);
                    }
                })
                .catch(error => {
                    console.log("registration error", error);
                });
        // var email=this.state.Email;
        // setSessionCookie({ email });
        // this.props.history.push("/");   
    }
    


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
            signin.classList.remove('d-none');
            signup.classList.add('d-none');
        } else if(i === "2"){
            li1.classList.remove("active");
            a1.classList.remove("active-text");
            li2.classList.add("active");
            a2.classList.add("active-text");
            signin.classList.add('d-none');
            signup.classList.remove('d-none');
        }
    }
    render() { 
        return ( 
            <section id="login_form"
                className="background"
                style={{backgroundImage: "url(/bg.jpg)"}}>
                <div className="background p-3" >
                    <div className="pt-4">
                        <div className="buttons-container mx-auto mt-5" style={{width:"220px"}}>
                        <ul>
                        <li  onClick={() => this.addActiveClass("1")} id="li1" className="active"><a id="a1" className="active-text"><FiLogIn /></a></li>

                        <li onClick={() => this.addActiveClass("2")} id="li2"><a id="a2" ><FaUserPlus /> </a></li>

                        </ul>
                    </div>
                </div>


                    <div id="signin" className="container signinClass">
                    <div className="row">
                    <div className="col-sm-9 col-md-6 col-lg-4 mx-auto">
                        <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center mt-0">Welcome back!</h5>
                            <form onSubmit={this.handelLogin} className="form-signin"  method="POST">
                            <div className="form-label-group">
                                <input name="Email" value={this.state.Email} onChange={this.handelchange} type="email" className="form-control" placeholder="Email address"  />
                                {this.state.errors.Email && ( <div className="alert alert-danger form-control">{this.state.errors.Email}</div> )}
                            </div>

                            <div className="form-label-group">
                                <input name="Password" value={this.state.Password} onChange={this.handelchange} type="password" className="form-control" placeholder="Password"  />
                                {this.state.errors.Password && ( <div className="alert alert-danger form-control">{this.state.errors.Password}</div> )}
                            </div>
                            <div className="custom-control custom-checkbox text-center mt-2 mb-2">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label>
                            </div>
                            <div className="text-center mb-4 text-link">
                                <a href="#">Forget password</a>
                            </div>
                            
                            <button className="mybtn btn-lg btn-block text-uppercase submit-button" type="submit">Sign in</button>

                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                
                    <div id="signup" className="container d-none signupClass">
                        <Signup history={this.props.history}/>
                    </div>
                </div>
            </section>
         );
    }
}

export default Login;