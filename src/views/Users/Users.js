import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, Badge } from 'reactstrap';
import UsersDataService from '../../service/UsersDataService'
// import usersData from './UsersData'

function UserRow(props) {
  const user = props.user
  const userLink = `/manageUser/user/${user.id}`
  const userLink1 = `/manageUser/user/${user.userName}`

  const getBadge = (status) => {
    return status === 'ADMIN' ? 'success' :
      status === 'RECRUITMENT' ? 'primary' :
        status === 'CANDIDATE' ? 'secondary' :
          status === 'INTERVIEWER' ? 'warning'
          :'danger'
  }

  return (
    <tr key={user.id}>
      <th scope="row"><Link to={userLink1}>{user.id}</Link></th>
      <td><Link to={userLink1}>{user.name}</Link></td>
      <td>{user.userName}</td>
      <td>{user.experience}</td>
      {/* <td>{user.role_id}</td> */}
      <td><Badge color={getBadge(user.roleId)}>{user.roleId}</Badge></td>
    </tr>
  )
}

class Users extends Component {

  constructor(props) {
    super(props)
    this.state={
        users: [],
        message: null
    }
    this.refreshCourses = this.refreshCourses.bind(this)
}

    componentDidMount(){
        this.refreshCourses();
    }
    refreshCourses(){
      UsersDataService.getAllUser()
        .then(
            response => {
                console.log("***************",response.data)
                this.setState({users:response.data})
            }
        )
    }

  render() {

    // const userList = usersData.filter((user) => user.id < 10)
    const userList = this.state.users

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="bg-success mb-12">
                <i className="fa fa-align-justify"></i> Users <small className="text-white">Details</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      {/* <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th> */}
                                <th>Id</th>
                                <th>Name</th>
                                <th>UserName</th>
                                <th>Experience</th>
                                <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              <Link to="/manageUser/createUser">
                <Button size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Add User</Button></Link>
                {/* <Link to="/manageUser/createUser"><Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Delete</Button></Link> */}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
