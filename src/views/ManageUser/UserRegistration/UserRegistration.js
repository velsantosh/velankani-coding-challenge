import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import UsersDataService from '../../../service/UsersDataService'
//import logo from '../../assets/img/brand/cil-building.png'

//const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));



// Main Chart

//Random Numbers


class UserRegistration extends Component {
  constructor(props){
    super(props);

    this.state = {
      fields: {},
      errors: {},
      value: "C",
      value1: "CA",
      response:false
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
      this.registerUser();
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

  registerUser(){
    let data={
      "name":this.state.fields["username"],
      "userName":this.state.fields["email"],
      "password":this.state.fields["password"],
      "role_id":this.state["value"],
      "experience":this.state["value1"],
      }
console.log("User Detials:",data)
    //let permissionFlag= false;
    UsersDataService.createUser(data)
    .then(
        response => {
          console.log("UserResponse : ",response.status)
            if(response.status === 200){
              
             this.setState({response:true})
          }else{
            console.log("UserResponse : ",response.data)
          this.props.history.push(`/404`)}
        }
    )
    
} 
  
  render() {
    if(this.state.response){
      return (
  // <Redirect from="/login" to="/manageUser/UserList" />
                <Redirect to={{
                   pathname: '/manageUser/UserList'
                   
                }}
/>
);
    }else{
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create user account</p>
                    <span style={{color: "red"}} className="error">{this.state.errors["username"]}</span>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="username"type="text" placeholder="Name" autoComplete="username" onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]}/>
                    </InputGroup>

                    <span style={{color: "red"}} className="error">{this.state.errors["email"]}</span>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input ref="email" type="text" placeholder="Email" autoComplete="email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                       
                    </InputGroup>

                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={'../../assets/img/avatars/cil-building.png'} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="companyname"type="text" placeholder="Companyname" autoComplete="companyname" onChange={this.handleChange.bind(this, "companyname")} value={this.state.fields["companyname"]}/>
                    </InputGroup> */}

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={'../../assets/img/avatars/cil-briefcase.png'} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="experience"type="text" placeholder="Experience" autoComplete="experience" onChange={this.handleChange.bind(this, "experience")} value={this.state.fields["experience"]}/> */}
                      <select  className="form-control" id="exampleFormControlSelect1" value={this.state.value1} onChange={(e)=>{this.setState({value1: e.target.value})}}>
                        <option value="CA" disabled>Experience</option>
                        <option key={2} value={2}>{"Below 3 yrs"}</option>
                        <option key={3} value={5}>{"3 to 5"}</option>
                        <option key={4} value={7}>{"5 to 8"}</option>
                      </select> 
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={'../../assets/img/avatars/cil-people.png'} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="role" type="text" placeholder="Role" autoComplete="role" onChange={this.handleChange.bind(this, "role")} value={this.state.fields["role"]}/> */}
                      <select  className="form-control" id="exampleFormControlSelect" value={this.state.value} onChange={(e)=>{this.setState({value: e.target.value})}}>
                        <option value="C" disabled>Role</option>
                        <option key={2} value={"ADMIN"}>{"ADMIN"}</option>
                        <option key={3} value={"RECRUITMENT"}>{"RECRUITMENT"}</option>
                        <option key={4} value={"CANDIDATE"}>{"CANDIDATE"}</option>
                        <option key={5} value={"INTERVIEWER"}>{"INTERVIEWER"}</option>
                        <option key={6} value={"GUEST"}>{"GUEST"}</option>
                    </select>  
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
                      <Input ref="rep_password" type="password" placeholder="Confirm password" autoComplete="new-password" onChange={this.handleChange.bind(this, "rep_password")} value={this.state.fields["rep_password"]}/>
                    </InputGroup>
                    {/* <Button color="success" block>Create Account</Button> */}
                    <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-success mb-1" block><span>Submit</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                    <Link to="/manageUser/UserList">
                      <Button className="btn-danger mb-1" block><span>Cancel</span></Button>
                      </Link>
                    </Col>
                  </Row>
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
}

export default withRouter(UserRegistration);
