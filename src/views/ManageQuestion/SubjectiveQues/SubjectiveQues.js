import React, { Component } from 'react';
import {Card,  CardBody,  CardHeader,  CardFooter, Button, Col,  Form,  FormGroup,  Input,  Label,  Row,} from 'reactstrap';

class SubjectiveQues extends Component {
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

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
    
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
    
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
          <Form name="registerform" className="registerform" >
          
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Question</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                             placeholder="Content..." />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Method Name : </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                      
                    </Col>
                  </FormGroup>
                  
                  </Form>
          </CardBody>
          <CardFooter>
                <Button primary = "true" size="sm" color="primary" onClick={this.continue}><i className="fa fa-dot-circle-o" ></i> Next</Button>
                <span> </span>
                <Button  primary = "false" size="sm" color="danger" onClick={this.back}><i className="fa fa-ban"></i> Previous</Button>
              </CardFooter>
        </Card>
          </Col>
        </Row> 
      </div>
    );
  }
}

export default SubjectiveQues;
