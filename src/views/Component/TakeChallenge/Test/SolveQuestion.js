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
            editorWidth: "1000px",
            resultTabLabel: "JUnit Test Result"


        };
        this.getQuestionsByType = this.getQuestionsByType.bind(this);
        this.updatedEditorContent = this.updatedEditorContent.bind(this);
    }

    updatedEditorContent(newValue) {
        this.setState({ editorContent: newValue }, () => {
            console.log("after updating editorContent solveQuestin:", this.state.editorContent);
        });
    };

    handleRunTest = (e) => {
        console.log("handleRunTest for question id ", this.props);
        let quesResponseObj = {
            qId: this.state.qId,
            userInput: this.state.editorContent,
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
                    this.setState({ testCaseResults: response.data.userInput + " : " + response.data.qId });
                }
            );
    };

    handleSubmit = (event) => {

        console.log("this.props.userName handleSubmit", this.props.userName);
        let key = {
            qid: this.state.qId,
            userId: this.props.userName
        }

        let resultValue = {
            program: this.state.editorContent,
            consolidatedoutput: this.state.editorContent,
            className: "ExampleClass",
            key: key
        };

        console.log("clicked on submit new values here solveQuestion: ", this.state.editorContent);
        ScheduledChallengeDataService.submitScheduledSubQuestionResultsByUserId(resultValue)
            .then(
                response => {
                    console.log("submitScheduledSubQuestionResultsByUserId testCaseResults: ", response)
                    if (response.data) {
                        this.setState({ testCaseResults: "Test result submitted successfully" });
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

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };


    onCopy() {
        this.setState({ copied: true });
    }

    render() {

        const titleStyle = {
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
        console.log("index :", idx);

        let nextPage;

        if (this.state.isScheduledQuestion) {

            var scheduledQuestionList = "/takechallenge";
        } else {
            var scheduledQuestionList = "/subQuestionsList"; 

        }

        let backToQuestList = (
            <Row>
                <Col md="5">
                    <p style={{
                        backgroundColor: "lightblue", marginLeft: '2%',
                        fontSize: '18px', bottomRight: "40"
                    }}>result submitted successfully..</p>

                    <Link to={scheduledQuestionList}>
                        <Button style={buttonContainer} block outline color="primary" value="SUBJECTIVE">Back to QuestionList</Button>
                    </Link>
                </Col>
            </Row>
        );

        let runAndSubmitBtns = (
            <Row>
                <Col md="3">
                    <Button disabled={this.state.submitted} block outline color="primary" style={buttonContainer} onClick={this.handleSubmit}>Submit</Button>
                </Col>
                <Col md="3" className="card-header-actions mb-3 mb-xl-0">
                    <Button disabled={this.state.submitted} block outline color="primary" style={buttonContainer} onClick={this.handleRunTest}>Run Test</Button>
                </Col>
            </Row>
        );
        nextPage = (
            <div>
                <div>
                    <h1 className={cx(classes.heading)}>Solve Question</h1>
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
                                    {console.log("you are called from solveQuestion")}
                                    {this.state.submitted ? backToQuestList : null}
                                    <Row>

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