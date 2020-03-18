import React, { Component } from 'react';
import {Card,  CardBody,  CardHeader,  CardFooter, Button, Col,  Form,  FormGroup,  Input,  Label,  Row,} from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
class ObjectiveQues extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      value: 'Please write an essay about your favorite DOM element.',
      type:''
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
    
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
    
  }

  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  contactSubmit(e){
    e.preventDefault();
      this.addQuestion();
      alert("Form submitted");
  }

  addQuestion(){
    let data={
      "statement":this.state.fields["statement"],
      "options":`${this.state.fields["option1"]},${this.state.fields["option2"]},${this.state.fields["option3"]},${this.state.fields["option4"]}`,
      "correct_option":this.state.fields["answer"],
      "language":this.props.values.technology,
      "type":this.props.values.type,
      "experience":this.props.values.experience,
      }
console.log("Question Detials:",data)
    //let permissionFlag= false;
    QuestionService.addQuestion(data)
    .then(
        response => {
          console.log("UserResponse : ",response.status)
          //   if(response.status === 200){
              
          //    this.setState({response:true})
          // }else{
          //   console.log("UserResponse : ",response.data)
          // this.props.history.push(`/404`)}
        }
    )
    
} 

  render() {

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="12" lg="6">
        <Card>
          <CardHeader>
          <i className="fa fa-align-justify"></i> 
          <strong>Objective Question</strong>
          </CardHeader>
          <CardBody>
          <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)} >
          
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Question</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="textarea-input" rows="9"
                             placeholder="Content..." ref="statement" autoComplete="statement"
                              onChange={this.handleChange.bind(this, "statement")} value={this.state.fields["statement"]}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Option A:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="text-input" placeholder="Text" ref="option1" autoComplete="option1"
                              onChange={this.handleChange.bind(this, "option1")} value={this.state.fields["option1"]}/>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Option B:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="text-input" placeholder="Text" ref="option2" autoComplete="option2"
                              onChange={this.handleChange.bind(this, "option2")} value={this.state.fields["option2"]}/>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Option C:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="text-input" placeholder="Text" ref="option3" autoComplete="option3"
                              onChange={this.handleChange.bind(this, "option3")} value={this.state.fields["option3"]}/>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Option D:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="text-input" placeholder="Text" ref="option4" autoComplete="option4"
                              onChange={this.handleChange.bind(this, "option4")} value={this.state.fields["option4"]}/>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Answer</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="text-input" placeholder="Text" ref="answer" autoComplete="answer"
                              onChange={this.handleChange.bind(this, "answer")} value={this.state.fields["answer"]}/>
                    </Col>
                  </FormGroup>
                  
                  <CardFooter>
                <Button type="submit" size="sm" color="primary" ><i className="fa fa-dot-circle-o" ></i> Submit</Button>
                <span> </span>
                <Button  primary = "false" size="sm" color="danger" onClick={this.back}><i className="fa fa-ban"></i> Previous</Button>
              </CardFooter>
                  {/* <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">File input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-input" name="file-input" />
                    </Col>
                  </FormGroup> */}
                </Form>
          </CardBody>
          
        </Card>
        </Col>
        
        </Row> 
      </div>
    );
  }
}

export default ObjectiveQues;
