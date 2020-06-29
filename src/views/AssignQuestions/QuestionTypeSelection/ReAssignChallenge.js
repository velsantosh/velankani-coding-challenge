import React, { Component } from 'react';
//import { Button, Card, CardBody, Col, CardHeader, Form, Row } from 'reactstrap';
//import styled from "@emotion/styled";
//import Dropdowns from '../Dropdowns/Dropdowns';
//import { Link } from 'react-router-dom';
//import Paginations from './Paginations';
//import Typography from './Typography';
import RescheduleQuesType from './RescheduleQuesType';
import Questions from '../../ManageQuestion/QuestionsList/Questions';
import ReAssignQuestions from './ReAssignQuestions';

import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";

export class ReAssignChallenge extends Component {
    state = {
        step: 1,
        type:'CA',
        users:'A',
        technology:'B',
        scheduleDate:'c',
        date: new Date(),
        status:'',
        dropDown:false,
        challengeid:''
    }

    nextStep = () => {
      if(this.state.technology ==='B' ){
          console.log("DropDown user",this.state.users);
        alert("Select Proper Details")
      }else{
      const{ step } = this.state;
      this.setState({
      step: step + 1
    });
  }
  };

    prevStep = () =>{
      const{ step } = this.state;
      this.setState({
      step: step - 1
    });
  };

    handleChange = input => e => {
      console.log("Date",this.state.date);
      console.log("UsersList::",input);
      this.setState({[input]: e.target.value});
      console.log("UsersList::::",e.target.value);
  };

  handleDate = (dateSelect) =>{
   
    this.setState({
    date: dateSelect
  },()=>  console.log("Date",this.state.date));
};

  componentDidMount() {
         
      this.setState({
        users: this.props.location.state.challenge.assigneduid,
        status: this.props.location.state.challenge.status,
        dropDown:true,
        challengeid:this.props.location.state.challenge.challengeid
      });
}

  render() {
    //console.log("UserName in URL:",this.state.assigneruid)
    const { step } = this.state;
    const { type } = this.state;
    const { technology } = this.state;
    const { date } = this.state;
    const status  = this.props.location.state.challenge.status;
    const dropDown = true;
    const techdropDown = false;
    const challengeid = this.props.location.state.challenge.challengeid;
    const users = this.props.location.state.challenge.assigneduid;

    const values = {type,users,technology,date,status,dropDown,challengeid,techdropDown}

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
          <ReAssignQuestions nextStep={this.nextStep}
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

export default ReAssignChallenge
