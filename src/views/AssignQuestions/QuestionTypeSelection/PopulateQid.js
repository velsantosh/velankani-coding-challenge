import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup,Input } from 'reactstrap';


class PopulateQid extends Component {

    constructor(props) {
        super(props)
        this.state={
            question: this.props.question,
            qidList:[],
            message: null
        }
    }

    
     handleChange = (event) =>
    {
        //let selectedValue = event.target.value;
        let value = event.target.checked;
        console.log("valueONChange", value);
        console.log("valueONChange", event.target);
                                    if(value){
                                      //qids.push(question.id,question.id);
                                      this.props.onSelectChange(this.state.question.id);
                                    }
                                    else{
                                        this.props.onDeselect(this.state.question.id);
                                    }
        
    }

  render() {

    // const userList = usersData.filter((user) => user.id < 10)
    //const questionsList = this.state.questions
    const question = this.props.question;

   
    return (
                    <tr key={question.id}>
                      <td><input type={this.props.buttonSelect} onChange={this.handleChange}/></td>
                    <td>{question.statement}</td>
                    <td>{question.type}</td>
                    </tr>
    )
  }
}

export default PopulateQid;
