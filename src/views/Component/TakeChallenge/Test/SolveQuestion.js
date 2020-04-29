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
            submitted: false
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
            userId: "admin@abc.com"
        };
        ScheduledChallengeDataService.runScheduledQuestionTestCases(validateProgramContent)
            .then(
                response => {
                    console.log("subjective questions testCaseResultss: ", response.data)
                    this.setState({ testCaseResults: response.data.userInput + " : " + response.data.qId });
                }
            );
    };

    handleSubmit = (event) => {

        let key = {
            qid: this.state.qId,
            userId: "admin@abc.com"//userId : this.props.userId            
        }

        let resultValue = {
            program: this.state.editorContent,
            consolidatedoutput: this.state.editorContent,
            className: "ExampleClass",
            key: key
        };

        console.log("clicked on submit new values here : ", this.state.editorContent);
        ScheduledChallengeDataService.submitScheduledSubQuestionResultsByUserId(resultValue)
            .then(
                response => {
                    console.log("subjective questions testCaseResultss: ", response.data)
                   // this.setState({ testCaseResults: response.data.userInput + " : " + response.data.qId });
                    this.setState({
                        submitted: true
                    });

                }
            );
    }

    componentDidMount() {
        this.getQuestionsByType();
    }

    getQuestionsByType() {
        console.log("this.props", this.props);
        QuestionService.getQuestionsById(this.state.qId)//"SubX98154X1587617024133")
            .then(
                response => {
                    console.log("subjective questions list: ", response.data)
                    const { question } = response.data;
                    this.setState({ questionContent: response.data.statement });
                    // this.setState({ qId: response.data.id });

                }
            );

        this.setState({
            editorContent: `public class ExampleClass{
                  public static void main(String[] str){
                    System.out.println("Start the take test");
                  }}`});
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

        const headingStyle = {
            backgroundColor: '#80808014',
            font: 'inherit',
            // border : '1px solid blue',
           // padding: '8px 10px',
            marginLeft: '10px',
            "width": "auto",
        }

        const buttonContainer = {
            marginBottom: '20px !important',
            backgroundColor: '#1dafe2',
            color: 'white',

        };
        const cardStyle = {
            backgroundColor: '#80808014',
            marginLeft: '20px'
            // border: '2px solid grey'
        };

        const titleStyle = {
            alignText: 'right',
            marginLeft: '50px',
            padding: '1px 2px 1px 2px',
            // fontWeight: 'bold'
        }
        const marginRight = {
            marginRight: '0.5%'
        };
        let idx = this.state.step;
        console.log("index :", idx);

        let nextPage;

        let backToQuestList = (
            <Row>
            <Col md="5">

                <p style={{
                    backgroundColor: "lightblue", marginLeft: '2%',
                    fontSize: '18px', bottomRight: "40"
                }}>result submitted successfully..</p>
                    <Link to="/subQuestionsList">
                        <Button  style={buttonContainer} block outline color="primary" value="SUBJECTIVE">Back to QuestionList</Button>
                    </Link>
                    </Col>
            </Row>
        );

        let runAndSubmitBtns = (
            <Row>
            <Col md="3">
                <Button disabled={this.state.submitted} active block color="primary" aria-pressed="true" style={buttonContainer} onClick={this.handleSubmit}>Submit</Button>
            </Col>
            <Col md="3" className="card-header-actions mb-3 mb-xl-0">
                <Button disabled={this.state.submitted} active block color="primary" aria-pressed="true" style={buttonContainer} onClick={this.handleRunTest}>Run Test</Button>
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
                        <Col className="mb-6" sm={9}>
                            <CardGroup>
                                <Col >
                                    <Card>
                                        <CardBody>
                                            {/* <CardTitle style={headingStyle}>Java programming</CardTitle> */}
                                            <CardSubtitle></CardSubtitle>
                                            { /* <CardText>{this.state.questions[idx].statement}</CardText> */}
                                            <CardText style={headingStyle}>{this.state.questionContent}</CardText>
                                        </CardBody>
                                    </Card>
                                    <Row>
                                        <CopyToClipboard text={this.state.editorContent} >
                                        <button style={{ backgroundColor: "lightblue", marginLeft: '2%'}}>
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
                                    <Row></Row>

                                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                        <Tab eventKey="home" title="OutPut">
                                            <Card>
                                                <CardBody>
                                                    {/* <CardTitle style={headingStyle}>OutPut</CardTitle> */}
                                                    <CardText>{this.state.testCaseResults}</CardText>
                                                </CardBody>
                                            </Card>                                            </Tab>
                                        <Tab eventKey="profile" title="Test: 0 pass/ 3 fail">
                                            <Card>
                                                <CardBody>
                                                    {/* <CardTitle style={headingStyle}>JUnit teat case Report</CardTitle> */}
                                                    <CardText>{this.state.testCaseResults}</CardText>
                                                </CardBody>
                                            </Card>
                                        </Tab>

                                    </Tabs>
                                </Col>
                            </CardGroup>
                        </Col>
                        <Col className="mb-1" sm={3}>
                            <Card>
                                <CardBody>
                                    <CardTitle>other components</CardTitle>
                                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                    <CardText>This i additional content. This content is a little bit longer.</CardText>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <CardTitle>other components </CardTitle>
                                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                    <CardText>This is a wider card to additional content. This content is a little bit longer.</CardText>
                                </CardBody>
                            </Card>
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

export default SolveQuestion;
