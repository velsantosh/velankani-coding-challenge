import React, { Component} from 'react';
import {Button, Card, CardBody, Col, CardHeader, Form, Row, CardFooter} from 'reactstrap';
import { Link, NavLink as RRNavLink } from "react-router-dom";
//import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';
import UsersDataService from '../../../service/UsersDataService'


class QuestionType extends Component {
    constructor(props){
        super(props);
        this.state = {
          isChallengeFetched : false,
          users:[]
        }
        this.retrieveUsers = this.retrieveUsers.bind(this)
    }

    componentDidMount(){
      this.retrieveUsers();
  }
  retrieveUsers(){
    UsersDataService.retrieveUsersByRole("CANDIDATE")
      .then(
          response => {
              console.log("***************",response.data)
              this.setState({users:response.data})
          }
      )
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
    
  }
    render(){
      const userList = this.state.users;
      const { handleChange, values } = this.props; 
      let usersList = userList.length > 0
    	&& userList.map((user, index) => {
      return (
        <option key={index} value={user.userName}>{user.userName}</option>
      )
    }, this);
      //console.log("state data ", this.state.responsedata);
        return (
            <div className="animated fadeIn">
            <Row xs="6" className="justify-content-center">
              <Col xs="6">
              <Card>
              <CardHeader className="bg-primary mb-12">
                <strong><i className="icon-info pr-1"></i>Assign Questions</strong>
                </CardHeader>
                <CardBody>
            
                <Form name="registerform" className="registerform" >
                {/* <p>Select Subject challenge  - This type of test consists of one coding test. To solve the challenge click on below link.</p> */}
                 
                    <select  className="form-control" id="exampleFormControlSelect1" value={values.type} onChange={handleChange('type')}>
                      <option value="CA" disabled>Question Type</option>
                        <option key={2} value={"OBJECTIVE"}>{"Objective"}</option>
                        <option key={3} value={"SUBJECTIVE"}>{"Subjective"}</option>
                    </select> 
                    <br></br> 
                    {/* <select  className="form-control" id="exampleFormControlSelect1" value={values.technology} onChange={handleChange('users')}>
                      <option value="C" disabled>Select Candidate</option>
                        <option key={2} value={"Java"}>{"Java"}</option>
                        <option key={3} value={".Net"}>{".Net"}</option>
                        <option key={4} value={"C"}>{"C"}</option>
                    </select> 
                    <br></br>        */}
                    <select  className="form-control" id="exampleFormControlSelect1" value={values.users} onChange={handleChange('users')}>
                    <option value="A" disabled>Users List</option>
                    {usersList}
                    </select>
                    <br></br> 
                    
                  </Form>
          </CardBody>
          <CardFooter>
                    <Row className="justify-content-left">
                        <Col xs="12" sm="6">
                        <Button className="btn-success mb-1" onClick={this.continue}>Next</Button>
                          
                          {/* <span> </span>
                          <Link to="/manageQuestion/questionList">
                          <Button className="btn-danger mb-1" >Cancel</Button>
                          </Link> */}
                        </Col>
                    </Row>
                    </CardFooter>
        </Card>
        </Col>
        </Row> 
            
            </div>
        );
    }
}

export default QuestionType;