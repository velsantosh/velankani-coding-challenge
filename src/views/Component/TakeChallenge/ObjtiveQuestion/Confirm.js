import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import {Button,Card,CardBody, CardHeader} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import ScheduledChallengeDataService from '../../../../service/ScheduledChallengeDataService';


export class Confirm extends Component {

  confirmAndContinue = e => {
    e.preventDefault();

    console.log("from confirmAndContinue");
    ScheduledChallengeDataService.submitScheduledQuestionResultsByUserId(this.props.result)
  
  };
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

 /*
  back = e => {
    e.preventDefault();
    this.ObjectiveQuestion.prevStep();
  };
 */

  render() {

    let listSelected = this.props.result.map((item)=>{
      return (
          <ListGroupItem active>
    <ListGroupItemHeading>{item.questionContent}</ListGroupItemHeading>
            <ListGroupItemText>
                {item.selectedAnswer}
            </ListGroupItemText>
          </ListGroupItem>
      );
    }
    );
   
    return (
     
        
           <Card>
                    <CardHeader>
                    <i className="fa fa-align-justify"></i><strong>Selected Option</strong>                
                    </CardHeader>
                    <CardBody>
          <ListGroup>
            {listSelected}
          </ListGroup>
         
          <br />
        
          <div>
                      <Container>
                        <Row>
                         
                          <Col>
                          <Button
                            color="primary"                            
                            style={{paddingLeft:"40",paddingRight:"40"}}                            
                            onClick={this.confirmAndContinue}
                            >Confirm and Submit</Button>
                          </Col>
                          
                         
                        </Row>
                      </Container>    
         </div>           

</CardBody>
</Card>
       
           
    );
  }
}

export default Confirm;
