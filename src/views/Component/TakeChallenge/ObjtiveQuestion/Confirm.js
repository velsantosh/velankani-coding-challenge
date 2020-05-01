import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Button, Card, CardBody, CardHeader, CardGroup } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import ScheduledChallengeDataService from '../../../../service/ScheduledChallengeDataService';
import { Link } from "react-router-dom";

import {
  PopupboxManager, PopupboxContainer
} from 'react-popupbox';
import Parser from 'html-react-parser';

export class Confirm extends Component {

  constructor(props) {

    super(props)
    console.log("from confirmAndContinue this.props", props);

    this.state = {
      value: false,
      questionLink: '/subQuestionsList'
    }
  }
  confirmAndContinue = e => {
    e.preventDefault();

    console.log("from confirmAndContinue this.props.result", this.props.result.length);
    ScheduledChallengeDataService.submitScheduledQuestionResultsByUserId(this.props.result)
      .then(
        response => {         
          this.setState({ value: true });
          const count = this.props.result.length;
          if (count > 2 )
           this.setState({ questionLink: '/takechallenge' }); 
        });

  };
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };
  componentDidMount() {

  }
  
  render() {

    const marginRight = {
      marginRight: '0.5%',
      marginLeft: '6%'
    };
    let listSelected = this.props.result.map((item) => {
      return (
        <ListGroupItem active>
          <ListGroupItemHeading>{Parser(item.questionContent)}</ListGroupItemHeading>
          <ListGroupItemText>
            {item.selectedAnswer}
          </ListGroupItemText>
        </ListGroupItem>
      );
    }
    );

    let backtoQuestionlist = (

      <Row>
        <p style={{
          backgroundColor: "lightblue", marginLeft: '6%',
          fontSize: '18px'
        }}>result submitted successfully..</p>
        <abbr class="no-border" style={marginRight} >

          <Link to={this.state.questionLink}>
            <Button
              color="primary"
              style={{ paddingLeft: "40", paddingRight: "40" }}>Back to QuestionList</Button>
          </Link>
        </abbr>
      </Row>
    );

    let submitAndConfirm = (
      <Row>
        <Col>
          <Button disabled={this.state.value}
            color="primary"
            style={{ paddingLeft: "40", paddingRight: "40" }}
            onClick={this.confirmAndContinue}
          >Confirm and Submit</Button>
        </Col>
      </Row>
    );
    return (
      <Card>
        <CardHeader>
          <strong>Selected Option</strong>
        </CardHeader>
        <CardBody>
          <ListGroup>
            {listSelected}
          </ListGroup>
          <br />
          <div>
            <Container>
              <div>
                <Row className="">
                  <CardGroup>
                    {!this.state.value ? submitAndConfirm : null}
                    {this.state.value ? backtoQuestionlist : null}
                  </CardGroup>
                </Row>
              </div>
            </Container>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Confirm;
