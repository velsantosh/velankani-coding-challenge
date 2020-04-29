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
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";

class ModifyObjectiveQuestion extends Component {
    modifyQuestionData = {
        "title": '',
        "technology": '',
        "topic": '',
        "statement": '',
        "options": new Array(4),
        "correct_option": '',
        "difficulty": '',
        "technologyId":''
    }

     constructor(props) {
        super(props);
        this.state = {
            qId: this.props.questionData.id,
            selectedOption :'',
            redirectToBaseView: false,
            title: this.props.questionData.title ,
            technology:this.props.questionData.technology,
            topic:this.props.questionData.topic,
            statement:this.props.questionData.statement,
            //options: this.props.questionData.options,
            option0: this.props.questionData.options[0],
            option1: this.props.questionData.options[1],
            option2: this.props.questionData.options[2],
            option3: this.props.questionData.options[3],
            correctOption: this.props.questionData.correctOption,
            difficulty:this.props.questionData.difficulty,
            technologyId :this.props.questionData.technologyId
        };
    }

    componentDidMount() {
        this.getSelectedOption();
    }

    handleTitle = (event) => {
        this.setState({
            ...this.state,
            title : event.target.value
    });   
    }

    handleTechnology = (event) => {
        this.setState({
            ...this.state,
            technology : event.target.value
    });     
    }

    handleTopic = (event) => {
        this.setState({
            ...this.state,
        topic : event.target.value
    });   
    }

    handleDifficulty = (event) => {
        this.setState({
            ...this.state,
        difficulty : event.target.value
    });
    }

    handleStatement = (event) => {
        this.setState({
            ...this.state,
            statement :event.editor.getData()    
        })
    }

    handleOption =(event) =>{
        var name = event.target.name;
        this.setState({
            ...this.state,
            [name] : event.target.value
        });
    }

    handleCorrectOption= (changeEvent)=> {
        let optionNumber ="option"+changeEvent.target.value;
        this.setState({
            ...this.state,
          selectedOption: changeEvent.target.value,
          correctOption : this.state[optionNumber]
        });
      }

      modifyObjectiveQuestion =(qid,question) =>{
        QuestionService.modifyObjectiveQuestion(qid,question)
        .then(response => {
          this.setState({
            redirectToBaseView: true
          });
      });
    }
        
    modifyQuestion = () => {
        console.log(this.state);
        
        this.modifyQuestionData.options[0]=this.state.option0;
        this.modifyQuestionData.options[1]=this.state.option1;
        this.modifyQuestionData.options[2]=this.state.option2;
        this.modifyQuestionData.options[3]=this.state.option3;
        this.modifyQuestionData.correct_option =this.state.correctOption;
        this.modifyQuestionData.title = this.state.title;
        this.modifyQuestionData.technology =this.state.technology;
        this.modifyQuestionData.topic =this.state.topic;
        this.modifyQuestionData.statement =this.state.statement;
        this.modifyQuestionData.difficulty =this.state.difficulty; 
        this.modifyQuestionData.technologyId = this.state.technologyId;
        this.modifyObjectiveQuestion(this.state.qId,this.modifyQuestionData);  
        console.log("question data obj",this.modifyQuestionData)
    }

    getSelectedOption(){
        let selectedOptionNo;
        for(let i=0;i<4;i++){
            let optionNumber ="option"+i
            if(this.state.correctOption ==this.state[optionNumber])
            {   selectedOptionNo =i;
                this.setState({
                    ...this.state,
                    selectedOption:selectedOptionNo
                })
                break;
            }
        }
        
    
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
                    <h1 className={cx(classes.heading)}>Modify Question</h1>
                </div>
                <Container>
                    <Row className="">
                        <Col md="12">
                            <Form>
                                <Row form>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="qtitle" style={lableStyle}>Title</Label>
                                            <Input type="textbox" name="qtitle" id="qtitle" value={this.state.title} onChange={(e) => this.handleTitle(e)} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="technology" style={lableStyle}>Technology</Label>
                                            <Input type="select" name="technology" id="technology" defaultValue={this.state.technology} onChange={(e) => this.handleTechnology(e)}>
                                                <option>Java</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="topic" style={lableStyle}>Topic</Label>
                                            <Input type="select" name="topic" id="topic" defaultValue={this.state.topic} onChange={(e) => this.handleTopic(e)}>
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
                                    <CKEditor data={this.state.statement} type="classic" onChange={(e) => this.handleStatement(e)} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="options" style={lableStyle}>Choices</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Input addon type="radio" name="radio1" value="0" 
                                                checked={this.state.selectedOption == '0'}  onChange={this.handleCorrectOption} aria-label="Checkbox for following text input" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input value={this.state.option0} name="option0" onChange={(e) => this.handleOption(e)}/>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Input addon type="radio" name="radio1" value="1" 
                                                checked={this.state.selectedOption == '1'}  onChange={this.handleCorrectOption} aria-label="Checkbox for following text input" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input value={this.state.option1} name="option1" onChange={(e) => this.handleOption(e)}/>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Input addon type="radio" name="radio1" value="2" 
                                                checked={this.state.selectedOption == '2'} onChange={this.handleCorrectOption} aria-label="Checkbox for following text input" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input value={this.state.option2} name="option2" onChange={(e) => this.handleOption(e)} />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Input addon type="radio" name="radio1" value="3" 
                                                checked={this.state.selectedOption == '3'} onChange={this.handleCorrectOption} aria-label="Checkbox for following text input" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input value={this.state.option3} name="option3" onChange={(e) => this.handleOption(e)}/>
                                    </InputGroup>
                                </FormGroup>
                                <Row form>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="difficulty" style={lableStyle}>Difficulty</Label>
                                            <Input type="select" id="difficulty" value={this.state.difficulty} onChange={(e) => this.handleDifficulty(e)}>
                                                <option value="easy">Easy</option>
                                                <option value="hard">Hard</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={(e) => this.modifyQuestion(e)} >Save</Button>
                                <Button className="btn btn-primary mb-1" style={buttonContainer}>Close</Button>
                            </Form>
                        </Col>
                    </Row>
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
  
  export default connect(mapStateToProps)(ModifyObjectiveQuestion) ;
