import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup, Input, Container } from 'reactstrap';
import ScheduledRequestService from '../../../service/ScheduledRequestService'
import cx from "classnames";
import RequestRow from './RequestRow';

class ScheduleTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scheduledRequestData :[]
    }
  }

  componentDidMount() {
    this.getAllScheduledRequests();
  }

  getAllScheduledRequests(){
  ScheduledRequestService.getAllScheduledRequests()
  .then(response => {
     this.setState({
       scheduledRequestData :response.data
     });
  })
  }

  render() {
    const marginTop = {
        marginTop: '5%'
    }

    return (
    <>
      <div>
        <h1>Schedule Test</h1>
      </div>
      <div className="animated fadeIn">
        <Container style={marginTop}>
          <Row className="justify-content-center">
            <Col>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th scope="col" className="headingPrimary">REQUIREMENT ID</th>
                    <th scope="col" className="headingPrimary">TECHNOLOGY</th>
                    <th scope="col" className="headingPrimary">INTERVIEW DATE</th>
                    {/* <th scope="col" className="headingPrimary">CANDIDATE NAME</th> */}
                    <th scope="col" className="headingPrimary">CANDIDATE EMAIL ID</th>
                    {/* <th scope="col" className="headingPrimary">MOBILE NO</th> */}
                    <th scope="col" className="headingPrimary">EXPERIENCE</th>
                    <th scope="col" className="headingPrimary">HIRING MANAGER</th>
                    <th scope="col" className="headingPrimary">RECRUITER</th>
                    <th scope="col" className="headingPrimary">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                {/* <th scope="row" onClick ={this.props.clickEvent}>
                  <Link to={questionLink}>{question.title}</Link></th> */}
                  { this.state.scheduledRequestData.length>0 &&
                  this.state.scheduledRequestData.map((request, index) =>
                    <RequestRow key={index} request={request} />
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
      </>
    )
  }
}

export default ScheduleTest;

