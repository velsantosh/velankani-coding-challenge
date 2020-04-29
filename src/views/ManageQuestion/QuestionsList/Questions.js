import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup, Input, Container } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
import classes from "./Questions.module.css";
import cx from "classnames";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import parse from 'html-react-parser';
// import usersData from './UsersData'

function QuestionRow(props) {
  const question = props.question
  const questiontype = question.type.toLowerCase();
  console.log(question.type);
  let questionLink ;
  if(questiontype =="subjective"){
  questionLink= `/manageQuestion/modifySubjectiveQuestion`;
  }
  if(questiontype =="objective"){
    questionLink= `/manageQuestion/modifyObjectiveQuestion`;
    }
  // const userLink1 = `/manageUser/user/${user.userName}`

  return (
    <tr key={question.id}>
      <th scope="row" onClick ={props.clickEvent}>
        <Link to={questionLink}>{question.title}</Link></th>
      {/* <td>{dangerouslySetInnerHTML={ __html: question.statement}}</td> */}
      <td>{question.statement}</td>
      <td>{question.type}</td>
      <td>{question.difficulty}</td>
      <td>{question.experience}</td>
    </tr>
  )
}

class Questions extends Component {

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
    this.getQuestionsByTypeTech(this.state.activeType,this.state.activeTechnology);
  }
 
  handleType(e){
    this.setState({
      activeType : e.target.value
    },()=>{
      this.getQuestionsByTypeTech(this.state.activeType,this.state.activeTechnology);});
  }

  handleTech(e){
    this.setState({
      activeTechnology :e.target.value
    },()=>{this.getQuestionsByTypeTech(this.state.activeType,this.state.activeTechnology);});
  }
  getQuestionsByTypeTech(type,tech) {
    QuestionService.getQuestionsByTypeTech(type,tech)
      .then(
        response => {
          this.setState({ questions: response.data })
        }
      )
  }

  setQuestionInfo =(q)=>{
    this.props.setSelectedQuestion(q);
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
          <Row className={cx(classes.filterContainer)}>
            <div className="col-xs-10 big-line btn-group" id="type" style={{ padding: '.5rem' }}>
              <h4>Type</h4>

              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                this.state.activeType === "subjective" ? classes.showActive : ""
                  )} color="primary" onClick={this.handleType.bind(this)} value="subjective">Subjective</Button>
              </abbr>


              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                this.state.activeType === "objective" ? classes.showActive : ""
                  )} color="primary" onClick={this.handleType.bind(this)} value="objective">Objective</Button>
              </abbr>
            </div>
          </Row>
          <Row className={cx(classes.filterContainer)}>
            <div className="col-xs-10 big-line btn-group" id="technology" style={{ padding: '.5rem' }}>
              <h4>Technology</h4>

              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                this.state.activeTechnology === "javascript" ? classes.showActive : ""
                  )} color="primary" onClick={this.handleTech.bind(this)} value="javascript">Javascript</Button>
              </abbr>
              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                this.state.activeTechnology === "java" ? classes.showActive : ""
                  )} color="primary" onClick={this.handleTech.bind(this)} value="java">Java</Button>
              </abbr>
            </div>
          </Row>
          <Row xs={2} md={4} lg={6}>
            <Col md={{ span: 6, offset: 10 }}>
              <Link to="/manageQuestion/createQuestion">
                <Button className="btn btn-primary mb-1" className={cx(classes.createBtn)}>Create New Question</Button>
              </Link>
            </Col>
          </Row>

          <Row xs="12" className="justify-content-center">
            <Col xl={10}>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th scope="col" className="headingPrimary">TITLE</th>
                    <th scope="col" className="headingPrimary">STATEMENT</th>
                    <th scope="col" className="headingPrimary">TYPE</th>
                    <th scope="col" className="headingPrimary">DIFFICULTY</th>
                    <th scope="col" className="headingPrimary">EXPERIENCE</th>
                    {/* <th scope="col" className="headingPrimary">EXPECTED TIME</th> */}
                  </tr>
                </thead>
                <tbody>
                  {questionsList.map((question, index) =>
                    <QuestionRow key={index} question={question} clickEvent={this.setQuestionInfo.bind(this,{question})} />
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

const mapDispatchToProps = dispatch => {
  return {
    setSelectedQuestion: selectedQuestionData =>
      dispatch({ type: actionTypes.SELECTEDQUESTIONDATA, value: selectedQuestionData })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Questions);

