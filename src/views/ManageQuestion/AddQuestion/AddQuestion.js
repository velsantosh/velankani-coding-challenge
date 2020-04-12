import React, { Component } from 'react';
import { Button, Card, CardBody, Col, CardHeader, Form, Row } from 'reactstrap';
//import styled from "@emotion/styled";
//import Dropdowns from '../Dropdowns/Dropdowns';
import { Link } from 'react-router-dom';


class AddQuestion extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
        value: "C",
        value1: "CA",
        value2: "CB"
    };
};
continue = e => {
  e.preventDefault();
  this.props.nextStep();
  
}

  render() {
    const { handleChange, values } = this.props; 
    return (
      <div className="animated fadeIn">
        <Row xs="20" className="justify-content-center">
          <Col xs="6">
        <Card>
          <CardHeader className="bg-success mb-12">
          <i className="fa fa-align-justify"></i> 
          </CardHeader>
          <CardBody>
            
          <Form name="registerform" className="registerform" >
                    <span style={{color: "red"}} className="error"></span>
                    <select  className="form-control" id="exampleFormControlSelect1" value={values.technology} onChange={handleChange('technology')}>
                      <option value="C" disabled>Select Technology</option>
                        
                        <option key={2} value={"Java"}>{"Java"}</option>
                        <option key={3} value={".Net"}>{".Net"}</option>
                        <option key={4} value={"C"}>{"C"}</option>
                    </select>  
                    <br></br>
                    <select  className="form-control" id="exampleFormControlSelect1" value={values.type} onChange={handleChange('type')}>
                      <option value="CA" disabled>Question Type</option>
                        
                        <option key={2} value={"OBJECTIVE"}>{"Objective"}</option>
                        <option key={3} value={"SUBJECTIVE"}>{"Subjective"}</option>
                        
                    </select>  
                    <br></br>
                    <select  className="form-control" id="exampleFormControlSelect1" value={values.experience} onChange={handleChange('experience')}>
                      <option value="CB" disabled>Experience</option>
                        
                        <option key={2} value={2}>{"Below 3 yrs"}</option>
                        <option key={3} value={4}>{"3 to 5"}</option>
                        <option key={4} value={6}>{"5 to 8"}</option>
                    </select>  
                    <br></br>
                    <Row className="justify-content-left">
                        <Col xs="12" sm="6">
                        <Button className="btn-success mb-1" onClick={this.continue}>Next</Button>
                          
                          <span> </span>
                          <Link to="/manageQuestion/questionList">
                          <Button className="btn-danger mb-1" >Cancel</Button>
                          </Link>
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

// const StyledHtmlSelect = styled.select`
//   padding: 0;
//   margin: 0 0 0 10px;
//   height: 23px !important;
//   color: black;
//   background: #fff;
 
// `;
export default AddQuestion;
