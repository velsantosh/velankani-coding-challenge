import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup,Input } from 'reactstrap';
import Counter from './Counter'

class PopulateQid extends Component {

    constructor(props) {
        super(props)
        this.state={
            question: this.props.question,
            qidList:[],
            message: null,
            addModelShow:false
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
    let addModal=()=> this.setState({addModelShow:false});
    
    // const userList = usersData.filter((user) => user.id < 10)
    //const questionsList = this.state.questions
    const question = this.props.question;
    console.log("Question ID in type:",question.id)
    var stmt = question.statement;
    if(stmt) stmt=stmt.substr(0,50);
    var newStmt = `${stmt}...`
    //const userLink1 = `/assignQuestion/popUp/${question.statement}`
   
    return (
                    <tr key={question.id}>
                      <td><input type={this.props.buttonSelect} onChange={this.handleChange}/></td>
                      <td>{question.title}</td>
                    <td onClick={()=>this.setState({addModelShow:true})} className="headingPrimary"><Link>{newStmt}</Link></td>
                    <Counter show={this.state.addModelShow}
                            onHide={addModal} statement={question.statement}></Counter>
                    <td>{question.type}</td>
                    <td>{question.difficulty}</td>
                    </tr>
    )
  }
}

export default PopulateQid;
