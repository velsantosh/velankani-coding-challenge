import React, { Component } from 'react';
//import { Button, Card, CardBody, Col, CardHeader, Form, Row } from 'reactstrap';
//import styled from "@emotion/styled";
//import Dropdowns from '../Dropdowns/Dropdowns';
//import { Link } from 'react-router-dom';
//import Paginations from './Paginations';
//import Typography from './Typography';
import RescheduleQuesType from './RescheduleQuesType';
import Questions from '../../ManageQuestion/QuestionsList/Questions';
import SelectQuestions from './SelectQuestions';
import QuestionService from '../../../service/QuestionService'

import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import RescheduleQuestions from './RescheduleQuestions';

export class RescheduleChallenge extends Component {
    state = {
        step: 1,
        type:'CA',
        users:'A',
        technology:'B',
        scheduleDate:'c',
        date: new Date(this.props.location.state.challenge.scheduleTime),
        questions: []
        
    }

    nextStep = () => {
      const{ step } = this.state;
      this.setState({
      step: step + 1
    });
  };

    prevStep = () =>{
      const{ step } = this.state;
      this.setState({
      step: step - 1
    });
  };

  handleDate = (dateSelect) =>{
   
    this.setState({
    date: dateSelect
  },()=>  console.log("Date",this.state.date));
};
    handleChange = input => e => {
      console.log("Date",this.state.date);
      console.log("UsersList::",input);
      this.setState({[input]: e.target.value});
      console.log("UsersList::::",e.target.value);
  };

  componentDidMount() {
    
      //let dateOne = new Date(this.props.location.state.challenge.scheduleTime);
      //console.log("Reschedule Date ::",dateOne)
      // let finalDate = date;
      // if (date != null) {
      //  finalDate=date.substr(0,date.indexOf("T"));
      // }
    //   console.log("Final Date Format", finalDate);
    //   let dateM = new Date(finalDate);
    // if (!isNaN(dateM.getTime())) {
    //     // Months use 0 index.
    //     let month = dateM.getMonth()+1
    //     sDate= dateM.getFullYear() +'-' + month + '-' + dateM.getDate();
    // }
    //   console.log("Date Format", sDate);
    this.getQuestionsByChallengeId(this.props.location.state.challenge.challengeid);
    // this.setState({
    //     date:dateOne
    //   });
}

getQuestionsByChallengeId(challengeid) {
    QuestionService.getQuestionsByChallengeId(challengeid)
      .then(
        response => {
          this.setState({ questions: response.data })
        }
      )
}
  render() {
    //console.log("UserName in URL:",this.state.assigneruid)
    const { step } = this.state;
    const { type } = this.state;
    const {date}  = this.state;
    const { questions } = this.state;

     //let ques = questions[0].technology;
    let technology;
    questions.map((tech)=> technology=tech.technology)
    console.log("Scheduled Technology:: ",technology);

    const status  = this.props.location.state.challenge.status;
    const dropDown = true;
    const techdropDown = true;
    const challengeid = this.props.location.state.challenge.challengeid;
    const users = this.props.location.state.challenge.assigneduid;
    
    //var scheduleDate=scheduleDate.substr(0,scheduleDate.indexOf("T"));
    const values = {type,users,technology,date,status,dropDown,challengeid,questions,techdropDown}
    
    console.log("Scheduled Modified",date);
    switch(step) {
      case 1:
        return (
          <RescheduleQuesType nextStep={this.nextStep}
                       handleChange={this.handleChange}
                       values={values}
                       handleDate={this.handleDate}
          />
        )
        case 2:
        return (
            <RescheduleQuestions nextStep={this.nextStep}
          prevStep={this.prevStep}
           handleChange={this.handleChange}
           values={values}
           userName ={this.props.userName}/>
        )
        default:
            return <h1>success</h1> 
    }
  }
}

//export default Question
const mapStateToProps = state => {
   console.log("#@#@",state.userName);
  return {
    userName : state.userName
  };
};

export default RescheduleChallenge
