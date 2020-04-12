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

    handleChange = input => e => {
      console.log("UsersList::",input);
      this.setState({[input]: e.target.value});
      console.log("UsersList::::",e.target.value);
  };

  render() {
    //console.log("UserName in URL:",this.state.assigneruid)
    const { step } = this.state;
    const { type } = this.state;
    const { users } = this.state;
    const values = {type,users}

    switch(step) {
      case 1:
        return (
          <QuestionType nextStep={this.nextStep}
                       handleChange={this.handleChange}
                       values={values}
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
  // console.log(state.userName);
  return {
    userName : state.userName
  };
};

export default connect(mapStateToProps)(AssignQuestion)
