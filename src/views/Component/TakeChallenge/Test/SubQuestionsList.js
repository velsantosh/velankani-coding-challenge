import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup, Input, Container } from 'reactstrap';
import QuestionService from '../../../../service/QuestionService';
import ScheduledChallengeDataService from '../../../../service/ScheduledChallengeDataService';

// import usersData from './UsersData'

function QuestionRow(props) {
  const question = props.question
  var questionLink = `/solveQuestion/${question.id}`

  if (question.type === 'OBJECTIVE') {
    questionLink = `/takeobjectivetest/${question.id}`
  }
  // const userLink1 = `/manageUser/user/${user.userName}`
  console.log("question  QuestionRow: ", question);
  console.log("question  QuestionRow: .technology ", question.technology);

  return (
    <tr key={question.id}>
      <th scope="row"><Link to={questionLink}>{question.technology}</Link></th>
      {/*<th scope="row"><Link to={questionLink}>{question.title}</Link></th> */}
      <td>{question.statement}</td>
      <td>{question.type}</td>
      <td>{question.difficulty}</td>
      <td>{question.expectedTime}</td>
    </tr>
  )
}

class SubQuestionsList extends Component {

  constructor(props) {

    super(props)
    this.state = {
      questions: [],
      type: '', 
      index :0, 
      scheduledQuestionsOrNot : this.props.location.state != null ? this.props.location.state.scheduledQuestions : null
    }
    console.log("scheduledQuestionsOrNot : ",this.state.scheduledQuestionsOrNot);
    
    this.getQuestionsByTech = this.getQuestionsByTech.bind(this);
    this.getQuestionsByType = this.getQuestionsByType.bind(this);
  }

  componentDidMount() {

     if (this.state.scheduledQuestionsOrNot != null && this.state.scheduledQuestionsOrNot) {

      console.log("getScheduledQuestionsByUserId: ",this.state.scheduledQuestionsOrNot);
       this.getScheduledQuestionsByUserId();
     } else {
      console.log("getQuestionsByTech ",this.state.scheduledQuestionsOrNot);
       this.getQuestionsByTech();
     }
  }

  getScheduledQuestionsByUserId() {
    //(this.props.userName.length > 0 && this.props.userName)
    const questions = [];
    ScheduledChallengeDataService.getScheduledQuestionByUserId("admin@abc.com").then(
      response => {
        console.log("getScheduledQuestionsByUserId :", response.data.length)
        response.data.map((question) => {
          console.log("question :", question)
          if (question.type === 'SUBJECTIVE') {            
            questions.push(question);
          }
          this.setState({ questions: questions});
        });
      }
    )
  }

  getQuestionsByTech() {
    QuestionService.getQuestionsByTech("Java")
      .then(
        response => {
          this.setState({ questions: response.data })
        }
      )
  }

  getQuestionsByType(e) {
    QuestionService.getQuestionsByType(e.target.value)
      .then(response => {
        this.setState({ questions: response.data })
      }
      )
  }

  render() {
    const buttonContainer = {
      marginTop: '20px',
      backgroundColor: '#1dafe2',
      color: 'white'
    };
    const marginRight = {
      marginRight: '0.5%'
    };
    // const userList = usersData.filter((user) => user.id < 10)
    const questionsList = this.state.questions

    let filterByTypeComponent = (
      <Row>
      <abbr class="no-border" style={marginRight} >
        <Button block outline color="primary" onClick={this.getQuestionsByType} value="SUBJECTIVE">Subjective</Button>
      </abbr>
      <abbr class="no-border" style={marginRight} >
        <Button block outline color="primary" onClick={this.getQuestionsByType} value="OBJECTIVE">Objective</Button>
      </abbr>
    </Row>
    );


    return (
      <div className="animated fadeIn">

        <div className="col-xs-10 big-line btn-group" id="Skills" data-skill="4" data-is-custom="False" style={{ padding: '.5rem' }}>
          <h4>Technology</h4>
        </div>
        <Container>         
        {!this.state.scheduledQuestionsOrNot ? filterByTypeComponent : null}

          <Row xs="12" className="justify-content-center">
            <Col xl={10}>
              <Table responsive hover striped>
                <thead>
                  <th scope="col" className="headingPrimary">TITLE</th>
                  <th scope="col" className="headingPrimary">STATEMENT</th>
                  <th scope="col" className="headingPrimary">TYPE</th>
                  <th scope="col" className="headingPrimary">DIFFICULTY</th>
                  <th scope="col" className="headingPrimary">EXPECTED TIME</th>
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

export default SubQuestionsList;
