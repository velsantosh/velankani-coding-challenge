import React, { Component } from 'react';
import { Link,  withRouter, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap';
import UsersDataService from '../../../service/UsersDataService'
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import {compose} from 'redux';

class Login extends Component {

  
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password:'',
      errors: {},
      permissionList:[],
      permissionFlag:false,
      navPermission:[],
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this);

    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    this.validateLogin = this.validateLogin.bind(this);
  }

     handleChangeEmail(e) {
        this.setState({email:e.target.value});
        }
    
    handleChangePassword(e) {
        this.setState({password:e.target.value});
        }

  submituserRegistrationForm(e) {
    e.preventDefault();
        if (this.validateForm()) {
             this.validateLogin()
             
     }
  }
       

  validateLogin(){
      //let permissionFlag= false;
      UsersDataService.validateLogin(this.state.email, this.state.password)
      .then(
          response => {
           //console.log("@",response.data)
              this.setState({permissionFlag:response.data})
              console.log("permissionFlag",this.state.permissionFlag);
              if(response.data){ 
                this.props.setUserName(this.state.email);
                // this.getPermission();
                // //window.location.href = "/";
                // console.log("###",response.data);
                // this.setState({permissionFlag:true})
                 console.log("UserName",this.state.email);
                // return this.state.permissionFlag;
                // this.props.history.push({pathname: '/recruit', state: { detail: this.state.email }})
                // this.props.history.push('/manageDashbord/users');
            }else{
              alert("Invalid UserName/Password");
            this.props.history.push(`/Login`);
              //console.log("###$$",this.state.permissionFlag);
            }
          }
      )
      
  } 
    
    validateForm() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.email) {
          formIsValid = false;
          errors["email"] = "*Please enter your email-ID.";
        }
    
    if (typeof this.state.email !== "undefined") {
        //regular expression for email validation
        let lastAtPos = this.state.email.lastIndexOf('@');
        let lastDotPos = this.state.email.lastIndexOf('.');
  
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "User name is not valid, it should be in EmailId formate";
        }
        // var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        // if (!pattern.test(this.state.email)) {
        //   formIsValid = false;
        //   errors["email"] = "Please enter valid email-ID.";
        // }
      }
    
    if (!this.state.password) {
        formIsValid = false;
        errors["password"] = "Please enter your password.";
        }
    
    if (typeof this.state.password !== "undefined") {
        if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "Invalid Password";
        }
      }
    
    this.setState({
        errors: errors
      });
    
    return formIsValid;
    }

  render() {
    if(this.state.permissionFlag){
      return (
        <Redirect to={{
                         pathname: '/',
                         state: { userName: this.state.email }
                      }}
/>
      );
    }else{
    return (
      
      <div className="app flex-row align-items-center">
        <Helmet>
          <title>Recruit | Login</title>
        </Helmet>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody style={{ width: '20rem' }}>
                    <Form  method="post" name="userRegistrationForm" onSubmit= {this.submituserRegistrationForm}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <div className="errorMsg" style={{color: "red"}}>{this.state.errors.email}</div>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend" >
                          <InputGroupText >
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input ref="email" className="form-control-warning" id="inputWarning2i" autoComplete="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email Id" required/>
                            
                        </InputGroup>
                        <div className="errorMsg" style={{color: "red"}}>{this.state.errors.password}</div>                                           
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input ref="password" type="password" autoComplete="current-password" id="examplePassword" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" required/>
                        
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" id="submit" value="Submit">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="/ForgotPassword">
                            <Button color="link" className="px-0">Forgot password?</Button>
                          </Link>  
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Welcome to Velankani Coding Challenge Tool</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
    }

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserName: userName =>
      dispatch({ type: actionTypes.SETUSERNAME, value: userName })
  };
};

export default compose(
  withRouter,
  connect("", mapDispatchToProps)
)(Login);
