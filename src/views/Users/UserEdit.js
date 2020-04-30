import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, CardFooter, Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Link } from 'react-router-dom';
// import usersData from './UsersData'
import UsersDataService from '../../service/UsersDataService'
class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.state={
        users: [],
        fields: {},
        errors: {},
        value: "C",
        value1: "CA",
        message: null
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
                console.log(response)
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
          errors["password"] = "Invalid Password";
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
        alert("Form submitted");
      }else{
        alert("Form has errors.")
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
        "role_id":this.state.users["role_id"],
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
                
                window.location.href = "/manageUser/UserList";
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
              this.props.history.push(`/manageUser/UserList`)
              // window.location.href = "/manageUser/UserList";
          }else{
            console.log("UserResponse : ",response.data)
          this.props.history.push(`/404`)}
        }
    )
    
} 

  render() {

    // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

    // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    // const userDetails = this.state.users ? Object.entries(this.state.users) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col lg={6}>
            <Card>
              <CardHeader className="bg-success mb-12">
                <strong><i className="icon-info pr-1"></i>{this.props.match.params.id}</strong>
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
                      <Input ref="userName" type="text" placeholder="Email" autoComplete="userId" onChange={this.handleChange.bind(this, "userId")} value={this.state.users["userId"]}/>
                       
                    </InputGroup>

                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={'../../assets/img/avatars/cil-building.png'} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="companyname"type="text" placeholder="Companyname" autoComplete="companyname" onChange={this.handleChange.bind(this, "companyname")} value={this.state.users["companyname"]}/>
                    </InputGroup> */}

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={'../../assets/img/avatars/cil-briefcase.png'} width="15" height="10" className="img-brand" alt="User" />
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
                        <img src={'../../assets/img/avatars/cil-people.png'} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="role" type="text" placeholder="Role" autoComplete="role" onChange={this.handleChange.bind(this, "role")} value={this.state.users["role"]}/> */}
                      <select  className="form-control" id="exampleFormControlSelect2" value={this.state.users["role_id"]} onChange={this.handleChange.bind(this, "role_id")}>
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
             
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Update</Button>
                <Link to="/manageUser/UserList"><Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Cancel</Button></Link>
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

export default UserEdit;
