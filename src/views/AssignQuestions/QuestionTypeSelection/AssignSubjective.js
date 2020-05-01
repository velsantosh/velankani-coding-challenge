import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup,Input } from 'reactstrap';
import Counter from './Counter';
import Parser from 'html-react-parser';


class AssignSubjective extends Component {

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
    }
  render() {
    let addModal=()=> this.setState({addModelShow:false});
    // const userList = usersData.filter((user) => user.id < 10)
    //const questionsList = this.state.questions
    const question = this.props.question;
    var stmt = question.statement;
    if(stmt) stmt=stmt.substr(0,30);
    var newStmt = `${stmt}...`
   
    
    return (
                
                    <tr key={question.id}>
                      <td><input type="radio" name="optradio" onClick={this.handleChange}/></td>
                      <td>{question.title}</td>
                    <td onClick={()=>this.setState({addModelShow:true})} className="headingPrimary"><Link>{Parser(newStmt)}</Link></td>
                    <Counter show={this.state.addModelShow}
                    onHide={addModal} statement={question.statement}></Counter>
                    <td>{question.difficulty}</td>
                    <td>{question.expectedTime}</td>
                    </tr>
    )
  }
}

export default AssignSubjective;
