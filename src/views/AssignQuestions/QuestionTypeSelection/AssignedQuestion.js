import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup, Input, Container } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
import classes from "./SelectQuestions.module.css";
import cx from "classnames";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import parse from 'html-react-parser';
import Parser from 'html-react-parser';
// import usersData from './UsersData'

function QuestionRow(props) {
  const question = props.question
  // const questiontype = question.type.toLowerCase();
  // console.log(question.type);
  // let questionLink ;
  // if(questiontype =="subjective"){
  // questionLink= `/manageQuestion/modifySubjectiveQuestion`;
  // }
  // if(questiontype =="objective"){
  //   questionLink= `/manageQuestion/modifyObjectiveQuestion`;
  //   }
  // const userLink1 = `/manageUser/user/${user.userName}`

  return (
    <tr key={question.id}>
      <td>{question.title}</td>
      <td>{question.topic}</td>
      <td>{Parser(question.statement)}</td>
      <td>{question.type}</td>
      <td>{question.difficulty}</td>
      <td>{question.experience}</td>
    </tr>
  )
}

class AssignedQuestion extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      type: '',
      selectedType :'',
      selectedTechnology :'',
      activeType :'subjective',
      activeTechnology :'java'
    }
  }

  componentDidMount() {
    this.getQuestionsByAssignerId(this.props.userName.length > 0 && this.props.userName);
  }
 
  getQuestionsByAssignerId(assignerId) {
    QuestionService.getSchQuestionsByAssignerId(assignerId)
      .then(
        response => {
          this.setState({ questions: response.data })
        }
      )
  }

  render() {
    const marginRight = {
      marginRight: '3%'
    }
   
    // const userList = usersData.filter((user) => user.id < 10)
    const questionsList = this.state.questions

    return (
      <div className="animated fadeIn">
        <Container>
          <Row xs={2} md={4} lg={6}>
            <Col md={{ span: 6, offset: 10 }}>
              <Link to="/assignQuestion/AssignQuestion">
                <Button className="btn btn-primary mb-1" className={cx(classes.createBtn)}>Assign Question</Button>
              </Link>
            </Col>
          </Row>

          <Row xs="12" className="justify-content-center">
            <Col xl={10}>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th scope="col" className="headingPrimary">TITLE</th>
                    <th scope="col" className="headingPrimary">TOPIC</th>
                    <th scope="col" className="headingPrimary">STATEMENT</th>
                    <th scope="col" className="headingPrimary">TYPE</th>
                    <th scope="col" className="headingPrimary">DIFFICULTY</th>
                    <th scope="col" className="headingPrimary">EXPERIENCE</th>
                    {/* <th scope="col" className="headingPrimary">EXPECTED TIME</th> */}
                  </tr>
                </thead>
                <tbody>
                  {questionsList.map((question, index) =>
                    <QuestionRow key={index} question={question} />
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userName
  };
};

export default connect(mapStateToProps)(AssignedQuestion)


