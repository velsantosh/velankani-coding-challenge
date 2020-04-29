import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Button, CardGroup, Container, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import { Link, NavLink as RRNavLink } from "react-router-dom";
import cx from "classnames";
import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';

class TakeChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChallengeFetched: false,
      responsedata: []
    };

    console.log("takechallenge -> props:",this.props);

  }

  async componentDidMount() {
    console.log("takechallenge -> componentDidMount");
  }

  render() {

    const buttonContainer = {
      marginBottom: '20px !important',
      backgroundColor: '#1dafe2',
      color: 'white'
    };
    const cardStyle = {
      backgroundColor: '#80808014',
      marginLeft: '20px',
      border: '2px solid grey'
    };

    const titleStyle = {
      alignText: 'center',
      marginLeft: '50px',
      fontWeight: 'bold'
    }
    console.log("state data ", this.state.responsedata);
    return (
      <>
        <div>
          <h1>Complete your scheduled Question</h1>
        </div>
        <Container>
          <Row className="">
            <Col md="12">
              <CardGroup>
                <Card style={cardStyle}>
                  <CardBody>
                    <CardTitle style={titleStyle}>Programming Question</CardTitle>
                    <CardText>Take a coding challenge in various programming languages and run all test cases to validate candidate solutions.</CardText>
                    <Link
                      to={{
                        pathname: '/subQuestionsList',
                        state: {
                          scheduledQuestions: true
                        }
                      }}>
                      <Button className="btn btn-primary mb-1" style={buttonContainer}>Subjective Question Challenge</Button>
                    </Link>
                  </CardBody>
                </Card>
                <Card style={cardStyle}>
                  <CardBody>
                    <CardTitle style={titleStyle}>Mutilpe Choice Question</CardTitle>
                    <CardText>Multiple answer options with only one correct answer.</CardText>
                    <Link to="/takeobjectivetest">
                      <Button className="btn btn-primary mb-1" style={buttonContainer}>Objective Question Challenge</Button>
                    </Link>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </>
    );

  }
}

export default TakeChallenge;