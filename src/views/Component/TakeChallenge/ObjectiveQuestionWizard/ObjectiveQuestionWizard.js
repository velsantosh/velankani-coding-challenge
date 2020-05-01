import React, { Component} from 'react';
import ObjectiveQuestion from '../ObjtiveQuestion/ObjectiveQuestion';
import ObjectiveQuestionStep from '../ObjectiveQuestionStep/ObjectiveQuestionStep';
import QuestionService from '../../../../service/QuestionService'

//import MultiStep from 'react-multistep';
import Confirm from '../ObjtiveQuestion/Confirm';
import ScheduledChallengeDataService from '../../../../service/ScheduledChallengeDataService';
import { Link } from "react-router-dom";

import {
  Button, Card, CardGroup, Container, CardBody, CardHeader,
  CardText, CardTitle, CardSubtitle, Col, Row, CardColumns
} from 'reactstrap';

import { connect } from "react-redux";
//import * as actionTypes from ".";

class ObjectiveQuestionWizard extends Component {
    constructor(props){
        super(props);
        this.state={
            objQuestions:[],
            step:0,
            result:[],
            isScheduledPage: false
        };        
    }

  componentDidMount() {

    console.log("componentDidMount props : ", this.props);
    if (this.props.location.state != null ) {
      this.setState({
        isScheduledPage : true
      })
    }

    const qId = this.props.location.pathname.split('/')[2];
    console.log("qId : ", qId);

    if (qId == null) {
      this.getScheduledQuestionsFromDB();

    } else {
      this.getQuestionsById(qId);

    }
  }

  getQuestionsById(qId) {
    QuestionService.getQuestionsById(qId)
      .then(
        response => {      
          console.log("subjective questions list: newObj", response.data)
          this.setState({
            objQuestions: [...this.state.objQuestions, response.data]
          });        
        }
      );
  }


  getScheduledQuestionsFromDB() {

    ScheduledChallengeDataService.getScheduledQuestionByUserId(this.props.userName.length > 0 && this.props.userName).then(
      questionBank => {
        console.log("objective questionBank data : ", questionBank.data)

        if (questionBank.data === null) {
          console.log("response null")
        }
        else {
          questionBank.data.map((myQuestion) => {
            console.log("inside questionBank myQuestion: ", myQuestion);
            var filteredObjQuestion = questionBank.data.filter(ques => {
              return ques.type === "OBJECTIVE";
            })
            this.setState({
              objQuestions: filteredObjQuestion
            }, () => { console.log("objQuestions :", this.state.objQuestions) });
          });
        }
      })
  }

  handleOptionSelection = e => {
    console.log(e.currentTarget.value);

        let key ={
          qid :this.state.objQuestions[this.state.step].id,
          userId :"test_user" 
          //userId : this.props.userId
        }

        let resultValue = {         
            questionContent:this.state.objQuestions[this.state.step].statement,
            selectedoption:e.currentTarget.value,
            selectedAnswer:e.currentTarget.value,
            key :key
        };        

    this.setState((prevState) => {
      var existingquestionContents = this.state.result.map((obj) => obj.questionContent);

      if (existingquestionContents.indexOf(resultValue.questionContent) === -1) {
        result: prevState.result.push(resultValue)
      }
      else {
        this.state.result.map((item, index) => {
          if (item.questionContent === resultValue.questionContent) {
            this.state.result[index] = resultValue
          }
        }
        );
        //result:items;
      }
    }
    );

  }

  // Proceed to next step
  nextStep = () => {
    console.log("nextStep");
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    console.log("prevStep");

    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

   // Handle fields change
   handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {

    const marginRight = {
      marginRight: '0.5%'
    };

    let idx = this.state.step;
    console.log(idx);

        let nextPage;

    if (idx > (this.state.objQuestions.length - 1)) {
      nextPage = (
        <Confirm result={this.state.result} prevstep={this.prevStep}
          nextstep={this.nextStep} isScheduledPage={this.state.isScheduledPage}/>
      );
    }
    else {
      console.log("result object :", this.state.result);

          nextPage = (
            <ObjectiveQuestionStep result={this.state.result} handleOptionSelection={this.handleOptionSelection}
             prevstep={this.prevStep} nextstep={this.nextStep} answerOptions={this.state.objQuestions[idx].options} 
             count={this.state.objQuestions.length} content={this.state.objQuestions[idx].statement} id={"steps" + idx} indentid={idx}/>
          );
        }

    return (
      <div className="animated fadeIn">
      
        {nextPage}
      </div>
    );
  }
}

//export default Question
const mapStateToProps = state => {
  console.log(state.userName);
  return {
    userName : state.userName
  };
};

export default connect(mapStateToProps)(ObjectiveQuestionWizard)

//export default ObjectiveQuestionWizard;