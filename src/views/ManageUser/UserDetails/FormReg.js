import React, { Component } from 'react'
import { Button, Card, CardBody,  Col, Row, Input, InputGroup, InputGroupAddon, InputGroupText, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import UsersDataService from '../../../service/UsersDataService';
export class FormReg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        console.log(this.state.id)
        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }
        UsersDataService.retrieveUsers(this.state.id)
            .then(response => this.setState({
                name: response.data.name
            }))
    }

    onSubmit(values) {
        let users = {
            id: this.state.id,
            name: this.state.name
        }
        if (this.state.id === -1) {
            UsersDataService.createUser(users)
                .then(() => this.props.history.push('/users'))
        } else {
            UsersDataService.updateUser(this.state.id, users)
                .then(() => this.props.history.push('/users'))
        }
        console.log(values);
    }
    render() {
        
        return (
            <div>
                <Row className="justify-content-center" width="200">
        
                    <Col md="12" lg="7" xl="12">
                        <Card className="shadow p-3 mb-5 bg-white rounded">
                            <CardBody className="p-4">
                            <Form name="registerform" className="registerform" onSubmit= {this.onSubmit}>
                                <h1>User Form</h1>
                                <p className="text-muted">Create user account</p>
                                <span style={{color: "red"}} className="error"></span>
                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="icon-user"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input ref="username"type="text" placeholder="Username" autoComplete="username" value={this.state.name}/>
                                </InputGroup>

                                {/* <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <img src={'../../assets/img/avatars/cil-building.png'} width="15" height="10" className="img-brand" alt="User" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input ref="companyname"type="text" placeholder="Companyname" autoComplete="companyname" />
                                </InputGroup> */}

                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <img src={'../../assets/img/avatars/cil-briefcase.png'} width="15" height="10" className="img-brand" alt="User" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                {/* <Input ref="experience"type="text" placeholder="Experience" autoComplete="experience" onChange={this.handleChange.bind(this, "experience")} value={this.state.fields["experience"]}/> */}
                                <select  className="form-control" id="exampleFormControlSelect1" >
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
                                <select  class="form-control" id="exampleFormControlSelect1" >
                                    <option value="C" disabled>Role</option>
                                    <option key={2} value={2}>{"Admin"}</option>
                                    <option key={3} value={3}>{"Recruitment"}</option>
                                    <option key={4} value={4}>{"Candidate"}</option>
                                </select>  
                                </InputGroup>

                                <span style={{color: "red"}} className="error"></span>
                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>@</InputGroupText>
                                </InputGroupAddon>
                                <Input ref="email" type="text" placeholder="Email" autoComplete="email" />
                                
                                </InputGroup>
                                <span style={{color: "red"}} className="error"></span>
                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="icon-lock"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input ref="password" type="password" placeholder="Password" autoComplete="new-password"/>
                                </InputGroup>
                                <span style={{color: "red"}} className="error"></span>
                                <InputGroup className="mb-4">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="icon-lock"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input ref="rep_password" type="password" placeholder="Confirm password" autoComplete="new-password"/>
                                </InputGroup>
                                {/* <Button color="success" block>Create Account</Button> */}
                                <Row>
                                <Col xs="12" sm="6">
                                <Button className="btn-success mb-1" block><span>Submit</span></Button>
                                </Col>
                                <Col xs="12" sm="6">
                                <Link to="/manageUser/editUser">
                                <Button className="btn-danger mb-1" block><span>Cancel</span></Button>
                                </Link>
                                </Col>
                            </Row>
                            </Form>
                            </CardBody>
                        </Card>
                        </Col>
                </Row>
            </div>
        )
    }
}

export default FormReg
