import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {

  constructor(props){
    super(props);

    this.state = {
      fields: {},
      errors: {}
    }
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["username"]){
      formIsValid = false;
      errors["username"] = "Field cannot be empty";
    }
    else if(typeof fields["username"] !== "undefined" && !fields["username"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["username"] = "Only letters";
    } 
    
    if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Field cannot be empty";
    }
    
    //Email
    if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "Field cannot be empty";
    }

    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    //Password
    if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Field cannot be empty";
    }

    if(!fields["rep_password"]){
      formIsValid = false;
      errors["rep_password"] = "Field cannot be empty";
    }
    else if(typeof fields["rep_password"] !== "undefined"){
      //console.log(fields["password"]);
     // console.log(fields["rep_password"]);
        if(fields["password"] !== fields["rep_password"]){
            formIsValid = false;
            errors["rep_password"] = "Password should be same";
        }    
    }
    
    this.setState({errors: errors});
    return formIsValid;
  }
  
  contactSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
      alert("Form submitted");
    }else{
      alert("Form has errors.")
    }
  }

  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <span style={{color: "red"}} className="error">{this.state.errors["username"]}</span>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="username"type="text" placeholder="Username" autoComplete="username" onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]}/>
                    </InputGroup>
                    <span style={{color: "red"}} className="error">{this.state.errors["email"]}</span>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input ref="email" type="text" placeholder="Email" autoComplete="email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                    </InputGroup>
                    <span style={{color: "red"}} className="error">{this.state.errors["password"]}</span>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="password" type="password" placeholder="Password" autoComplete="new-password" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
                    </InputGroup>
                    <span style={{color: "red"}} className="error">{this.state.errors["rep_password"]}</span>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="rep_password" type="password" placeholder="Repeat password" autoComplete="new-password" onChange={this.handleChange.bind(this, "rep_password")} value={this.state.fields["rep_password"]}/>
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
