import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import Counter from '../../AssignQuestions/QuestionTypeSelection/Counter';

class QuestionRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            showModalFlag :false,
        }
    }

    render(){
            let setModalFlag=()=> this.setState({showModalFlag:false});    
            const question = this.props.question
            const questiontype = question.type.toLowerCase();
            let questionLink ;
            let stmt ="";
            if(questiontype =="subjective"){
            questionLink= `/manageQuestion/modifySubjectiveQuestion`;
            }
            if(questiontype =="objective"){
              questionLink= `/manageQuestion/modifyObjectiveQuestion`;
            }
            console.log("question",question);
            if(question.statement !=null){
                stmt = question.statement.substr(0,30);
            }
            
           var newStmt = `${stmt}...`
            
            return (
              <tr key={this.props.key}>
                <th scope="row" onClick ={this.props.clickEvent}>
                  <Link to={questionLink}>{question.title}</Link></th>
                  <td onClick={()=>this.setState({showModalFlag:true})} className="headingPrimary"><Link>{Parser(newStmt)}</Link></td>
                              <Counter show={this.state.showModalFlag}
                                      onHide={setModalFlag} statement={question.statement}></Counter>
                <td>{question.type}</td>
                <td>{question.difficulty}</td>
                <td>{question.experience}</td>
              </tr>
            )
          
    }
}
export default QuestionRow