import React, {Component} from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import { Card, Button} from 'reactstrap';
import { CardBody, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Badge, CardHeader, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import briefcase from '../../../assets/img/avatars/cil-briefcase.png'
import building from '../../../assets/img/avatars/cil-building.png'
import people from '../../../assets/img/avatars/cil-people.png'
//import classnames from 'classnames';

class Navs extends Component {

  constructor(props) {
    super(props);

    
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      fields: {},
      errors: {},
      value: "C",
      value1: "CA",
      value2: "CB"
    };
  }

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
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

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
        <Row>
            <Col sm="12">
            <Card className="mx-4">
                <CardBody className="p-4">
                  <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create user account</p>
                    {/* <span style={{color: "red"}} className="error">{this.state.errors["username"]}</span> */}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="username"type="text" placeholder="Username" autoComplete="username" onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={building} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="companyname"type="text" placeholder="Companyname" autoComplete="companyname" onChange={this.handleChange.bind(this, "companyname")} value={this.state.fields["companyname"]}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={briefcase} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="experience"type="text" placeholder="Experience" autoComplete="experience" onChange={this.handleChange.bind(this, "experience")} value={this.state.fields["experience"]}/> */}
                      <select  class="form-control" id="exampleFormControlSelect1" value={this.state.value1} onChange={(e)=>{this.setState({value1: e.target.value})}}>
                        <option value="CA" disabled>Experience</option>
                        <option key={2} value={2}>{"Below 3 yrs"}</option>
                        <option key={3} value={3}>{"3 to 5"}</option>
                        <option key={4} value={4}>{"5 to 8"}</option>
                      </select> 
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={people} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="role" type="text" placeholder="Role" autoComplete="role" onChange={this.handleChange.bind(this, "role")} value={this.state.fields["role"]}/> */}
                      <select  class="form-control" id="exampleFormControlSelect1" value={this.state.value} onChange={(e)=>{this.setState({value: e.target.value})}}>
                        <option value="C" disabled>Role</option>
                        <option key={2} value={2}>{"Admin"}</option>
                        <option key={3} value={3}>{"Recruitment"}</option>
                        <option key={4} value={4}>{"Candidate"}</option>
                    </select>  
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
                      <Input ref="rep_password" type="password" placeholder="Confirm password" autoComplete="new-password" onChange={this.handleChange.bind(this, "rep_password")} value={this.state.fields["rep_password"]}/>
                    </InputGroup>
                    {/* <Button color="success" block>Create Account</Button> */}
                    <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-success mb-1" block><span>Submit</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-danger mb-1" block><span>Cancel</span></Button>
                    </Col>
                  </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
        <Row className="justify-content-center" width="200">
        <Col sm="12">
              <Card className="mx-4">
                
              <CardHeader>
                <i className="fa fa-align-justify"></i> Manage User
              </CardHeader>
              <CardBody className="p-4">
              
                <Table responsive>
                  <thead>
                  <tr>
                    <th></th>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td><input type="checkbox"/></td>
                    <td>Samppa Nori</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"/></td>
                    <td>Estavan Lykos</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"/></td>
                    <td>Chetan Mohamed</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"/></td>
                    <td>Derick Maximinus</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"/></td>
                    <td>Friderik Dávid</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <Row width="200">
                    <Col xs="8" sm="6">
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
               </Col>
                    <Col xs="8" sm="6" >
                      <Link to="/manageUser/createUser">
                        <Button color="primary" className="px-4" >Add</Button>
                      </Link>
                      <span> </span>
                      <Link to="/manageUser/createUser">
                        <Button color="primary" className="px-4" >Update</Button>
                      </Link>
                    <span> </span>
                      <Link to="/manageUser/createUser">
                        <Button color="primary" className="px-4" >Delete</Button>
                        <br></br>
                       </Link> 
                    </Col>
                  </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </TabPane>
        <TabPane tabId="3">
          {`3. ${this.lorem()}`}
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" md="6" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Add User
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Edit User
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => { this.toggle(0, '3'); }}
                >
                  Delete User
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
          
        </Row>
      </div>
    );
  }
}

export default Navs;