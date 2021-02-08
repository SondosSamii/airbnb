import React, { Component,  createRef  }  from 'react';
import './form.css';
import { FiLogIn } from 'react-icons/fi';
import { event } from 'jquery';
import Joi from 'joi-browser';
import axios from "axios";
import {setSessionCookie,getSessionCookie} from '../session'

class Signup extends Component {
    constructor(props) {
        super(props);

      }
    state={
        UserName:"",
        Email:"",
        PhoneNumber:"",
        Password:"",
        Password_confirm:"",
        Signup_errors:{},
    }
    ///start login form functions
    handelchange=e=>{
        this.state.Signup_errors[e.currentTarget.name]=null;
        let state={...this.state};
        state[e.currentTarget.name]=e.currentTarget.value;
        this.setState(state)
    }
    
    schema={
        UserName:Joi.string().required().max(15),
        Email: Joi.string().trim().required().email(),
        Password:Joi.string().trim().required().min(5).max(20),
        Password_confirm:Joi.any().equal(Joi.ref('Password')),
        PhoneNumber: Joi.string().trim().required().regex(/^[0-9]{11}$/).required()
    }
    data={};
    async componentDidMount(){
        this.data=await axios.get("http://localhost:3001/users");
        console.log(this.data)
    }
    
    signupValidations = () =>{
        const errors=  {};
        let state={...this.state};
        delete state.Signup_errors;
        var res=Joi.validate(state,this.schema,{abortEarly:false});
        if(res.error === null){
            this.setState({Signup_errors:{}});
            return null};
        for (const error of res.error.details){
            errors[error.path]=error.message;
        }
        console.log(res.error.details)
        this.setState({Signup_errors:errors})
        console.log(this.state.Signup_errors.Email);
        
    }


      handelsignup= async e =>{
        e.preventDefault();
        const errors=this.signupValidations();
        console.log("1111111111111111111111",errors)
        if(errors) return;
        for(const data of this.data.data){
            if(data.email===this.state.Email){
                this.state.Signup_errors.Email="This Email already exists, try to login!";
                return;
            }
        }
        let date = new Date().getDate();
        const obj={ name: this.state.UserName, email: this.state.Email, password: this.state.Password, created_at: date, phone:'' ,profile_image:'', is_host:false };
        
            var formData = new FormData();
            formData.append("name", "aya");
            console.log("aaaaaaaaaaaaaaaaaaaaa",formData);
            formData.append("email", this.state.Email);
            formData.append("password",  this.state.Password);
            formData.append("phone", this.state.PhoneNumber);
            formData.append("is_host", false);
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            console.log("1233333333333333333333",formData);

            let url = "http://localhost:3001/users/";
            let method = "POST";
            // fetch(url, {
            //     method: method,
            //     body: formData,
            //     headers: {
            //       Authorization: "Bearer " + this.props.token,
            //     },
            //   }).then(response => {
            //     if (response.statusText === "created") {
            //     this.props.handleSuccessfulAuth(response.data);
            //     }
            // })
            // .catch(error => {
            //     console.log("registration error", error);
            // });

            fetch(url, {
                method: method,
                body: formData,
                headers: {
                  Authorization: "Bearer " + this.props.token,
                },
              })


        // await axios.post("http://localhost:3001/users/",{data:formData},
        // { headers : { 'content-type': 'multipart/form-data' }})
        //     .then(response => {
        //         if (response.statusText === "created") {
        //         this.props.handleSuccessfulAuth(response.data);
        //         console.log("done")
        //         }
        //     })
        //     .catch(error => {
        //         console.log("registration error", error);
        //     });
            var email=this.state.Email;
            setSessionCookie({ email });
        //await  this.props.history.push("/");
      }
      

    render() { 
        return (     

                <div className="row">
                <div className="col-sm-9 col-md-6 col-lg-4 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Register</h5>
                        <form  onSubmit={this.handelsignup} className="form-signin" method="POST">
                        <div className="form-label-group">
                            <input value={this.state.UserName} onChange={this.handelchange} name="UserName" type="text" className="form-control" placeholder="User Name"  /> 
                            {this.state.Signup_errors.UserName && ( <div className="alert alert-danger form-control">{this.state.Signup_errors.UserName}</div> )}
                        </div>

                        <div className="form-label-group">
                            <input value={this.state.Email}  onChange={this.handelchange} name="Email" type="email" className="form-control" placeholder="Email address"  />
                            {this.state.Signup_errors.Email && ( <div className="alert alert-danger form-control">{this.state.Signup_errors.Email}</div> )}
                        </div>

                        <div className="form-label-group">
                            <input value={this.state.PhoneNumber}  onChange={this.handelchange} name="PhoneNumber" type="text" className="form-control" placeholder="Phone Number"  />
                            {this.state.Signup_errors.PhoneNumber && ( <div className="alert alert-danger form-control">{this.state.Signup_errors.PhoneNumber}</div> )}
                        </div>


                        <div className="form-label-group">
                            <input value={this.state.Password} onChange={this.handelchange} name="Password" type="password" className="form-control" placeholder="Password"  />
                            {this.state.Signup_errors.Password && ( <div className="alert alert-danger form-control">{this.state.Signup_errors.Password}</div> )}
                        </div>

                        <div className="form-label-group">
                            <input value={this.state.Password_confirm} onChange={this.handelchange} name="Password_confirm" type="password" id="inputConfirmPassword" className="form-control" placeholder="Confirm password" />
                            {this.state.Signup_errors.Password_confirm && ( <div className="alert alert-danger form-control">Password confirmation must equal to password</div> )}
                        </div>

                        <div className="custom-control custom-checkbox text-center mt-2 mb-4">
                            <input type="checkbox" className="custom-control-input" id="customCheck2" />
                            <label className="custom-control-label text-link" htmlFor="customCheck2">Agree to <a href="#">Terms and Conditions</a></label>
                        </div>

                        <button className="mybtn btn-lg btn-block text-uppercase submit-button" type="submit">Register</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            
         );
    }
}

export default Signup;