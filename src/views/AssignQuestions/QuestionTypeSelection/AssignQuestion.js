import React, { Component } from 'react';
import QuestionType from './QuestionType';
import Questions from '../../ManageQuestion/QuestionsList/Questions';
import SelectQuestions from './SelectQuestions';
import SelectQuestionTemplate from './SelectQuestionTemplate';
import QuestionService from '../../../service/QuestionService'

import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";


class AssignQuestion extends Component {

  state = {
    step: 'SELECTION_WIZARD',
    type: 'CA',
    users: 'A',
    technology: 'B',
    templateName: 'TN',
    scheduleDate: 'c',
    date: new Date(),
    status: 'Scheduled',
    templateInUse: false,
    challenge : ''

  }

  nextStep = () => {
    if (this.state.users === 'A' || this.state.technology === 'B') {
      alert("Select Proper Details")
    } else {

      this.setState({
        step: 'SELECTION_QUESTIONS'
      });

      if (this.state.templateName === 'Static Template') {
        this.setState({
          step: 'SELECTION_TEMPLATE'
        });
      }   
    }
  };
  
  submit = () => {
    if (this.state.users === 'A' || this.state.technology === 'B') {
      alert("Select Proper Details")
    } else {
      console.log("Dynamic Question Template is assinged to the user: ", this.state.users);
      const myDate = this.props.values.date;
      let expDate = myDate.toUTCString();

      console.log(" questionList ---: ", this.state.seletedQuestionTemplate.questionList.toString().split(" "));

      const QuestionSchedulerCustom = {
          qidList: this.state.seletedQuestionTemplate.questionList, //@NonNull List<String> 
          assigneduidList: this.props.values.users.split(), //@NonNull List<String> 
          assigneruid: this.props.userName, //	private @NonNull String
          scheduleTime: expDate, //	private @NonNull Date
          status: this.props.values.status, //	private @NonNull String
          templateType: this.props.values.templateName, //	private @ String
          templateId: this.state.seletedQuestionTemplate.id, //	private @ String
          technology: this.props.values.technology, //	private @ String
          experience: this.state.seletedQuestionTemplate.experience, //	private @ String
          difficulty: this.state.seletedQuestionTemplate.difficulty, //	private @ String
          templateName: this.state.seletedQuestionTemplate.templateName //	private @ String

      }

      QuestionService.assignQuestionsByTemplate(QuestionSchedulerCustom)
          .then(
              response => {
                  console.log("response--->", response.data)
              }
          );
      
          this.setState({
          redirectToBaseView: true
      });
  }

    
  };

  prevStep = () => {
    const { step } = this.state;
    console.log("in prevStep templateInUse", this.state.templateInUse)
    this.setState({
      step: 'SELECTION_WIZARD'
    });
  };

  handleDate = (dateSelect) =>{   
    this.setState({
      date: dateSelect
    }, () => console.log("Date", this.state.date));
  };

  handleCheckBox = (e) => {
    console.log("afser new handle handleCheckBox---->");
    console.log("handleCheckBox::", e);
    this.setState({
      templateInUse: e
    });
  };

  
  handleChange = input => e => {
    console.log("Date", this.state.date);
    console.log("UsersList::", input);
    this.setState({ [input]: e.target.value });
    console.log("UsersList::::", e.target.value);
  };

  render() {
    const { step } = this.state;
    const { type } = this.state;
    const { users } = this.state;
    const { technology } = this.state;
    const { templateName } = this.state;
    const { experience } = this.state;
    const { difficultyLevel } = this.state;
    const { date } = this.state;
    const { status } = this.state;
    const { challenge } = this.props.location.state;
    const { templateInUse } = this.state;


    const values = { type, users, technology, date, status,
       challenge, templateName, experience, difficultyLevel, templateInUse }

    switch (step) {
      case 'SELECTION_WIZARD':
        return (
          <QuestionType nextStep={this.nextStep}
            submit={this.submit}
            handleChange={this.handleChange}
            values={values}
            handleDate={this.handleDate}
            handleCheckBox={this.handleCheckBox}
          />
        )
      case 'SELECTION_QUESTIONS':
        return (
          <SelectQuestions nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            userName={this.props.userName} />
        )
      case 'SELECTION_TEMPLATE':
        return (
          <SelectQuestionTemplate nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            userName={this.props.userName} />
        )
      default:
        return <h1>success</h1>
    }
  }
}

//export default Question
const mapStateToProps = state => {
  console.log("#@#@", state.userName);
  return {
    userName: state.userName
  };
};

export default connect(mapStateToProps)(AssignQuestion)
