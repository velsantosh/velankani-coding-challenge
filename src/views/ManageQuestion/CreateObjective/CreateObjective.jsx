import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Col, Row, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Link } from 'react-router-dom';
import QuestionService from '../../../service/QuestionService';
import classes from "../CreateSubjective/CreateSubjective.module.css";
import cx from "classnames";
import EditorJava from '../../Component/EditorJava';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import CKEditor from 'ckeditor4-react';

class CreateObjective extends Component {
    objQuestionData = {
        "title": '',
        "technology": '',
        "topic": '',
        "statement": '',
        "options": new Array(4),
        "correct_option": '',
        "difficulty": ''
    }
    option1="";
    option2="";
    option3="";
    option4="";

    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            qId: '',
            selectedOption :'',
            redirectToBaseView: false
        };
    }

    componentDidMount() {
        this.setState({
            editorContent: ` Class ExampleClass{
                  public static void main(String[] str){
                    System.out.println("Start the take test");
                  }}`});
    }

    handleTitle = (event) => {
        this.objQuestionData.title = event.target.value;
    }

    handleTechnology = (event) => {
        this.objQuestionData.technology = event.target.value;
    }
    handleTopic = (event) => {
        this.objQuestionData.topic = event.target.value;
    }
    handleDifficulty = (event) => {
        this.objQuestionData.difficulty = event.target.value;
    }
    handleStatement = (event) => {
        this.objQuestionData.statement = event.editor.getData().replace(/\n|\r\n|\r/g, '');
    }
    handleOption1 =(event) =>{
        this.option1 = event.target.value;
    }
    handleOption2 =(event) =>{
        this.option2 = event.target.value;
    }
    handleOption3 =(event) =>{
        this.option3 = event.target.value;
    }
    handleOption4 =(event) =>{
        this.option4 = event.target.value;
    }
    handleCorrectOption= (changeEvent)=> {
        this.setState({
          selectedOption: changeEvent.target.value
        });
      }

    addObjectiveQuestion = () => {
        let optionsArray = new Array(4);
        optionsArray[0]=this.option1;
        optionsArray[1]=this.option2;
        optionsArray[2]=this.option3;
        optionsArray[3]=this.option4;
        for(let i=0; i<optionsArray.length;i++){
            this.objQuestionData.options[i]= optionsArray[i];
        }
        let selectedRadioBtn = this.state.selectedOption;
        this.objQuestionData.correct_option = this.objQuestionData.options[selectedRadioBtn-1];
        console.log("question data obj",this.objQuestionData)
        QuestionService.addObjectiveQuestion(this.objQuestionData)
            .then(response => {
                this.setState({
                    redirectToBaseView: true
                });
            })
    }

    render() {
        const buttonContainer = {
            width: '200px',
            marginRight: '10px',
            marginTop: '20px',
            marginBottom: '20px !important',
            backgroundColor: '#1dafe2',
            color: 'white'
        };
        const titleStyle = {
            alignText: 'center',
            marginLeft: '50px',
            fontWeight: 'bold'
        };
        const lableStyle = {
            fontWeight: 'bold'
        };
        const marginTop = {
            marginTop: '10px'
        };
        const useStyles = makeStyles({
            root: {
                width: 300,
            },
        });

        const redirectToBaseView = this.state.redirectToBaseView;
        if (redirectToBaseView === true) {
            return (<Redirect to="/manageQuestion/questionList" />);
        }

        return (
            <>
                <div>
                    <h1 className={cx(classes.heading)}>Create Multiple Choice Question</h1>
                </div>
                <Container>
                    <Row className="">
                        <Col md="12">
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
                                    <Label for="options" style={lableStyle}>Choices</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Input addon type="radio" name="radio1" value="1" 
                                                checked={this.state.selectedOption === '1'}  onChange={this.handleCorrectOption} aria-label="Checkbox for following text input" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="" name="option1" onChange={(e) => this.handleOption1(e)}/>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Input addon type="radio" name="radio1" value="2" 
                                                checked={this.state.selectedOption === '2'}  onChange={this.handleCorrectOption} aria-label="Checkbox for following text input" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="" name="option2" onChange={(e) => this.handleOption2(e)}/>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Input addon type="radio" name="radio1" value="3" 
                                                checked={this.state.selectedOption === '3'} onChange={this.handleCorrectOption} aria-label="Checkbox for following text input" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="" name="option3" onChange={(e) => this.handleOption3(e)} />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Input addon type="radio" name="radio1" value="4" 
                                                checked={this.state.selectedOption === '4'} onChange={this.handleCorrectOption} aria-label="Checkbox for following text input" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="" name="option4" onChange={(e) => this.handleOption4(e)}/>
                                    </InputGroup>
                                </FormGroup>
                                <Row form>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="difficulty" style={lableStyle}>Difficulty</Label>
                                            <Input type="select" name="-" id="difficulty" onChange={(e) => this.handleDifficulty(e)}>
                                                <option value="easy">Easy</option>
                                                <option value="hard">Hard</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={(e) => this.addObjectiveQuestion(e)} >Save</Button>
                                <Button className="btn btn-primary mb-1" style={buttonContainer}>Close</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default CreateObjective;
