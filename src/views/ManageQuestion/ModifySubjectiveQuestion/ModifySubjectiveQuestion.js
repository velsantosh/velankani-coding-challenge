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
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";


class ModifySubjectiveQuestion extends Component {
     
    modifyQuestionData = {
        "title": '',
        "technology":'',
        "topic":'',
        "statement":'',
        "methodName":'',
        "expectedTime": '',
        "difficulty":'',
        "junitText":'',
        "technologyId":''
      }
      expectedTimeglobal =''

    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            qId: this.props.questionData.id,
            disabled: true,
            testCaseContent:'',
            redirectToBaseView: false,
            title: this.props.questionData.title ,
            technology:this.props.questionData.technology,
            topic:this.props.questionData.topic,
            statement:this.props.questionData.statement,
            methodName:this.props.questionData.methodName,
            expectedTime: this.props.questionData.expectedTime,
            difficulty:this.props.questionData.difficulty,
            junitText:this.props.questionData.junitText,
            technologyId :this.props.questionData.technologyId
            //subQuestionData : this.props.questionData
        };
         
        
        this.updatedTemplateContent = this.updatedTemplateContent.bind(this);
        this.updatedTestCaseContent = this.updatedTestCaseContent.bind(this);
    }

    
    componentDidMount() {
        
        // this.setState({
        //     subQuestionData: this.props.questionData
        // });
    }

    updatedTemplateContent(newValue) {
        this.setState({
            ...this.state,
             methodName : newValue
         });  
    };

    updatedTestCaseContent(newValue) {
        this.setState({
            ...this.state,
            junitText :newValue
        });
        // this.setState({
        //     testCaseContent :newValue
        //     },() =>{ this.modifyQuestionData.junitText = Array.from(this.state.testCaseContent)
        //     });
    };

    handleExpectedTime=(value) => {
        this.expectedTimeglobal =value.toString()
        return `${value}`;
    }

    showFileContent = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result);
          this.setState({
            ...this.state,
             junitText : text
            
        });
        //   this.setState({
        //     testCaseContent :text
        //     },() =>{
        //         this.modifyQuestionData.junitText = this.state.testCaseContent});
        };
        reader.readAsText(e.target.files[0])
      }
    
    enableTestCaseEdit = () =>{
        console.log(this.state.disabled);
        this.setState({
            ...this.state,
            disabled : !this.state.disabled});
    }

    handleTitle = (event) => { 
        this.setState({
            ...this.state,
             title : event.target.value
            
        })
      }
      
    handleTechnology = (event) => { 
        this.setState({
            ...this.state,
               technology : event.target.value
          
        })
      }

      handleTopic = (event) => { 
        this.setState({
            ...this.state,
               topic : event.target.value
        
        })
      }

      handleDifficulty = (event) => { 
        this.setState({
            ...this.state,
              difficulty : event.target.value
      
        })
      }

      handleStatement =(event) =>{
         // console.log(this.preveditor);
        //   console.log(event.editor);
        this.setState({
            ...this.state,
            statement :event.editor.getData()
            
        })
      }

      modifySubjectiveQuestion =(qid,question) =>{
        QuestionService.modifySubjectiveQuestion(qid,question)
        .then(response => {
          this.setState({
            redirectToBaseView: true
          });
      });
    }

    modifyQuestion =() =>{
        this.setState({
            ...this.state,
            expectedTime :this.expectedTimeglobal
        },()=>{ 
            this.modifyQuestionData.title = this.state.title;
            this.modifyQuestionData.technology =this.state.technology;
            this.modifyQuestionData.topic =this.state.topic;
            this.modifyQuestionData.statement =this.state.statement;
            this.modifyQuestionData.methodName =this.state.methodName;
            this.modifyQuestionData.expectedTime =this.state.expectedTime;
            this.modifyQuestionData.difficulty =this.state.difficulty; 
            this.modifyQuestionData.junitText =this.state.junitText;
            this.modifyQuestionData.technologyId = this.state.technologyId;
            this.modifySubjectiveQuestion(this.state.qId,this.modifyQuestionData);   
        })
        }
     
        // QuestionService.modifySubjectiveQuestion(this.subQuestionData.qId,this.modifyQuestionData)
        // .then(response => {
        //   this.setState({
        //     redirectToBaseView: true
        //   });
        // })
    
    
    render() {
        //let subQuestionData = this.props.questionData.question;
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
                    <h1 className={cx(classes.heading)}>Modify Question</h1>
                </div>

                <Container>
                    <Form>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="qtitle" style ={lableStyle} >Title</Label>
                                    <Input type="textbox" name="qtitle" id="qtitle" value={this.state.title} onChange= {(e) => this.handleTitle(e)} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="technology" style ={lableStyle}>Technology</Label>
                                    <Input type="select" name="technology" id="technology" defaultValue={this.state.technology} onChange= {(e) => this.handleTechnology(e)}>
                                        <option>Java</option>
                                        
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="topic" style ={lableStyle}>Topic</Label>
                                    <Input type="select" name="topic" id="topic" defaultValue={this.state.topic} onChange= {(e) => this.handleTopic(e)}>
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
                                    <CKEditor data={this.state.statement} type="classic" onChange={(e) => this.handleStatement(e)} />
                                </FormGroup>
                                <FormGroup>
                                {/* className={cx(classes.whiteSpace)} */}
                                    <Label for="template" style ={lableStyle}>Template</Label>
                                    <EditorJava  style={{ whiteSpace: 'nowrap' }} content={this.state.methodName} showGutter="true" updatedContent={this.updatedTemplateContent} ></EditorJava>
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
                                            defaultValue={this.state.expectedTime}
                                            // valueLabelFormat={valueLabelFormat}
                                            getAriaValueText={(value)=>this.handleExpectedTime(value)}
                                            //valuetext
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
                                    <Input type="select" id="difficulty" defaultValue={this.state.difficulty} onChange= {(e) => this.handleDifficulty(e)}>
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
                                    <EditorJava content={this.state.junitText} showGutter="true" updatedContent={this.updatedTestCaseContent} readOnly = {(this.state.disabled)? true : false}></EditorJava>
                                </FormGroup>
                                </Col>
                                </Row>
                                <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.modifyQuestion} >Save</Button>
                                <Button className="btn btn-primary mb-1" style={buttonContainer}>Close</Button>
                            </Form>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
      questionData : state.selectedQuestionData.question
    };
  };
  
  export default connect(mapStateToProps)(ModifySubjectiveQuestion)
