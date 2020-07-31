import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, FormText, Col, Row, InputGroup, InputLabel, InputGroupAddon, InputGroupText } from 'reactstrap';
import QuestionService from '../../../service/QuestionService';
import classes from "../CreateSubjective/CreateSubjective.module.css";
import cx from "classnames";
import EditorJava from '../../Component/EditorJava';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import CKEditor from 'ckeditor4-react';
import { connect } from "react-redux";

class CreateSubjective extends Component {

    subQuestionData = {
        "title": '',
        "technology": '',
        "topic": '',
        "experience": '',
        "createdUserid": this.props.userName,
        "statement": '',
        "methodName": '',
        "expectedTime": '',
        "difficulty": 'easy',
        "junitText": ''
    }

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownOpen: new Array(6).fill(false),
            activeTab: new Array(4).fill('1'),
            editorContent: '',
            qId: '',
            disabled: true,
            testCaseContent: '',
            redirectToBaseView: false
        };
        this.updatedEditorContent = this.updatedEditorContent.bind(this);
        this.updatedTestCaseContent = this.updatedTestCaseContent.bind(this);
    }

    componentDidMount() {
        this.setState({
            editorContent: ` Class ExampleClass{
                  public static void main(String[] str){
                    System.out.println('Start the take test');
                  }}`}, () => {
            this.subQuestionData.methodName = this.state.editorContent
        });
    }

    updatedEditorContent(newValue) {
        this.subQuestionData.methodName = newValue;
        this.setState({ editorContent: newValue }, () => {
        });
    };

    updatedTestCaseContent(newValue) {
        this.setState({
            testCaseContent: newValue
        }, () => {
            this.subQuestionData.junitText = Array.from(this.state.testCaseContent)
        });
    };

    valuetext = (value) => {
        this.subQuestionData.expectedTime = value.toString();
        return `${value}`;
    }

    showFileContent = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result);
            this.setState({
                testCaseContent: text
            }, () => {
                this.subQuestionData.junitText = this.state.testCaseContent
            });
        };
        reader.readAsText(e.target.files[0])
    }

    enableTestCaseEdit = () => {
        this.setState({ disabled: !this.state.disabled });
    }

    handleTitle = (event) => {
        this.subQuestionData.title = event.target.value;
    }

    handleTechnology = (event) => {
        this.subQuestionData.technology = event.target.value;
    }
    handleExperience = (event) => {
        this.subQuestionData.experience = event.target.value;
    }
    handleTopic = (event) => {
        this.subQuestionData.topic = event.target.value;
    }
    handleDifficulty = (event) => {
        this.subQuestionData.difficulty = event.target.value;
    }
    handleStatement = (event) => {
        this.subQuestionData.statement = event.editor.getData();
    }

    addSubjectiveQuestion = () => {
        QuestionService.addSubjectiveQuestion(this.subQuestionData)
            .then(response => {
                this.setState({
                    redirectToBaseView: true
                });
            })
    }

    close = () => {
        this.setState({
            redirectToBaseView: true
        });
    }

    render() {
        this.subQuestionData.expectedTime = Slider.defaultValue;
        const buttonContainer = {
            width: '200px',
            marginRight: '10px',
            marginTop: '20px',
            marginBottom: '20px !important',
            backgroundColor: '#1dafe2',
            color: 'white'
        };

        const lableStyle = {
            fontWeight: 'bold'
        };

        const marks = [
            {
                value: 5,
                label: '5',
            },
            {
                value: 10,
                label: '10',
            },
            {
                value: 15,
                label: '15',
            },
            {
                value: 20,
                label: '20',
            },
        ];
        const redirectToBaseView = this.state.redirectToBaseView;
        if (redirectToBaseView === true) {
            return (<Redirect to="/manageQuestion/questionList" />);
        }

        return (
            <>
                <div>
                    <h1 className={cx(classes.heading)}>Create Coding Question</h1>
                </div>
                <Container>
                    <Form>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="qtitle" style={lableStyle}>Title</Label>
                                    <Input type="textbox" name="qtitle" id="qtitle" placeholder="Enter the title" onChange={(e) => this.handleTitle(e)} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="technology" style={lableStyle}>Technology</Label>
                                    <Input type="select" name="technology" id="technology" onChange={(e) => this.handleTechnology(e)}>

                                        <option disabled selected>Select Technology</option>
                                        <option>Java</option>

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="experience" style={lableStyle}>Experience</Label>
                                    <Input type="select" name="experience" id="experience" onChange={(e) => this.handleExperience(e)}>
                                        <option disabled selected>Select Experience</option>
                                        <option>0-2</option>
                                        <option>2-4</option>
                                        <option>4-6</option>
                                        <option>6-8</option>
                                        <option>8+</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="topic" style={lableStyle}>Topic</Label>
                                    <Input type="select" name="topic" id="topic" onChange={(e) => this.handleTopic(e)}>
                                        <option disabled selected>Select Topic</option>
                                        <option>J2EE</option>
                                        <option>Core Java</option>
                                        <option>OOPS</option>
                                        <option>Data Structures</option>
                                        <option>Spring</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="statement" style={lableStyle}>Question Statement</Label>
                            <CKEditor data="<p>Some initial data</p>" type="classic" onChange={(e) => this.handleStatement(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="template" style={lableStyle}>Template</Label>
                            <EditorJava content={this.state.editorContent} showGutter="true" updatedContent={this.updatedEditorContent} ></EditorJava>
                        </FormGroup>
                        <Row form>
                            <Col md="3">
                                <FormGroup>
                                    <Label for="fileUpload" style={lableStyle}>Testcase</Label>
                                    <Input type="file" name="file" id="fileUpload" onChange={(e) => this.showFileContent(e)} />
                                </FormGroup>
                            </Col>
                            <Col md="5">
                                <FormGroup>
                                    <Label for="expectedTime" style={lableStyle}>Expected Time</Label>
                                    <div className={classes.root}>
                                        <Slider
                                            defaultValue={10}
                                            getAriaValueText={this.valuetext}
                                            aria-labelledby="discrete-slider-restrict"
                                            step={null}
                                            valueLabelDisplay="auto"
                                            marks={marks}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label for="difficulty" style={lableStyle}>Difficulty</Label>
                                    <Input type="select" id="difficulty" onChange={(e) => this.handleDifficulty(e)}>
                                        <option value="easy">Easy</option>
                                        <option value="hard">Hard</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <Label for="editTestCase" style={lableStyle}>Edit Test Case</Label>
                                    <InputGroup className={classes.editCheckbox}>
                                        <InputGroupAddon addonType="prepend">

                                            <Input addon type="checkbox" name="enabletestcase" aria-label="Enable to edit the test case" onClick={this.enableTestCaseEdit} />

                                        </InputGroupAddon>
                                    </InputGroup>
                                    <EditorJava content={this.state.testCaseContent} showGutter="true" updatedContent={this.updatedTestCaseContent} readOnly={(this.state.disabled) ? true : false}></EditorJava>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.addSubjectiveQuestion} >Save</Button>
                        <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.close}>Close</Button>
                    </Form>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userName: state.userName
    };
};

export default connect(
    mapStateToProps, null
)(CreateSubjective)
