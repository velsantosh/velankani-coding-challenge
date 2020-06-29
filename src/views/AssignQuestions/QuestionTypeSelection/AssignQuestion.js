import React, { Component } from 'react';
//import { Button, Card, CardBody, Col, CardHeader, Form, Row } from 'reactstrap';
//import styled from "@emotion/styled";
//import Dropdowns from '../Dropdowns/Dropdowns';
//import { Link } from 'react-router-dom';
//import Paginations from './Paginations';
//import Typography from './Typography';
import QuestionType from './QuestionType';
import Questions from '../../ManageQuestion/QuestionsList/Questions';
import SelectQuestions from './SelectQuestions';

import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";


class AssignQuestion extends Component {
      
    state = {
        step: 1,
        type:'CA',
        users:'A',
        technology:'B',
        scheduleDate:'c',
        date: new Date(),
        status:'Scheduled'
    }

    nextStep = () => {
      if(this.state.users ==='A' || this.state.technology ==='B'){
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

  render() {
    console.log("UserName in URL:",this.state.date)
    const { step } = this.state;
    const { type } = this.state;
    const { users } = this.state;
    const { technology } = this.state;
    const { date } = this.state;
    const { status } = this.state;
    const {challenge} = this.props.location.state;
    const values = {type,users,technology,date,status,challenge}

    switch(step) {
      case 1:
        return (
          <QuestionType nextStep={this.nextStep}
                       handleChange={this.handleChange}
                       values={values}
                       handleDate={this.handleDate}
          />
        )
        case 2:
        return (
          <SelectQuestions nextStep={this.nextStep}
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

export default connect(mapStateToProps)(AssignQuestion)
