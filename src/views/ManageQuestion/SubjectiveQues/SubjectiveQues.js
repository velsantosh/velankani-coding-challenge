import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card,  CardBody,  CardHeader,  CardFooter, Button, Col,  Form,  FormGroup,  Input,  Label,  Row,} from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
class SubjectiveQues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      selectedFile:null,
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

  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  contactSubmit(e){
    e.preventDefault();
      this.addQuestion();
      
  }

  addQuestion(){
    // let data={
    //   "statement":this.state.fields["statement"],
    //   "methodName":this.state.fields["methodName"],
    //   // "junitObj":this.state.selectedFile,
    //   "language":this.props.values.technology,
    //   "type":this.props.values.type,
    //   "experience":this.props.values.experience,
    //   }

//       const json = JSON.stringify(data);
// const blob = new Blob([json], {
//   type: 'application/json'
// });

    console.log("File::",this.state.selectedFile)
    const formData = new FormData();
    formData.append('statement', this.state.fields["statement"]);
    formData.append('methodName', this.state.fields["methodName"]);
    formData.append('file', this.state.selectedFile);
   // formData.append('newQ', data);
    formData.append('language', this.props.values.technology);
    formData.append('type', this.props.values.type);
    formData.append('experience', this.props.values.experience);
    formData.append('createdUserid', this.props.userName.length >0 && this.props.userName);

    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
    //let permissionFlag= false;
    QuestionService.addQuestion(formData)
    .then(
        response => {
          console.log("UserResponse : ",response.status)
             if(response.status === 200){
              
              alert("Form submitted");
              this.props.nextStep();
           }else{
             console.log("UserResponse : ",response.data)
           this.props.history.push(`/404`)}
        }
    )
    
} 

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
         
        <Col xs="12" sm="6">
        <Card>
          <CardHeader>
          <i className="fa fa-align-justify"></i> 
          <strong>Subjective Question</strong>
          </CardHeader>
          <CardBody>
          <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)}>
          
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
                      <Label htmlFor="text-input">Method Name : </Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="text" name="text-input" placeholder="Text" ref="methodName" autoComplete="methodName"
                              onChange={this.handleChange.bind(this, "methodName")} value={this.state.fields["methodName"]}/>
                      
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">File input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-input" className="form-control" name="file-input" onChange={this.onChangeHandler}/>
                    </Col>
                  </FormGroup>
                  <CardFooter>
                  <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o" ></i> Submit</Button>
                <span> </span>
                <Button  primary = "false" size="sm" color="danger" onClick={this.back}><i className="fa fa-ban"></i> Previous</Button>
              </CardFooter>
                  </Form>
          </CardBody>
          
        </Card>
          </Col>
        </Row> 
      </div>
    );
  }
}

export default SubjectiveQues;
