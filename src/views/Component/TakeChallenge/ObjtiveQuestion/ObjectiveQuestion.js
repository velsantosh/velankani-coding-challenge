import React, { Component} from 'react';
import {Button,Card,CardBody, CardHeader} from 'reactstrap';
import AnswerOption from './AnswerOption';
import QuestionCount from './QuestionCount';
import { Container, Row, Col } from 'reactstrap';

import QuestionContent from '../ObjectiveQuestionWizard/QuestionContent';


class ObjectiveQuestion extends Component {
    constructor(props){
        super(props);       
        this.renderAnswerOptions=this.renderAnswerOptions.bind(this);
        console.log("ObjectiveQuestion ---> Start");
        console.log(this.props);
    }

    continue = e => {
        e.preventDefault();
        this.props.nextstep();
      };

      prevStep = e =>{
        e.preventDefault();
        this.props.prevstep();
      }

    renderAnswerOptions(key) {
      
      if (key != null)
      {
        return (
          <AnswerOption
            key={key}
            answerContent={key}
            answerType={key}
            answer={this.props.answer}
            questionId={this.props.id}
            onAnswerSelected={this.props.handleOptionSelection}
            result={this.props.result}
          />
        );
      }
      }

    render(){       
      let backButtonConstruct;
      if(this.props.id != 0){
           backButtonConstruct = ( <Col  sm={{ size: '9', offset: 1 }}>                          
          <Button
          color="primary"                              
          style={{paddingLeft:"40",paddingRight:"40"}}                 
          onClick={this.prevStep}
          >Back</Button>
            </Col>);
      }
        return (
            <div key={this.props.id} className="animated fadeIn">
                 <Card>
                    <CardHeader>
                    <i className="fa fa-align-justify"></i><strong>Objetive Test</strong>                
                    </CardHeader>
                    <CardBody>
                    <QuestionCount counter={this.props.id + 1} total={this.props.count} />
                        <QuestionContent key={this.props.id} content={this.props.content} />
                        <ul className="answerOptions">
                        {this.props.answerOptions.map(this.renderAnswerOptions)}
                        </ul>
                    <div>
                      <Container>
                        <Row>
                          <Col>
                          <Button
                            color="primary"                            
                            style={{paddingLeft:"40",paddingRight:"40"}}                            
                            onClick={this.continue}
                            >Continue</Button>
                          </Col>
                         {backButtonConstruct}
                        </Row>
                      </Container>                   
                         
                        </div>
                            
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ObjectiveQuestion;