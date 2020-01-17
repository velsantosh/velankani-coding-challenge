import React, { Component } from 'react';
import { Button, Card, CardBody, Col, CardHeader, Form, Row } from 'reactstrap';
//import styled from "@emotion/styled";
//import Dropdowns from '../Dropdowns/Dropdowns';
import { Link } from 'react-router-dom';

class BrandButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: "C",
        value1: "CA",
        value2: "CB"
    };
}
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
        <Card>
          <CardHeader>
          <i className="fa fa-align-justify"></i> 
          </CardHeader>
          <CardBody>
          <Form name="registerform" className="registerform" >
                    <span style={{color: "red"}} className="error"></span>
                    <select  class="form-control" id="exampleFormControlSelect1" value={this.state.value} onChange={(e)=>{this.setState({value: e.target.value})}}>
                      <option value="C" disabled>User Id</option>
                        
                        <option key={2} value={2}>{"Java"}</option>
                        <option key={3} value={3}>{".Net"}</option>
                        <option key={4} value={4}>{"C"}</option>
                    </select>  
                    <br></br>
                    <select  class="form-control" id="exampleFormControlSelect1" value={this.state.value1} onChange={(e)=>{this.setState({value: e.target.value})}}>
                      <option value="CA" disabled>Question Type</option>
                        
                        <option key={2} value={2}>{"Objective"}</option>
                        <option key={3} value={3}>{"Subjective"}</option>
                        
                    </select>  
                    <br></br>
                    <select  class="form-control" id="exampleFormControlSelect1" value={this.state.value2} onChange={(e)=>{this.setState({value: e.target.value2})}}>
                      <option value="CB" disabled>Experince</option>
                        
                        <option key={2} value={2}>{"Below 3 yrs"}</option>
                        <option key={3} value={3}>{"3 to 5"}</option>
                        <option key={4} value={4}>{"5 to 8"}</option>
                    </select>  
                    <br></br>
                    <Row>
                        <Col xs="12" sm="6">
                        <Link to="/manageQuestion/addQuestion/typography">
                          <Button className="btn-success mb-1" >Schedule</Button>
                        </Link>  
                          <span> </span>
                        
                          <Button className="btn-danger mb-1" >Cancel</Button>
                        </Col>
                    </Row>
                  </Form>
          </CardBody>
        </Card>
        </Col>
        </Row> 
        
      </div>
    );
  }
}

export default BrandButtons;
