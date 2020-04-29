import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, FormText, Col, Row ,InputGroup,InputLabel,InputGroupAddon,InputGroupText} from 'reactstrap';
import { Link } from 'react-router-dom';
import QuestionService from '../../../service/QuestionService';
import classes from "../CreateSubjective/CreateSubjective.module.css";
import cx from "classnames";
import EditorJava from '../../Component/EditorJava';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import CKEditor from 'ckeditor4-react';
import { TextareaAutosize } from '@material-ui/core';

class CreateSubjective extends Component {

    subQuestionData = {
        "title": '',
        "technology":'',
        "topic":'',
        "statement":'',
        "methodName":'',
        "expectedTime": '',
        "difficulty":'easy',
        "junitText":''
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
            testCaseContent:'',
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
                  }}`}, ()=>{
                    this.subQuestionData.methodName =this.state.editorContent
                  }
                  
        );
    }

    updatedEditorContent(newValue) {
       
        this.subQuestionData.methodName = newValue;
        this.setState({ editorContent: newValue }, () => {
            console.log("change onChangeEditor  after updating state :", this.state.editorContent);
        });
    };

    updatedTestCaseContent(newValue) {
        this.setState({
            testCaseContent :newValue
            },() =>{ this.subQuestionData.junitText = Array.from(this.state.testCaseContent)
            });
    };

    valuetext=(value) => {
        this.subQuestionData.expectedTime = value.toString();
        return `${value}`;
    }

    showFileContent = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result);
          this.setState({
            testCaseContent :text
            },() =>{
                this.subQuestionData.junitText = this.state.testCaseContent});
        };
        reader.readAsText(e.target.files[0])
      }
    
    enableTestCaseEdit = () =>{
        console.log(this.state.disabled);
        this.setState({disabled : !this.state.disabled});
    }

    handleTitle = (event) => { 
        this.subQuestionData.title= event.target.value;
      }
      
    handleTechnology = (event) => { 
        this.subQuestionData.technology= event.target.value;
      }
      handleTopic = (event) => { 
        this.subQuestionData.topic= event.target.value;
      }
      handleDifficulty = (event) => { 
        this.subQuestionData.difficulty= event.target.value;
      }
      handleStatement =(event) =>{
         // console.log(this.preveditor);
        //   console.log(event.editor);
         this.subQuestionData.statement =event.editor.getData();
         //.replace(/\n|\r\n|\r/g, '');
      }
      
    addSubjectiveQuestion =() =>{
        QuestionService.addSubjectiveQuestion(this.subQuestionData)
        .then(response => {
          this.setState({
            redirectToBaseView: true
          });
        })
    }
    
    render() {
        this.subQuestionData.expectedTime = Slider.defaultValue;
        const buttonContainer = {
            width: '200px',
            marginRight:'10px',
            marginTop:'20px',
            marginBottom: '20px !important',
            backgroundColor: '#1dafe2',
            color: 'white'
        };
        const titleStyle = {
            alignText: 'center',
            marginLeft: '50px',
            fontWeight: 'bold'
        };
        const lableStyle ={
            fontWeight:'bold'
        };
        const marginTop = {
            marginTop: '10px'
        };
        const useStyles = makeStyles({
            root: {
                width: 300,
            },
        });

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
                                    <Label for="qtitle" style ={lableStyle}>Title</Label>
                                    <Input type="textbox" name="qtitle" id="qtitle" placeholder="Enter the title" onChange= {(e) => this.handleTitle(e)} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="technology" style ={lableStyle}>Technology</Label>
                                    <Input type="select" name="technology" id="technology" onChange= {(e) => this.handleTechnology(e)}>
                                        
                                    <option disabled selected>Select Technology</option>
                                        <option>Java</option>
                                        
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="topic" style ={lableStyle}>Topic</Label>
                                    <Input type="select" name="topic" id="topic" onChange= {(e) => this.handleTopic(e)}>
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
                                    <Label for="statement" style ={lableStyle}>Question Statement</Label>
                                    <CKEditor data="<p>Some initial data</p>" type="classic" onChange={(e) => this.handleStatement(e)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="template" style ={lableStyle}>Template</Label>
                                    <EditorJava content={this.state.editorContent} showGutter="true" updatedContent={this.updatedEditorContent} ></EditorJava>
                                </FormGroup>
                                <Row form>
                                <Col md="3">
                                <FormGroup>
                                    <Label for="fileUpload" style ={lableStyle}>Testcase</Label>
                                    <Input type="file" name="file" id="fileUpload" onChange={(e) => this.showFileContent(e)} />
                                </FormGroup>
                                </Col>
                                <Col md="5">
                                <FormGroup>
                                    <Label for="expectedTime" style ={lableStyle}>Expected Time</Label>
                                    <div className={classes.root}>
                                        <Slider
                                            defaultValue={10}
                                            // valueLabelFormat={valueLabelFormat}
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
                                    <Label for="difficulty" style ={lableStyle}>Difficulty</Label>
                                    <Input type="select" id="difficulty" onChange= {(e) => this.handleDifficulty(e)}>
                                        <option value="easy">Easy</option>
                                        <option value="hard">Hard</option>
                                    </Input>
                                </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                <Col md="12">
                                <FormGroup>
                                    <Label for="editTestCase" style ={lableStyle}>Edit Test Case</Label>
                                    <InputGroup className={classes.editCheckbox}>
                                        <InputGroupAddon addonType="prepend">
                                        
                                            <Input addon type="checkbox" name="enabletestcase" aria-label="Enable to edit the test case" onClick ={this.enableTestCaseEdit} />
                                        
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <EditorJava content={this.state.testCaseContent} showGutter="true" updatedContent={this.updatedTestCaseContent} readOnly = {(this.state.disabled)? true : false}></EditorJava>
                                    {/* <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <Input addon type="checkbox" name="radio1" aria-label="Enable to edit the test case" onClick ={this.enableTestCaseEdit.bind(this)} />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="textarea" name="text" id="editTestCase" disabled = {(this.state.disabled)? true : false} value={this.state.fileContent} />
                                    
                                    </InputGroup> */}
                                    
                                </FormGroup>
                                </Col>
                                </Row>
                                {/*<Row>
                                 <Col md="6">
                                <FormGroup>
                                    <Label for="expectedTime" style ={lableStyle}>Expected Time</Label>
                                    <div className={classes.root}>
                                        <Slider
                                            defaultValue={10}
                                            // valueLabelFormat={valueLabelFormat}
                                            getAriaValueText={this.valuetext}
                                            aria-labelledby="discrete-slider-restrict"
                                            step={null}
                                            valueLabelDisplay="auto"
                                            marks={marks}
                                        />
                                    </div>
                                </FormGroup>
                                </Col>
                                <Col>
                                <FormGroup>
                                    <Label for="difficulty" style ={lableStyle}>Difficulty</Label>
                                    <Input type="select" name="-" id="difficulty">
                                        <option>Easy</option>
                                        <option>Hard</option>
                                    </Input>
                                </FormGroup>
                                </Col> 
                                </Row>*/}
                                {/* <Button color="success">Save</Button> */}
                                <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.addSubjectiveQuestion} >Save</Button>
                                <Button className="btn btn-primary mb-1" style={buttonContainer}>Close</Button>
                            </Form>

                </Container>
            </>
        );
    }
}

export default CreateSubjective;
