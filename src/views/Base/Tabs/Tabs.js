import React, {Component} from 'react';
import {Card,  CardBody,  CardHeader,  CardFooter, Button, Col,  Form,  FormGroup,  Input,  Label,  Row,} from 'reactstrap';

class Tabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      value: 'Please write an essay about your favorite DOM element.'
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
        <Row className="justify-content-center" >
          
        <Col xs="12" sm="6">
        <Card>
          <CardHeader>
          <i className="fa fa-align-justify"></i> 
          <strong>Subjective Answer</strong>
          </CardHeader>
          <CardBody>
          <Form name="registerform" className="registerform" >
          <FormGroup>
                  <Label htmlFor="company"><strong>Parameters :</strong></Label>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Answer</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                             placeholder="Content..." />
                             <br></br>
                      <Button primary = "true" size="sm" color="primary" onClick={this.continue}><i className="fa fa-dot-circle-o" ></i> Add</Button>       
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Answer</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Answer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
</table>
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

export default Tabs;
