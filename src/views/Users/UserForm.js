import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

class UserForm extends Component {
  constructor(props) {
    super(props);

    const { user = {} } = props;

    this.state = { user,
      fields: {},
      errors: {},
      value: "C",
      value1: "CA",
      value2: "CB",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    this.setState({ user });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.handleValidation()){
       const { user } = this.state.user;
       const { handleSubmit } = this.props;
        handleSubmit(user);
        this.setState({ user: {} });
        alert("Form submitted");
    }else{
      alert("Form has errors.")
    }
  }

  handleChange(e, { name, value }) {
    const { user } = this.state;

    this.setState({ user: { ...user, [name]: value } });
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

  render() {
    // const { user: { name, email, phone, address, city, zip } } = this.state;
    const { handleCancel, submitText = 'Create' } = this.props;

    
  return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form name="registerform" className="registerform" onSubmit= {this.handleSubmit}>
                    
                    <p className="text-muted">User account</p>
                    <span style={{color: "red"}} className="error">{this.state.errors["username"]}</span>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="username"type="text" name="username" placeholder="Username" autoComplete="username" onChange={this.handleChange} value={this.state.fields["username"]}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={'../../assets/img/avatars/cil-building.png'} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input ref="companyname"type="text" name="companyname" placeholder="Companyname" autoComplete="companyname" onChange={this.handleChange} value={this.state.fields["companyname"]}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={'../../assets/img/avatars/cil-briefcase.png'} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="experience"type="text" placeholder="Experience" autoComplete="experience" onChange={this.handleChange.bind(this, "experience")} value={this.state.fields["experience"]}/> */}
                      <select  name="experience" className="form-control" id="exampleFormControlSelect1" value={this.state.value1} onChange={this.handleChange}>
                        <option value="CA" disabled>Experience</option>
                        <option key={2} value={2}>{"Below 3 yrs"}</option>
                        <option key={3} value={3}>{"3 to 5"}</option>
                        <option key={4} value={4}>{"5 to 8"}</option>
                      </select> 
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={'../../assets/img/avatars/cil-people.png'} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="role" type="text" placeholder="Role" autoComplete="role" onChange={this.handleChange.bind(this, "role")} value={this.state.fields["role"]}/> */}
                      <select  name="role" className="form-control" id="exampleFormControlSelect1" value={this.state.value} onChange={this.handleChange}>
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
                      <Input ref="email" name="email" type="text" placeholder="Email" autoComplete="email" onChange={this.handleChange} value={this.state.fields["email"]}/>
                       
                    </InputGroup>
                    
                    <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-success mb-1" type="submit" block><span>{submitText}</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                    <Link to="/manageUser/editUser">
                      <Button className="btn-danger mb-1" block onClick={handleCancel}><span>Cancel</span></Button>
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













































//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <Form.Input
//           label="Name"
//           type="text"
//           name="name"
//           value={name}
//           onChange={this.handleChange}
//         />
//         <Form.Input
//           label="Email"
//           type="email"
//           name="email"
//           value={email}
//           onChange={this.handleChange}
//         />
//         <Form.Input
//           label="Phone"
//           type="tel"
//           name="phone"
//           value={phone}
//           onChange={this.handleChange}
//         />
//         <Form.Input
//           label="Address"
//           type="text"
//           name="address"
//           value={address}
//           onChange={this.handleChange}
//         />
//         <Form.Input
//           label="City"
//           type="text"
//           name="city"
//           value={city}
//           onChange={this.handleChange}
//         />
//         <Form.Input
//           label="Zip Code"
//           type="text"
//           name="zip"
//           value={zip}
//           onChange={this.handleChange}
//         />
//         <Form.Group>
//           <Form.Button type="submit">{submitText}</Form.Button>
//           <Form.Button onClick={handleCancel}>Cancel</Form.Button>
//         </Form.Group>
//       </Form>
//     );
//   }
// }

export default UserForm;
