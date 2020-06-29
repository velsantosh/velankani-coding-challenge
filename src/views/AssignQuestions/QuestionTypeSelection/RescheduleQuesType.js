import React, { Component} from 'react';
import {Button, Card, CardBody, Col, CardHeader, Form, Row, CardFooter, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import DatePicker from "react-datepicker";
import { Link, NavLink as RRNavLink } from "react-router-dom";
//import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';
import UsersDataService from '../../../service/UsersDataService'
import QuestionService from '../../../service/QuestionService'
import "react-datepicker/dist/react-datepicker.css";
import classes from "./SelectQuestions.module.css";
import cx from "classnames";

export class RescheduleQuesType extends Component {
    constructor(props){
        super(props);
        this.state = {
          isChallengeFetched : false,
          users:[],
          technology:[],
          startDate: new Date()
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

  handleChange = date => {
    // var myDate = date.toUTCString();
    // console.log("UTC date ::",myDate);
    this.setState({
      startDate: date
    },()=>this.props.handleDate(this.state.startDate));
  };

    render(){

      const marginTop ={
        marginTop: '100px'
      };
      
      const buttonContainer = {
        backgroundColor :'#1dafe2',
        color:'white',
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
                    <Row  className="justify-content-center" >
                    <Col xl="4">
                    <select  className="form-control" id="exampleFormControlSelect1" value={values.technology} onChange={handleChange('technology')} disabled={values.techdropDown}>
                      <option value="B" disabled>Technology</option>
                        {technologyLists}
                    </select> 
                    </Col>
                    <br></br>
                    <Col xl="4">        
                    <select  className="form-control" id="exampleFormControlSelect1" value={values.users} onChange={handleChange('users')} disabled={values.dropDown}>
                    <option value="A" disabled>Candidate List</option>
                    {usersList}
                    </select>
                    </Col>
                    <br></br>
                    <Col xl="4"> 
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend" >
                        <InputGroupText>
                          <i className="icon-calendar"></i>
                        </InputGroupText>
                     
                     <DatePicker
                        selected={values.date}
                        onChange={this.handleChange}
                        className="grey-border"
                        
                        showMonthDropdown
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    {/* <Input type="date" placeholder="Select Date" onChange={handleChange('scheduleDate')} value={values.scheduleDate}/> */}
                    </InputGroupAddon>  </InputGroup>
                    </Col>
                    </Row> 
                    
                  </Form>
          </CardBody>
          <CardFooter>
                    <Row className="justify-content-left">
                        <Col xs="12" sm="6">
                        <Button className={cx(classes.createNxtBtn)} onClick={this.continue}>Next</Button>
                          
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

export default RescheduleQuesType
