import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, Badge } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
// import usersData from './UsersData'

function QuestionRow(props) {
  const question = props.question
  const questionLink = `/manageQuestion/question/${question.id}`
  // const userLink1 = `/manageUser/user/${user.userName}`

  // const getBadge = (status) => {
  //   return status === 'ADMIN' ? 'success' :
  //     status === 'RECRUITMENT' ? 'primary' :
  //       status === 'CANDIDATE' ? 'secondary' :
  //         status === 'INTERVIEWER' ? 'warning'
  //         :'danger'
  // }

  return (
    // <tr key={user.id}>
    //   <th scope="row"><Link to={userLink}>{user.id}</Link></th>
    //   <td><Link to={userLink}>{user.name}</Link></td>
    //   <td>{user.userName}</td>
    //   <td>{user.experience}</td>
    //   {/* <td>{user.role_id}</td> */}
    //   {/* <td><Badge color={getBadge(user.role_id)}>{user.role_id}</Badge></td> */}
    // </tr>
    <div className="animated fadeIn">
        <Container>
        <Row className="justify-content-center">
          <Col lg={9}>
          <CardGroup>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Question ID: {this.props.match.params.id}</strong>
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
                <Button type="submit" size="sm" color="primary" hidden={this.state.flag}><i className="fa fa-dot-circle-o"></i> Update</Button></Link>
                <Link to="/manageUser/UserList"><Button type="reset" size="sm" color="danger" hidden={this.state.flag} onClick={this.handleDelete}><i className="fa fa-ban"></i> Delete</Button></Link>
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

class Questions extends Component {

  constructor(props) {
    super(props)
    this.state={
        questions: [],
        message: null
    }
    this.getQuestions = this.getQuestions.bind(this)
}

    componentDidMount(){
        this.getQuestions();
    }
    getQuestions(){
      QuestionService.getQuestions()
        .then(
            response => {
                console.log("***************",response.data)
                this.setState({questions:response.data})
            }
        )
    }

  render() {

    // const userList = usersData.filter((user) => user.id < 10)
    const questionsList = this.state.questions

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="bg-success mb-12">
                <i className="fa fa-align-justify"></i> Questions <small className="text-white">Details</small>
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
                    {userList.map((question, index) =>
                      <QuestionRow key={index} question={question}/>
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

export default Questions;
