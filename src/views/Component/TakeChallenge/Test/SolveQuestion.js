import React, { Component } from 'react';
import {
    Button, Card, CardGroup, Container, CardBody, CardHeader,
    CardText, CardTitle, CardSubtitle, Col, Row, CardColumns
} from 'reactstrap';

import classes from "./testQuestion.css";
import EditorJava from '../../EditorJava';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link, NavLink as RRNavLink } from "react-router-dom";
import cx from "classnames";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap';
import TestResult from './TestResult';
import QuestionService from '../../../../service/QuestionService'
import ScheduledChallengeDataService from '../../../../service/ScheduledChallengeDataService';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from "react-redux";
import Parser from 'html-react-parser';
import AceEditor from "react-ace";
import TestTimer from './TestTimer';

class SolveQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            runtestClicked: false,
            radioSelected: 2,
            dropdownOpen: new Array(6).fill(false),
            activeTab: new Array(4).fill('1'),
            dropDownValue: 'Language',
            editorContent: '',
            questionContent: '',
            qId: this.props.location.pathname.split('/')[2],
            questions: [],
            step: 0,
            testCaseResults: '',
            submitted: false,
            isScheduledQuestion: this.props.location.state != null ? this.props.location.state.scheduledQuestions : false,
            editorHeight: '200px',
            editorWidth: "960px",
            resultTabLabel: "JUnit Test Result",
            checked: false,
            userInputValue: '',
            runTestClickCounter: 0,
            time: 0,
            isOn: false,
            start: 0,
            expectedMinutes: '120'

        };
        this.getQuestionsByType = this.getQuestionsByType.bind(this);
        this.updatedEditorContent = this.updatedEditorContent.bind(this);
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }

    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        })

        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);
    }

    stopTimer() {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }
    resetTimer() {
        this.setState({ time: 0, isOn: false })
    }

    updatedEditorContent(newValue) {
        this.setState({ editorContent: newValue }, () => {
            console.log("after updating editorContent solveQuestin:", this.state.editorContent);
        });
    };

    handleRunTest = (e) => {
        console.log("handleRunTest for question id ", this.props);
        console.log("handleRunTest this.state.userInputValue :", this.state.userInputValue);
        console.log("handleRunTest this.state.runTestClickCounter :", this.state.runTestClickCounter);
        this.setState({ checked: false });
        this.setState({ runTestClickCounter: this.state.runTestClickCounter + 1 })
        let quesResponseObj = {
            qId: this.state.qId,
            userInput: this.state.editorContent,
            userInputValues: this.state.userInputValue,
        }

        let validateProgramContent = {
            className: "ExampleClass",
            quesResponseObj: quesResponseObj,
            userId: this.props.userName

        };
        ScheduledChallengeDataService.runScheduledQuestionTestCases(validateProgramContent)
            .then(
                response => {
                    console.log("runScheduledQuestionTestCases testCaseResults: ", response.data)
                    this.setState({ testCaseResults: this.state.userInputValue + " \n " + response.data.userInput });
                }
            );
    };

    msToTime = (duration) => {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    handleSubmit = (event) => {

        const secondsRemaining = this.state.time;
        this.stopTimer();

        console.log(" total time: ", this.state.time);
        console.log(" total start: ", this.state.start);
        console.log("time tooken for the test secondsRemaining :", this.msToTime(secondsRemaining));
        const min = this.msToTime(secondsRemaining);
        let key = {
            qid: this.state.qId,
            userId: this.props.userName
        }

        let resultValue = {
            program: this.state.editorContent,
            consolidatedoutput: this.state.editorContent,
            className: "ExampleClass",
            timeTook: this.msToTime(secondsRemaining),
            clicksonRunTest : this.state.runTestClickCounter,
            compilationStatus :"",
            key: key
        };

        ScheduledChallengeDataService.submitScheduledSubQuestionResultsByUserId(resultValue)
            .then(
                response => {
                    console.log("submitScheduledSubQuestionResultsByUserId testCaseResults: ", response)
                    if (response.data) {
                        //this.setState({ testCaseResults: "Test result submitted successfully : " + this.state.runTestClickCounter });
                        this.setState({ testCaseResults: "Test result submitted successfully." });
                    }
                    else {
                        this.setState({ testCaseResults: "Test program compailation failed, and submitted successfully" });
                    }
                    this.setState({
                        submitted: true
                    });

                    this.setState({
                        resultTabLabel: "Test Status"
                    });

                }
            );
    }

    componentDidMount() {
        this.getQuestionsByType();

        this.startTimer();
        console.log(" this.state.time")

    }

    getQuestionsByType() {
        console.log("this.props", this.props);
        QuestionService.getQuestionsById(this.state.qId)
            .then(
                response => {
                    console.log("subjective questions list: SolveQuestion", response.data)
                    this.setState({ questionContent: response.data.statement });
                    this.setState({ editorContent: response.data.methodName });

                }
            );

    }
    // Proceed to next step
    nextStep = () => {
        console.log("nextStep");
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        console.log("prevStep");
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };



    onCopy() {
        this.setState({ copied: true });
    }

    handleChange = (event) => {
        //let selectedValue = event.target.value;
        let value = event.target.checked;
        console.log("valueONChange", value);
        this.setState({ checked: value });
    }

    handleTextArea = (event) => {
        //let selectedValue = event.target.value;
        let value = event.target.value;
        console.log("handleTextArea", value);
        this.setState({ userInputValue: value });
    }

    uploadFileHandler = (event) => {
        let value = event.target.checked;
        console.log("valueONChange", value);
        console.log("valueONChange", event.target);
    }

    timeOver = () => {

        //            alert("Time over");
    }

    render() {

        const TextAreaStyle = {
            width: "50%",
            height: "100%",
            marginLeft: '25%',
            marginRight: '25%',
            marginBottom: '4%',
            backgroundColor: "#F3EFEF"
        };
        const titleStyle = {
            marginBottom: '3%',
            marginLeft: '10px',
            alignText: 'right',
            padding: '1px 2px 1px 2px'
        };
        const buttonContainer = {
            marginBottom: '3%',
            //marginBottom: '20px !important',
            backgroundColor: '#1dafe2',
            color: 'white',

        };
        const cardStyle = {
            //backgroundColor: '#80808014',
            marginLeft: '0.10%'
            // border: '2px solid grey'
        };


        const testCaseStyle = {
            marginBottom: '0.25%'
        }

        let idx = this.state.step;

        let nextPage;

        if (this.state.isScheduledQuestion) {

            var scheduledQuestionList = "/takechallenge";
        } else {
            var scheduledQuestionList = "/subQuestionsList";

        }

        let userInputData = (
            <Col>
                <textarea name="description" value={this.state.userInputValue} onChange={this.handleTextArea}
                    style={TextAreaStyle} />
            </Col>
        );

        let backToQuestList = (

            <Col md="5">
                <p style={{
                    backgroundColor: "lightblue", marginLeft: '2%',
                    fontSize: '18px', bottomRight: "40"
                }}></p>
                {/* result submitted successfully.. */}
                <Link to={scheduledQuestionList}>
                    <Button style={buttonContainer} block outline color="primary" value="SUBJECTIVE">Back to QuestionList</Button>
                </Link>
            </Col>

        );

        let runAndSubmitBtns = (
            <Row>
                <Col md="3">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                        <label className="custom-file-label" htmlFor="inputGroupFile01"> Upload Code as File </label>
                    </div>
                </Col>
                <Col md="3">
                    <input type="checkbox" onChange={this.handleChange} id="inputCheckBox1" />
                    <label htmlFor="inputCheckBox1"> Test against custom input</label>
                </Col>
                <Col className="card-header-actions mb-3 mb-xl-0 col-md-2">
                    <Button disabled={this.state.submitted} block outline color="primary" style={buttonContainer} onClick={this.handleSubmit}>Submit Test</Button>
                </Col>
                <Col className="card-header-actions mb-3 mb-xl-0 col-md-2">
                    <Button disabled={this.state.submitted} block outline color="primary" style={buttonContainer} onClick={this.handleRunTest}>Run Test</Button>
                </Col>
            </Row>
        );


        nextPage = (
            <div>
                <div>

                    <Row className={cx(classes.filterContainer)}>

                        <div className="col-md-6 big-line btn-group" id="type" style={{ padding: '.5rem' }}>
                            <h1 className={cx(classes.heading)}>Solve Question</h1>

                        </div>
                        <div className="col-md-6 big-line btn-group" id="technology" style={{ padding: '.5rem', left: '18%' }}>
                            {// <TestTimer timeOver= {this.timeOver} expectedMinutes = {this.state.expectedMinutes}></TestTimer>
                            }
                        </div>
                    </Row>
                </div>

                <Container>
                    <Row>
                        <Col sm={12}>
                            <CardGroup>
                                <Col >
                                    <Card style={cardStyle}>
                                        <CardBody>
                                            { /* <CardText>{this.state.questions[idx].statement}</CardText> */}
                                            <CardText style={titleStyle}>{Parser(this.state.questionContent)}</CardText>
                                        </CardBody>
                                    </Card>
                                    <Row>
                                        <CopyToClipboard text={this.state.editorContent} >
                                            <button style={{ backgroundColor: "lightblue", marginLeft: '2%' }}>
                                                CopyToClipboard</button>
                                        </CopyToClipboard>
                                    </Row>
                                    <Card>
                                        <CardBody>
                                            <EditorJava content={this.state.editorContent} showGutter="true" updatedContent={this.updatedEditorContent} ></EditorJava>
                                        </CardBody>
                                    </Card>

                                    {!this.state.submitted ? runAndSubmitBtns : null}
                                    {this.state.submitted ? backToQuestList : null}

                                    <Row>
                                        {this.state.checked ? userInputData : null}

                                    </Row>

                                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example"  >

                                        <Tab eventKey="profile" title={this.state.resultTabLabel} >
                                            <Card style={testCaseStyle}>
                                                <CardBody class="card h-300">
                                                    <AceEditor
                                                        mode="java"
                                                        theme="eclipse"
                                                        name="junitcontent"
                                                        height={this.state.editorHeight}
                                                        width={this.state.editorWidth}

                                                        fontSize={14}
                                                        readOnly={this.props.readOnly}
                                                        showGutter={this.props.showGutter == 'true' ? true : false}
                                                        highlightActiveLine={true}
                                                        value={this.state.testCaseResults}

                                                        setOptions={{
                                                            enableBasicAutocompletion: true,
                                                            enableLiveAutocompletion: true,
                                                            enableSnippets: true,
                                                            showPrintMargin: false,
                                                            tabSize: 2,
                                                        }} />
                                                </CardBody>
                                            </Card>
                                        </Tab>

                                    </Tabs>
                                </Col>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
        return (
            <div className="animated fadeIn">
                {nextPage}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userName: state.userName
    };
};

export default connect(mapStateToProps)(SolveQuestion)