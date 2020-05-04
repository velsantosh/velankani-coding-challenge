import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, CardGroup, Row, Table, CardFooter, Button, Container } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
// import usersData from './UsersData'
import UsersDataService from '../../service/UsersDataService'
import Modals from '../Notifications/Modals/Modals'
import classes from "./Users.module.css";
import cx from "classnames";

class User extends Component {
  constructor(props) {
    super(props)
    this.state={
        users: [],
        message: null,
        flag:false,
        response:false
        
    }
    this.retrieveUsers = this.retrieveUsers.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
}

    componentDidMount(){
        this.retrieveUsers();
    }
    retrieveUsers(){
      
      console.log("#$#$#$",this.props.match.params.id)
      UsersDataService.retrieveUserByUserId(this.props.match.params.id)
        .then(
            response => {
              if(response.data === null){
                console.log(response)
                this.setState({users:response.data})
                this.setState({flag:true})
            }else{
              console.log(response)
                this.setState({users:response.data})
            }
          }
        )
    }

    handleDelete(){
      debugger
      console.log("handleDelete",this.props.match.params.id)
      UsersDataService.retrieveUserByUserId(this.props.match.params.id)
        .then(
            response => {
                console.log(response)
               if(response.data===null){
                 console.log("response null")
                 alert("No record available for ID:",this.props.match.params.id);
               }
               else{
                console.log("response there")
                 this.deleteUser();
               }
            }
        )
    }

    deleteUser(){
      console.log("Deleteing Users")
      UsersDataService.deleteUser(this.props.match.params.id)
        .then(
            response => {
                console.log(response)
                if(response.status === 200){
              
                  this.setState({response:true})
               }else{
                 console.log("UserResponse : ",response.data)
               this.props.history.push(`/404`)}
             }
            
        )
    }
  render() {

    const margin = {
      marginTop: '60px'
    };
    // const user = users.find( user => user.id.toString() === this.props.match.params.id)
    const userDetails = this.state.users ? Object.entries(this.state.users) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    if(this.state.response){
      return (
  // <Redirect from="/login" to="/manageUser/UserList" />
  <Modals message={`User deleted successfully`} linkValue={"/manageUser/users"} header={"DELETE:"}></Modals>
);
}else{
    return (
      <div className="animated fadeIn">
        <Container style={margin} xl="12">
        <Row className="justify-content-center">
          <Col lg={12}>
          <CardGroup>
          <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      {/* <h2>Sign up</h2>
                      <p>Welcome to Velankani Coding Challenge Tool</p>
                      {/* <Link to="/Register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link> */} 
                      <img src={`https://api.adorable.io/avatars/250/abc@abc25.com`} width="350" height="300" className="img-brand" alt="User" />
                    </div>
                  </CardBody>
                </Card>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i></strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
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
                  </Table>
              </CardBody>
              <CardFooter>
              <Link to={`/manageUser/user/${this.props.match.params.id}/edit`}>
                <Button type="submit" size="sm" className={cx(classes.createBtn)} hidden={this.state.flag}><i className="fa fa-dot-circle-o"></i> Update</Button></Link>
                <Button type="reset" size="sm" className={cx(classes.createBtn)} hidden={this.state.flag} onClick={this.handleDelete}><i className="fa fa-ban"></i> Delete</Button>
                <Link to="/manageUser/UserList"><Button type="reset" size="sm" color="danger" hidden={!this.state.flag}><i className="fa fa-ban"></i> Cancel</Button></Link>
              </CardFooter>
            </Card>
            </CardGroup>
          </Col>
        </Row>
        </Container>
      </div>
      
    )
  }
}
}

export default User;
