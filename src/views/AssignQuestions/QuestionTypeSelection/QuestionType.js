import React, { Component } from 'react';
import { Button, Card, CardBody, Col, CardHeader, Form, Row, CardFooter, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import DatePicker from "react-datepicker";
import { Link, NavLink as RRNavLink } from "react-router-dom";
//import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';
import UsersDataService from '../../../service/UsersDataService'
import QuestionService from '../../../service/QuestionService'
import "react-datepicker/dist/react-datepicker.css";
import Modals from '../../Notifications/Modals/Modals'
import classes from "./SelectQuestions.module.css";
import cx from "classnames";

class QuestionType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChallengeFetched: false,
      users: [],
      technology: [],
      startDate: new Date(),
      templateInUse: false,
      isDynamicTempate: false,
      templateList: []
    }
    this.retrieveUsers = this.retrieveUsers.bind(this)
  }

  componentDidMount() {
    this.retrieveUsers();
    this.retrieveAllTechnology();
  }
  retrieveUsers() {
    UsersDataService.retrieveUsersByRole("CANDIDATE")
      .then(
        response => {
          console.log("***************", response.data)
          this.setState({ users: response.data })
        }
      )
  }

  retrieveAllTechnology() {
    QuestionService.retrieveAllTechnology()
      .then(
        response => {
          console.log("technology:", response.data)
          this.setState({ technology: response.data })
        }
      )
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();

  }

  submit = e => {
    e.preventDefault();
    this.props.submit();

  }

  handleChange = date => {
    // var myDate = date.toUTCString();
    console.log("UTC date ::", date);
    this.setState({
      startDate: date
    }, () => this.props.handleDate(this.state.startDate));
  };

  handleTemplateInUseChange = (event) => {
    let value = event.target.checked;
    console.log("handleTemplateInUseChange : ", value);
    this.setState({
      templateInUse: value
    });


  }
  render() {

           if (this.state.assignQuestTempStatus) {
            console.log("this.state.assignQuestTempStatus")
            return (
                <Modals message={`Question Templated assigned successfully for UserId: ${this.props.values.users}`} linkValue={"/assignQuestion/AssignedQuestion"}></Modals>
            );
        } 


    const marginDropDown = {
      marginLeft: '5px',
      marginRight: '5px',
      marginBottum: '20px'

    }
    const marginTop = {
      marginTop: '200px'
    };

    const buttonContainer = {
      backgroundColor: '#1dafe2',
      color: 'white',
    };


    const userList = this.state.users;

    console.log("this.props ------> ", this.props);
    const { handleChange, values } = this.props;
    const itemnav = values.challenge.filter((user) => user.status === "Scheduled" || user.status === "Completed");
    const unAssignedUser = userList.filter((user) => {
      return !itemnav.some((challengeRec) => { return user.userId === challengeRec.assigneduid; });
    });

    console.log("Final AssignedQuestionList", unAssignedUser);

    let usersList = unAssignedUser.length > 0
      && unAssignedUser.map((user, index) => {
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
    let quesTempComponent = (

      <Col xl="4" >
        <select style={marginDropDown} className="form-control" id="templateNameComponentSelect"
          value={values.templateName} onChange={handleChange('templateName')}>
          <option disabled selected defaultValue = "Select Question Tempalate11">Select Question Tempalate</option>
          <option>Static Template</option>
          <option>Dynamic Template</option>
        </select>
      </Col>
    );

    let experianceComponent = (
      <Col xl="4" >
        <select style={marginDropDown} className="form-control" id="experianceComponentSelect"
          value={values.experience} onChange={handleChange('experience')}>
          <option disabled selected>Select Experiance</option>
          <option>0-2</option>
          <option>2-4</option>
          <option>4-6</option>
          <option>6-8</option>
          <option>8+</option>
        </select>
      </Col>

    );

    let difficultyComponent = (
      <Col xl="4" >
        <select style={marginDropDown} className="form-control" id="difficultyLevelComponentSelect"
          value={values.difficultyLevel} onChange={handleChange('difficultyLevel')}>
          <option disabled selected defaultValue = "Select Difficulty 222" >Select Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </Col>

    );

    let submitButtonCmp = (
      <Col xs="20" sm="6">
        <Button className={cx(classes.createNxtBtn)} onClick={this.submit}>Submit</Button>
      </Col>
    )

    let nextButtonCmp = (
      <Col xs="12" sm="10">
        <Button disable='true' className={cx(classes.createNxtBtn)} onClick={this.continue}>Next</Button>
      </Col>
    )
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
                  <br></br>
                  <Row>
                    <Col md={{ span: 6 }} >
                      <input type="checkbox" value={this.state.templateInUse} onChange={this.handleTemplateInUseChange} id="inputCheckBox1" />
                      <label htmlFor="inputCheckBox1" style={marginDropDown}>Select Question Tempalate</label>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-aroun" >

                    <Col xl="4">
                      <select style={marginDropDown} className="form-control" id="exampleFormControlSelect1" value={values.users}
                        onChange={handleChange('users')} disabled={values.dropDown}>
                        <option value="A" disabled>Candidate List</option>
                        {usersList}
                      </select>
                    </Col>
                    <br></br>
                    <Col xl="4">
                      <select style={marginDropDown} className="form-control" id="exampleFormControlSelect2" value={values.technology}
                        onChange={handleChange('technology')} disabled={values.dropDown}>
                        <option value="B" disabled>Technology</option>
                        {technologyLists}
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
                            style={marginDropDown}
                            onChange={this.handleChange}
                            className="grey-border"
                            showMonthDropdown
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                          />
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                    {this.state.templateInUse ? quesTempComponent : null}
                    {experianceComponent}
                    {difficultyComponent}
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Row className="justify-content-left">
                  {console.log("values.templateName ===", values.templateName)}
                  {values.templateName === "Dynamic Template" ? submitButtonCmp : null}
                  {!(values.templateName === "Dynamic Template") ? nextButtonCmp : null}

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