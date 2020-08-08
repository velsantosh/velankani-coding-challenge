import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, CardFooter, Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Link } from 'react-router-dom';
// import usersData from './UsersData'
import UsersDataService from '../../service/UsersDataService'
import classes from "./Users.module.css";
import cx from "classnames";
import Modals from '../Notifications/Modals/Modals';
import briefcase from '../../assets/img/avatars/cil-briefcase.png'
//import building from '../../assets/img/avatars/cil-building.png'
import people from '../../assets/img/avatars/cil-people.png'
class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.state={
        users: [],
        fields: {},
        errors: {},
        value: "C",
        value1: "CA",
        message: null,
        response:false
    }
    this.refreshCourses = this.refreshCourses.bind(this)
}

    componentDidMount(){
        this.refreshCourses();
    }
    refreshCourses(){
      console.log("Mitendra",this.props.match.params.id)
      UsersDataService.retrieveUserByUserId(this.props.match.params.id)
        .then(
            response => {
                console.log("Edit User::",response.data)
                this.setState({users:response.data})
                this.setState({feilds:response.data})
            }
        )
    }

    handleValidation(){
      let users = this.state.users;
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
  
      //Name
      if(!users["name"]){
        formIsValid = false;
        errors["name"] = "Field cannot be empty";
      }
      else if(typeof users["name"] !== "undefined" && !users["name"].match(/^[a-zA-Z/\s a-zA-Z]+$/)){
          formIsValid = false;
          errors["name"] = "Only letters";
      } 
      
      if(!users["password"]){
        formIsValid = false;
        errors["password"] = "Field cannot be empty";
      }
      
      //Email
      if(!users["userId"]){
        formIsValid = false;
        errors["userId"] = "Field cannot be empty";
      }
  
      if(typeof users["userId"] !== "undefined"){
        let lastAtPos = users["userId"].lastIndexOf('@');
        let lastDotPos = users["userId"].lastIndexOf('.');
  
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && users["userId"].indexOf('@@') === -1 && lastDotPos > 2 && (users["userId"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["userId"] = "Email is not valid";
        }
      }
  
      //Password
      if(!users["password"]){
        formIsValid = false;
        errors["password"] = "Field cannot be empty";
      }

      if (typeof users["password"] !== "undefined") {
        if (!users["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "Invalid Password";
        }
      }
  
      if(!fields["password"]){
        formIsValid = false;
        errors["rep_password"] = "Field cannot be empty";
      }
    
      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "e.g : Abcd@123";
          alert("Password between 8 and 20 characters; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace");

        }
      }
    
      if(typeof fields["rep_password"] !== "undefined"){
        //console.log(fields["password"]);
       // console.log(fields["rep_password"]);
          if(users["password"] !== fields["password"]){
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
        this.retrieveUsers();
      }
    }
  
    // handleChange(field, e){    		
    //   let users = this.state.users;
    //   users[field] = e.target.value;        
    //   this.setState({users});
    // }

    handleChange(field, e){    		
      let users = this.state.users;
      users[field] = e.target.value;        
      this.setState({users});
    }

    handleFeildChange(field, e){    		
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
    }

    retrieveUsers(){
      console.log("#$#$#$",this.props.match.params.id)
      UsersDataService.retrieveUserByUserId(this.props.match.params.id)
        .then(
            response => {
                console.log(response)
               if(response.data===null){
                 console.log("response null")
                 this.registerUser();
               }
               else{
                console.log("response there")
                 this.updateUser();
               }
            }
        )
    }
  
    registerUser(){
      let data={
        "name":this.state.users["name"],
        "userId":this.state.users["userId"],
        "password":this.state.users["password"],
        "roleId":this.state.users["roleId"],
        "experience":this.state.users["experience"],
        }
  console.log("User Detials:",data)
  console.log("User Detials:",this.state.users)
      //let permissionFlag= false;
      UsersDataService.createUser(this.state.users)
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

  updateUser(){
//     let data={
//       "name":this.state.users["username"],
//       "userName":this.state.users["email"],
//       "password":this.state.users["password"],
//       "role_id":this.state["value"],
//       "experience":this.state["value1"],
//       }
// console.log("User Detials:",data)
console.log("User Detials:",this.state.users)
    //let permissionFlag= false;
    UsersDataService.updateUserUsingUserId(this.props.match.params.id, this.state.users)
    .then(
        response => {
          console.log("UserResponse : ",response.status)
            if(response.status === 200){
              this.setState({response:true})
              // window.location.href = "/manageUser/UserList";
          }else{
            console.log("UserResponse : ",response.data)
          this.props.history.push(`/404`)}
        }
    )
    
} 

  render() {

    const margin = {
      marginTop: '40px'
    };

    const iconContainer = {
      backgroundColor :'#1dafe2',
    };
    // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

    // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    // const userDetails = this.state.users ? Object.entries(this.state.users) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    if(this.state.response){
      return (
        <Modals message={`Details updated successfully for UserId: ${this.state.users["userId"]}`} linkValue={"/manageUser/users"}></Modals>
      );
    }else{
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center" style={margin}>
          <Col md="10" lg="12" xl="11">
            <Card classNmae="mx-4 shadow-lg mx-10">
              <CardHeader className="mb-12 bg-primary">
                <strong><i className="icon-user pr-1"></i>{this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  {/* <Table responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table> */}

                  <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)}>
                   <p className="text-muted">Edit user account</p>
                    <span style={{color: "red"}} className="error">{this.state.errors["name"]}</span>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="name"type="text" placeholder="Name" autoComplete="name" onChange={this.handleChange.bind(this, "name")} value={this.state.users["name"]}/>
                    </InputGroup>

                    <span style={{color: "red"}} className="error">{this.state.errors["userId"]}</span>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input ref="userName" type="text" placeholder="Email" autoComplete="userId" onChange={this.handleChange.bind(this, "userId")} value={this.state.users["userId"]} disabled/>
                       
                    </InputGroup>

                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={building} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="companyname"type="text" placeholder="Companyname" autoComplete="companyname" onChange={this.handleChange.bind(this, "companyname")} value={this.state.users["companyname"]}/>
                    </InputGroup> */}

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={briefcase} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="experience"type="text" placeholder="Experience" autoComplete="experience" onChange={this.handleChange.bind(this, "experience")} value={this.state.users["experience"]}/> */}
                      <select  className="form-control" id="exampleFormControlSelect1" value={this.state.users["experience"]} onChange={this.handleChange.bind(this, "experience")}>
                        <option value="CA" disabled>Experience</option>
                        <option key={2} value={2}>{"Below 3 yrs"}</option>
                        <option key={3} value={5}>{"3 to 5"}</option>
                        <option key={4} value={7}>{"5 to 8"}</option>
                      </select> 
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={people} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="role" type="text" placeholder="Role" autoComplete="role" onChange={this.handleChange.bind(this, "role")} value={this.state.users["role"]}/> */}
                      <select  className="form-control" id="exampleFormControlSelect2" value={this.state.users["roleId"]} onChange={this.handleChange.bind(this, "roleId")}>
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
                      <Input ref="password" type="text" placeholder="Password" autoComplete="new-password" onChange={this.handleChange.bind(this, "password")} value={this.state.users["password"]}/>
                    </InputGroup>
                    <span style={{color: "red"}} className="error">{this.state.errors["rep_password"]}</span>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="rep_password" type="password" placeholder="Confirm password" autoComplete="new-password" onChange={this.handleFeildChange.bind(this, "password")} value={this.state.fields["password"]}/>
                    </InputGroup>
                    {/* <Button color="success" block>Create Account</Button> */}
                    <CardFooter>
             
                <Button type="submit" size="sm" className={cx(classes.createBtn)}><i className="fa fa-dot-circle-o"></i> Update</Button>
                <Link to="/manageUser/users"><Button type="reset" size="sm" className={cx(classes.createBtn)}><i className="fa fa-ban"></i> Cancel</Button></Link>
              </CardFooter>
                  </Form>
              </CardBody>
              
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
}

export default UserEdit;
