import React, { Component } from 'react';
//import { Button, Card, CardBody, Col, CardHeader, Form, Row } from 'reactstrap';
//import styled from "@emotion/styled";
//import Dropdowns from '../Dropdowns/Dropdowns';
//import { Link } from 'react-router-dom';
//import Paginations from './Paginations';
//import Typography from './Typography';
import AddQuestion from './AddQuestion';
import Tabs from '../Tabs/Tabs';
import SubjectiveQues from '../SubjectiveQues/SubjectiveQues';
import ObjectiveQues from '../ObjectiveQues/ObjectiveQues';



class Question extends Component {
      
    state = {
        step: 1,
        technology: 'C',
        type:'CA',
        experience: 'CB'
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
      this.setState({[input]: e.target.value});
  };

  render() {
    const { step } = this.state;
    const { technology, experience, type } = this.state;
    const values = {technology, type, experience}

    switch(step) {
      case 1:
        return (
          <AddQuestion nextStep={this.nextStep}
                       handleChange={this.handleChange}
                       values={values}
          />
        )
      case 2:
        console.log(this.state.type);
        if(this.state.type === "OBJECTIVE"){
          return (
            <ObjectiveQues nextStep={this.nextStep}
                        prevStep={this.prevStep}
                         handleChange={this.handleChange}
                         values={values}
            />
          ) }
          else{
            return(
            <SubjectiveQues nextStep={this.nextStep}
            prevStep={this.prevStep}
             handleChange={this.handleChange}
             values={values}
            />
            )}
        case 3:
          if(this.state.type === "SUBJECTIVE"){
        return (
          <Tabs nextStep={this.nextStep}
                      prevStep={this.prevStep}
                       handleChange={this.handleChange}
                       values={values}
          />
        ) }
        else{
          return <h1>success</h1>
        }
        case 4:
        return <h1>success</h1>
        default:
            return <h1>success</h1> 
    }
  }
}


export default Question
