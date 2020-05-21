import React, { Component } from 'react';
import { Link,  withRouter, Redirect } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup, Input, Container } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
import classes from "./SelectQuestions.module.css";
import cx from "classnames";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import parse from 'html-react-parser';
import Parser from 'html-react-parser';
import ChallengeRow from './ChallengeRow'
// import usersData from './UsersData'

class AssignedQuestion extends Component {

  constructor(props) {
    super(props)
    this.state = {
      challengeRec: [],
      type: '',
      selectedType :'',
      selectedTechnology :'',
      activeType :'subjective',
      activeTechnology :'java',
      redirectToAssign:false
    }
    this.redirectAssign = this.redirectAssign.bind(this)
  }

  componentDidMount() {
    this.getChlngRecByAssignerId(this.props.userName.length > 0 && this.props.userName);
  }
 
  getChlngRecByAssignerId(assignerId) {
    QuestionService.getChlngRecByAssignerId(assignerId)
      .then(
        response => {
          this.setState({ challengeRec: response.data })
        }
      )
  }

  redirectAssign() {
    this.setState({ redirectToAssign: true })
    
  }
  
  render() {
    const marginRight = {
      marginRight: '3%'
    }
   
    // const userList = usersData.filter((user) => user.id < 10)
    const challengeList = this.state.challengeRec;
    const redirectToAssign = this.state.redirectToAssign;
    if(redirectToAssign){
      return (
        // <Redirect from="/login" to="/manageUser/UserList" />
        <Redirect to={{
                         pathname: '/assignQuestion/AssignQuestion',
                         state: { challenge: challengeList }
                      }}
/>
      );
    }

    return (
      <div className="animated fadeIn">
        <Container>
          <Row xs={2} md={4} lg={6}>
            <Col md={{ span: 6, offset: 10 }}>
               <Button className="btn btn-primary mb-1" className={cx(classes.createBtn)} onClick={this.redirectAssign.bind()}>Assign Question</Button>
            </Col>
          </Row>

          <Row xs="12" className="justify-content-center">
            <Col xl={10}>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th scope="col" className="headingPrimary">CANDIDATE ID</th>
                    <th scope="col" className="headingPrimary">SCHEDULE TIME</th>
                    <th scope="col" className="headingPrimary">CHALLENGE STATUS</th>
                    <th scope="col" className="headingPrimary">ACTION</th>
                    
                    {/* <th scope="col" className="headingPrimary">EXPECTED TIME</th> */}
                  </tr>
                </thead>
                <tbody>
                  {challengeList.map((challenge, index) =>
                    <ChallengeRow key={index} question={challenge}/>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userName
  };
};

export default connect(mapStateToProps)(AssignedQuestion)


