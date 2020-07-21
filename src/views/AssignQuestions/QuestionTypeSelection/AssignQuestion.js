import React, { Component } from 'react';
import QuestionType from './QuestionType';
import Questions from '../../ManageQuestion/QuestionsList/Questions';
import SelectQuestions from './SelectQuestions';
import SelectQuestionTemplate from './SelectQuestionTemplate';
import QuestionService from '../../../service/QuestionService'

import { connect } from "react-redux";
import Modals from '../../Notifications/Modals/Modals';


class AssignQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 'SELECTION_WIZARD',
      type: 'CA',
      users: 'A',
      technology: 'B',
      templateName: 'TN',
      scheduleDate: 'c',
      date: new Date(),
      status: 'Scheduled',
      templateInUse: false,
      challenge: '',
      difficultyLevel: '',
      questionList: [],
      assignQuestTempStatus: false

    }
    console.log("this.props-- SelectQuestionTemplate :", this.props.values);
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
      console.log("Dynamic Question Template is assinged this.state: ", this.state);
      const myDate = this.state.date;
      let expDate = myDate.toUTCString();

      //console.log(" questionList ---: ", this.state.seletedQuestionTemplate.questionList.toString().split(" "));

      const QuestionSchedulerCustom = {
        qidList: this.state.questionList, //@NonNull List<String> 
        assigneduidList: this.state.users.split(), //@NonNull List<String> 
        assigneruid: this.props.userName, //	private @NonNull String
        scheduleTime: expDate, //	private @NonNull Date
        status: this.state.status, //	private @NonNull String
        templateType: this.state.templateName, //	private @ String
        templateId: this.state.id, //	private @ String
        technology: this.state.technology, //	private @ String
        experience: this.state.experience, //	private @ String
        difficulty: this.state.difficultyLevel, //	private @ String
        templateName: '' //	private @ String


      }

      QuestionService.assignQuestionsByTemplate(QuestionSchedulerCustom)
        .then(
          response => {
            console.log("response--->", response.data);
            this.setState({
              assignQuestTempStatus: response.data
            })

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

  handleDate = (dateSelect) => {
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

    if (this.state.assignQuestTempStatus) {
      console.log("this.state.assignQuestTempStatus")
      return (
        <Modals message={`Dynamic QuestionTemplated assigned successfully for UserId: ${this.props.values.users}`} linkValue={"/assignQuestion/AssignedQuestion"}></Modals>
      );
    }


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


    const values = {
      type, users, technology, date, status,
      challenge, templateName, experience, difficultyLevel, templateInUse
    }

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
