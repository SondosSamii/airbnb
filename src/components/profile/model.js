import React, { Component } from 'react';
import { Modal, Button ,Form } from "react-bootstrap";
import {getclientById , updateClient} from "../../actions/clients";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";  
import "./modal.css";

class Model extends Component {

    constructor(props) {
        super(props);
        this.state = {  
            name:"",
            city:"", 
            email:"",
            phone:"",
            age:0,
            gender:""

        }
    }
    componentDidMount(){
        console.log("$$$$$$$$$$$$$$" , this.props.clientId);
    }
      render() { 
        return ( 
            <Modal  show={this.props.show} onHide={this.props.onHide}>
                        <Modal.Header closeButton>
                        <Modal.Title className="modal-header">Add New Student</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form className="modal-text">
                            <Form.Group >
                                <Form.Label>Name</Form.Label>
                                <Form.Control id="name" type="text"   placeholder="Enter Name"  onChange={(e)=>{
                                    // this.setState({name:e.target.value})
                                }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control id="city" type="text"  placeholder="Enter City" onChange={(e)=>{
                                    // this.setState({city:e.target.value})
                                }}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(e)=>{
                                    // this.setState({email:e.target.value})
                                }} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Phone" onChange={(e)=>{
                                    // this.setState({phone:e.target.value})
                                }} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>age</Form.Label>
                                <Form.Control type="number" placeholder="Age" onChange={(e)=>{
                                    // this.setState({age:e.target.value})
                                }} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="m-3">Gender</Form.Label>
                                <br></br>
                                <input className="m-4" type="radio" name="gender" value="male" onClick={(e)=>{
                                    // this.setState({gender:e.target.value})
                                }} />male<br></br>
                              
                                <input className="m-4" type="radio" value="female" name="gender"  onClick={(e)=>{
                                    // this.setState({gender:e.target.value})
                                }} />female
                                
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={()=>{
                                this.submit()
                            }}>
                                update
                            </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>

         );
    }
}
 
const mapactiontoprops = (disptch) =>{
    return bindActionCreators({updateClient , getclientById} ,disptch);
}
const mapstatetoprops = (state) =>{
    return {
        client : state.Clients
    }
}
export default connect(mapstatetoprops , mapactiontoprops)(Model);