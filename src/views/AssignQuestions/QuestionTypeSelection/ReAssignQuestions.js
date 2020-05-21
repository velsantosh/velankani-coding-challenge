import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, Form, CardGroup, Input } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
import PopulateQid from './PopulateQid';
import AssignSubjective from './AssignSubjective';
import classes from "./SelectQuestions.module.css";
import cx from "classnames";
import Modals from '../../Notifications/Modals/Modals';
import PopulateAll from './PopulateAll';
import { connect } from "react-redux";


class ReAssignQuestions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      qidList: [],
      message: null,
      userList: "",
      type: 'ALL',
      flag: true,
      redirectToBaseView: false,
      selectedTechnology: "",
      scheduleDate:"",
      status:"Scheduled",
      challengeid:""
    }
    this.getQuestionsByTech = this.getQuestionsByTech.bind(this)
  }

  componentDidMount() {
    if (Object.keys(this.props.scheduledRequestData).length >0 && this.props.values == null) {
      let UserList =[]
      UserList.push(this.props.scheduledRequestData.candidateEmailId)
      this.setState({
        selectedTechnology: this.props.scheduledRequestData.technology,
        userList: UserList
      }, () => {
        this.getQuestionsByTech()
      });

    }
    else {
      this.setState({
        selectedTechnology: this.props.values.technology,
        userList: [this.props.values.users],
        scheduleDate:this.props.values.scheduleDate,
        status: this.props.values.status,
        challengeid:this.props.values.challengeid
      }, () => { this.getQuestionsByTech();
                console.log("Assigned Date to Test",this.state.scheduleDate) });

    }


  }

  selectedType = (e) => {
    let type = e.target.value;
    if (type === "ALL") {
      this.setState({ type: type })
      this.getQuestionsByTech();

    } else {
      QuestionService.getQuestionsByTypeTech(e.target.value, this.state.selectedTechnology)
        .then(
          response => {
            this.setState({ questions: response.data}, () => console.log("clean list", this.state.qidList))
            this.setState({ type: type })
          }
        );
    }
  }

  getQuestionsByTech() {
    QuestionService.getQuestionsByTech(this.state.selectedTechnology)
      .then(
        response => {
          this.setState({ questions: response.data, qidList: [] }, () => console.log("clean list", this.state.qidList))
        }
      )
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();

  }

  handleSelectChange = (selectedValue) => {
    console.log("qwerty", selectedValue);
    this.setState({
      qidList: [...this.state.qidList, selectedValue]
    },
      () => {
        console.log("Selected Objective Q List", this.state.qidList);
        this.setState({ flag: false })
      });
  }

  handleSubjectiveChange = (selectedValue) => {
    console.log("Subjective radio", selectedValue);
    this.setState({ qidList: [selectedValue] },
      () => {
        console.log("Selected Subjective Q list", this.state.qidList);
        this.setState({ flag: false })
      });
  }

  removeQuestion = itemId => {
    console.log("ItemId::", itemId);
    const items = this.state.qidList.filter(item => item !== itemId);
    this.setState({ qidList: items },
      () => {
        console.log("Removed UserId", this.state.qidList);
        if (this.state.qidList === []) {
          this.setState({ flag: true })
        }
      });
  }

  contactSubmit(e) {
    console.log("Question Detials:", this.state.userList)
    e.preventDefault();
    //this.addQuestion();
  }

  addQuestion() {
    let qidSize = this.state.qidList
    const uniqueSet = new Set(this.state.qidList);
    console.log("final Question List",uniqueSet)
    const selectedQues = [...uniqueSet];
    if (this.state.qidList.length !== 0) {
      
      let data = {
        "qidList": selectedQues,
        "assigneduidList": this.state.userList,
        "assigneruid":  this.props.userName,
        "scheduleTime": this.state.scheduleDate,
        "status":this.state.status,
        "challengeid":this.state.challengeid
      }

      QuestionService.getAllSchQuestionsByUserId(this.state.userList).then(response => {
        let assignQidList = response.data;
        console.log("assign List Data", response.data)
        let assignList = assignQidList.filter((ques) => {
          return this.state.qidList.includes(ques.id);
        });
        console.log("assignList length", assignList.length)
        if (assignList.length === 0) {
          this.assignQuestion(data);
        }
        else {
          alert("Already Question Assigned")
        }
      }
      )
    }
    else {
      alert("Select atleast one question");
    }
  }

  assignQuestion(data) {
    QuestionService.assignObjQuestion(data)
      .then(response => {
        console.log("UserResponse : ", response.status)
        if (response.status === 200) {
          this.setState({...this.state, redirectToBaseView: true })
        } else {
          console.log("UserResponse : ", response.data)
          this.props.history.push(`/404`)
        }
      }
      )
  }

  render() {

    const marginTop = {
      marginTop: '20px'
    }

    const text = {
      textAlign: 'right',
      marginRight: '7%'
    }

    const buttonContainer = {
      marginRight: '0.5%',
      marginTop: '20px',
      backgroundColor: '#1dafe2',
      color: 'white',
    };
    const marginRight = {
      marginBottom: '10px',
      marginRight: '0.5%'
    };

    const marginLeft = {
      marginBottom: '5px',
      marginLeft: '0.5%'
    };

    const redirectToBaseView = this.state.redirectToBaseView;
    if (redirectToBaseView === true) {
      return (
        <Modals message={`Question assigned succesfully`} linkValue={"/assignQuestion/AssignedQuestion"}></Modals>
      );
    }
    
    let questionsList = this.state.questions;
    let type = this.state.type;
    console.log("Selected Q Type", type)
    
    if (type === "SUBJECTIVE") {
      return (
        <div className="animated fadeIn" style={marginTop}>
          <h4 style={text} className = "headingPrimary"><i>Candidate-Id : <strong><u>{this.state.userList}</u></strong></i></h4> 
          
          <Row style={marginLeft}>
           <h4 style={marginRight}>Type</h4>
            <abbr className="no-border" style={marginRight} >
              <Button block outline color="primary" onClick={this.selectedType} value="ALL"
                className={this.state.type === "ALL" ? classes.showActive : ""
                }
              >ALL</Button>
            </abbr>

            <abbr className="no-border" style={marginRight} >
              <Button block outline color="primary" onClick={this.selectedType} value="SUBJECTIVE"
                className={this.state.type === "SUBJECTIVE" ? classes.showActive : ""
                }
              >Subjective</Button>
            </abbr>


            <abbr className="no-border" style={marginRight} >
              <Button block outline color="primary" onClick={this.selectedType} value="OBJECTIVE"
                className={this.state.type === "OBJECTIVE" ? classes.showActive : ""
                }>Objective</Button>
            </abbr>
          </Row>

          <Row xs="12" className="justify-content-center">
            <Col xl={10}>
              <Form name="registerform" className="registerform" onSubmit={this.contactSubmit.bind(this)} >
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <th scope="col" className="headingPrimary"></th>
                      <th scope="col" className="headingPrimary">TITLE</th>
                      <th scope="col" className="headingPrimary">TOPIC</th>
                      <th scope="col" className="headingPrimary">STATEMENT</th>
                      <th scope="col" className="headingPrimary">DIFFICULTY</th>
                      <th scope="col" className="headingPrimary">EXPERIENCE</th>
                      <th scope="col" className="headingPrimary">EXPECTED TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionsList.map((question, index) =>
                      <AssignSubjective key={index} question={question} onSelectChange={this.handleSelectChange} onDeselect={this.removeQuestion}/>
                    )}
                  </tbody>
                </Table>
                <Button className={cx(classes.createNxtBtn)}  onClick={this.addQuestion.bind(this)}> Assign Questions</Button>
                <Button className={cx(classes.createNxtBtn)}  onClick={this.back}>Previous</Button>

              </Form>
            </Col>
          </Row>



        </div>
      )
    }
    else if (type === "OBJECTIVE") {
      return (
        <div className="animated fadeIn" style={marginTop}>

          <h4 style={text} className = "headingPrimary"><i>Candidate-Id : <strong><u>{this.state.userList}</u></strong></i></h4> 
          
          <Row style={marginLeft}>
           <h4 style={marginRight}>Type</h4>
            <abbr className="no-border" style={marginRight} >
              <Button block outline color="primary" onClick={this.selectedType} value="ALL"
                className={this.state.type === "ALL" ? classes.showActive : ""
                }
              >ALL</Button>
            </abbr>

            <abbr className="no-border" style={marginRight} >
              <Button block outline color="primary" onClick={this.selectedType} value="SUBJECTIVE"
                className={this.state.type === "SUBJECTIVE" ? classes.showActive : ""}>
                Subjective</Button>
            </abbr>


            <abbr className="no-border" style={marginRight} >
              <Button block outline color="primary" onClick={this.selectedType} value="OBJECTIVE"
                className={this.state.type === "OBJECTIVE" ? classes.showActive : ""}>
                Objective</Button>
            </abbr>
          </Row>
          <Row xs="12" className="justify-content-center">
            <Col xl={10}>
              {/* <Card>
              <CardHeader className="bg-success mb-12">
                <i className="fa fa-align-justify"></i> Users <small className="text-white">Details</small>
              </CardHeader>
              <CardBody> */}
              <Form name="registerform" className="registerform" onSubmit={this.contactSubmit.bind(this)} >
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <th scope="col" className="headingPrimary"></th>
                      <th scope="col" className="headingPrimary">TITLE</th>
                      <th scope="col" className="headingPrimary">TOPIC</th>
                      <th scope="col" className="headingPrimary">STATEMENT</th>
                      <th scope="col" className="headingPrimary">DIFFICULTY</th>
                      <th scope="col" className="headingPrimary">EXPERIENCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionsList.map((question, index) =>
                      <PopulateQid key={index} question={question} onSelectChange={this.handleSelectChange} onDeselect={this.removeQuestion} />
                    )}
                  </tbody>
                </Table>

                {/* <i className="fa fa-dot-circle-o" ></i> */}
                {/* <i className="fa fa-ban"></i>  */}
                <Button className={cx(classes.createNxtBtn)} onClick={this.addQuestion.bind(this)}> Assign Questions</Button>
                <Button className={cx(classes.createNxtBtn)} onClick={this.back}>Previous</Button>
              </Form>
            </Col>
          </Row>



        </div>
      )
    } else if (type === "ALL") {
      console.log("Inside ALL")
      return (
        <div className="animated fadeIn" style={marginTop}>

          <h4 style={text} className = "headingPrimary"><i>Candidate-Id : <strong><u>{this.state.userList}</u></strong></i></h4> 
          
          <Row style={marginLeft}>
           <h4 style={marginRight}>Type</h4>
            <abbr className="no-border" style={marginRight} >
              <Button block outline color="primary" onClick={this.selectedType} value="ALL"
                className={this.state.type === "ALL" ? classes.showActive : ""
                }
              >ALL</Button>
            </abbr>

            <abbr className="no-border" style={marginRight} >
              <Button block outline color="primary" onClick={this.selectedType} value="SUBJECTIVE"
                className={this.state.type === "SUBJECTIVE" ? classes.showActive : ""}>
                Subjective</Button>
            </abbr>


            <abbr className="no-border" style={marginRight} >
              <Button block outline color="primary" onClick={this.selectedType} value="OBJECTIVE"
                className={this.state.type === "OBJECTIVE" ? classes.showActive : ""}>
                Objective</Button>
            </abbr>
          </Row>
          <Row xs="12" className="justify-content-center">
            <Col xl={10}>
              {/* <Card>
                              <CardHeader className="bg-success mb-12">
                                <i className="fa fa-align-justify"></i> Users <small className="text-white">Details</small>
                              </CardHeader>
                              <CardBody> */}
              <Form name="registerform" className="registerform" onSubmit={this.contactSubmit.bind(this)} >
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <th scope="col" className="headingPrimary"></th>
                      <th scope="col" className="headingPrimary">TITLE</th>
                      <th scope="col" className="headingPrimary">TOPIC</th>
                      <th scope="col" className="headingPrimary">STATEMENT</th>
                      <th scope="col" className="headingPrimary">TYPE</th>
                      <th scope="col" className="headingPrimary">DIFFICULTY</th>
                      <th scope="col" className="headingPrimary">EXPERIENCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionsList.map((question, index) =>
                      <PopulateAll key={index} question={question} onSelectChange={this.handleSelectChange} onDeselect={this.removeQuestion} buttonSelect={"checkbox"} type={type} defaultChecked={false} />
                    )}
                  </tbody>
                </Table>
                <Button className={cx(classes.createNxtBtn)} onClick={this.addQuestion.bind(this)}> Assign Questions</Button>
                <Button className={cx(classes.createNxtBtn)} onClick={this.back}>Previous</Button>
              </Form>
            </Col>
          </Row>



        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    scheduledRequestData: state.scheduledRequestData,
    userName : state.userName
  };
};

export default connect(mapStateToProps)(ReAssignQuestions)
