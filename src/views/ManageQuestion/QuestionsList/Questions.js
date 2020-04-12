import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup,Input } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
// import usersData from './UsersData'

function QuestionRow(props) {
  const question = props.question
  //const questionLink = `/manageQuestion/question/${question.id}`
  // const userLink1 = `/manageUser/user/${user.userName}`

  const getExp = (status) => {
    return status === '2' ? 'Below 3 yrs' :
    status === '3' ? '3 to 5' :
      status === '4' ? '3 to 5' :
        status === '6' ? '5 to 8' :
         'Above 8 yrs'
  }

  return (
    // <tr key={user.id}>
    //   <th scope="row"><Link to={userLink}>{user.id}</Link></th>
    //   <td><Link to={userLink}>{user.name}</Link></td>
    //   <td>{user.userName}</td>
    //   <td>{user.experience}</td>
    //   {/* <td>{user.role_id}</td> */}
    //   {/* <td><Badge color={getBadge(user.role_id)}>{user.role_id}</Badge></td> */}
    // </tr>
    
            <Card className="justify-content-center">
              <CardHeader className="bg-success mb-12">
                {/* <strong><i className="icon-info pr-1"></i>Question ID: {question.id}</strong> */}
                <table><thead>
                    <tr>
                        <th width="200px">Language:{question.language}</th><span></span>
                        <th width="200px">Type:{question.type}</th><span></span>
                        <th width="200px">Experience:{getExp(question.experience)}</th>
                    </tr>
                  </thead></table>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                  {/* <thead>
                    <tr>
                        <th>Language:{question.language}</th>
                        <th>Type:{question.type}</th>
                        <th>Experience:{getExp(question.experience)}</th>
                    </tr>
                  </thead> */}
                    <tbody>
                      {
                        <tr width="200px"><Input type="textarea" name="textarea-input" rows="3" width="200px"
                                   value={question.statement}/></tr>
                      }
                    </tbody>
                  </Table>
              </CardBody>
              <CardFooter>
              <Link to={`/manageQuestion/addQuestion`}>
                <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o"></i> Assign</Button></Link>
                {/* <Link to="/manageUser/UserList"><Button type="reset" size="sm" color="danger" hidden={this.state.flag} onClick={this.handleDelete}><i className="fa fa-ban"></i> Delete</Button></Link> */}
                <Link to="/assignQuestion/AssignQuestion"><Button type="reset" size="sm" color="danger" ><i className="fa fa-ban"></i> Cancel</Button></Link>
              </CardFooter>
            </Card>
            
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

    back = e => {
      e.preventDefault();
      this.props.prevStep();
      
    }

  render() {

    // const userList = usersData.filter((user) => user.id < 10)
    const questionsList = this.state.questions

    return (
      <div className="animated fadeIn">
        <Row xs="10" className="justify-content-center">
          <Col xl={10}>
            
                    {questionsList.map((question, index) =>
                      <QuestionRow key={index} question={question}/>
                    )}
                  
          </Col>
        </Row>
      </div>
    )
  }
}

export default Questions;
