import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup,Input } from 'reactstrap';
import Counter from './Counter';
import Parser from 'html-react-parser';

class PopulateQid extends Component {

    constructor(props) {
        super(props)
        this.state={
            question: this.props.question,
            qidList:[],
            message: null,
            addModelShow:false,
            isChecked: true
        }
    }

    componentDidMount() {
        this.setState({
          isChecked: this.props.defaultChecked
       });
    }
     handleChange = (event) =>
    {
        //let selectedValue = event.target.value;
        let value = event.target.checked;
        console.log("valueONChange Objective", value);
        console.log("valueONChange ", event.target);
        this.setState({
          isChecked: !this.state.isChecked,
        },()=> {
                                    if(value){
                                      //qids.push(question.id,question.id);
                                      this.props.onSelectChange(this.state.question.id);
                                    }
                                    else{
                                        this.props.onDeselect(this.state.question.id);
                                    }
                                  } );
    }

  render() {
    let addModal=()=> this.setState({addModelShow:false});
    const question = this.props.question;
    console.log("Question ID in type:",question.id)
    var stmt2=''+question.statement;
           var stmt3= Parser(stmt2);
    var stmt = question.statement;
    if(stmt) stmt=stmt.substr(0,30);
    var newStmt = `${stmt}...`
    
    return (
                    <tr key={question.id}>
                      <td><input type="checkbox" onChange={this.handleChange} checked={this.state.isChecked}/></td>
                      <td>{question.title}</td>
                      <td>{question.topic}</td>
                    <td onClick={()=>this.setState({addModelShow:true})} className="headingPrimary"><Link>{Parser(newStmt)}</Link></td>
                    <Counter show={this.state.addModelShow}
                            onHide={addModal} statement={stmt3}></Counter>
                    <td>{question.difficulty}</td>
                    <td>{question.experience}</td>
                    </tr>
    )
    
      
  }
}

export default PopulateQid;
