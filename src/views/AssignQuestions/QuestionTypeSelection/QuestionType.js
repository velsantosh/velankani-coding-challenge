import React, { Component} from 'react';
import {Button, Card, CardBody, Col, CardHeader, Form, Row, CardFooter} from 'reactstrap';
import { Link, NavLink as RRNavLink } from "react-router-dom";
//import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';
import UsersDataService from '../../../service/UsersDataService'
import QuestionService from '../../../service/QuestionService'


class QuestionType extends Component {
    constructor(props){
        super(props);
        this.state = {
          isChallengeFetched : false,
          users:[],
          technology:[]
        }
        this.retrieveUsers = this.retrieveUsers.bind(this)
    }

    componentDidMount(){
      this.retrieveUsers();
      this.retrieveAllTechnology();
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

  retrieveAllTechnology(){
    QuestionService.retrieveAllTechnology()
      .then(
          response => {
              console.log("technology:",response.data)
              this.setState({technology:response.data})
          }
      )
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
    
  }
    render(){

      const marginTop ={
        marginTop: '100px'
      };


      const userList = this.state.users;
      const { handleChange, values } = this.props; 
      let usersList = userList.length > 0
    	&& userList.map((user, index) => {
      return (
        <option key={index} value={user.userId}>{user.userId}</option>
      )
    }, this);

    const technologyList = this.state.technology;
      let technologyLists = technologyList.length > 0
    	&& technologyList.map((technology, index) => {
      return (
        <option key={index} value={technology.technology}>{technology.technology}</option>
      )
    }, this);
      //console.log("state data ", this.state.responsedata);
        return (
            <div className="animated fadeIn align-items-center">
            <Row xl="12" className="justify-content-center" style={marginTop}>
              <Col xl="12">
              <Card className="shadow-lg mx-10">
              <CardHeader className=" mb-12">
                <strong><i className="icon-info pr-1 headingPrimary"></i>Assign Questions</strong>
                </CardHeader>
                <CardBody>
            
                <Form name="registerform" className="registerform" >
                {/* <p>Select Subject challenge  - This type of test consists of one coding test. To solve the challenge click on below link.</p> */}
                 
                    {/* <select  className="form-control" id="exampleFormControlSelect1" value={values.type} onChange={handleChange('type')}>
                      <option value="CA" disabled>Question Type</option>
                        <option key={2} value={"OBJECTIVE"}>{"Objective"}</option>
                        <option key={3} value={"SUBJECTIVE"}>{"Subjective"}</option>
                    </select>  */}
                    <br></br> 
                    <select  className="form-control" id="exampleFormControlSelect1" value={values.technology} onChange={handleChange('technology')}>
                      <option value="B" disabled>Technology</option>
                        {technologyLists}
                    </select> 
                    <br></br>       
                    <select  className="form-control" id="exampleFormControlSelect1" value={values.users} onChange={handleChange('users')}>
                    <option value="A" disabled>Candidate List</option>
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