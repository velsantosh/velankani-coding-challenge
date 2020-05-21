import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup,Input } from 'reactstrap';
import Counter from './Counter';
import Parser from 'html-react-parser';

class QuestionModel extends Component {

    constructor(props) {
        super(props)
        this.state={
            qidList:[],
            message: null,
            addModelShow:false
        }
    }

    
    render() {
    let addModal=()=> this.setState({addModelShow:false});
    const question = this.props.question;
    console.log("Question ID in type:",question.id)
    var stmt = question.statement;
    if(stmt) stmt=stmt.substr(0,30);
    var newStmt = `${stmt}...`
    
    return (
                    <tr key={question.id}>
                      <td>{question.title}</td>
                    <td onClick={()=>this.setState({addModelShow:true})} className="headingPrimary"><Link>{Parser(newStmt)}</Link></td>
                    <Counter show={this.state.addModelShow}
                            onHide={addModal} statement={question.statement}></Counter>
                    <td>{question.technology}</td>
                    <td>{question.type}</td>
                    
                    </tr>
    )
    
      
  }
}

export default QuestionModel;
