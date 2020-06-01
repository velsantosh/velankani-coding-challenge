import React, { Component } from 'react';
import { Col, Row, Button, Container } from 'reactstrap';
import ScheduledRequestService from '../../../service/ScheduledRequestService'
import CustomBootstrapTable from '../CustomBootstrapTable';
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import { Redirect } from 'react-router-dom';

class ScheduleTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scheduledRequestData: [],
      redirectToQuestionsPage: false
    }
  }

  componentDidMount() {
    this.getAllScheduledRequests();
  }

  getAllScheduledRequests() {
    ScheduledRequestService.getAllScheduledRequests()
      .then(response => {
        this.setState({
          scheduledRequestData: response.data
        });
      })
  }


  actionFormatter = (cell, row) => {
    return (<Button className="btn btn-primary mb-1" style={{ "backgroundColor": '#20a8d8', "color": 'white' }}>
      Schedule</Button>)

  }
  render() {
    const marginTop = {
      marginTop: '5%'
    }

    let columns = [{
      dataField: 'requirementId',
      text: 'REQUIREMENT ID',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: 'technology',
      text: 'TECHNOLOGY',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: 'interviewDate',
      text: 'INTERVIEW DATE',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: 'candidateEmailId',
      text: 'CANDIDATE EMAIL ID',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: 'candidateExperience',
      text: 'EXPERIENCE',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: 'hiringManagerName',
      text: 'HIRING MANAGER',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: 'recruiterName',
      text: 'RECRUITER',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: '',
      text: 'ACTION',
      headerStyle: { color: '#47bff7' },
      formatter: this.actionFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          this.props.setScheduledRequestData(row);
          this.setState({
            redirectToQuestionsPage: true
          })
        }
      }
    }
    ]

    const redirectToQuestionsPage = this.state.redirectToQuestionsPage;
    if (redirectToQuestionsPage === true) {
      return (<Redirect to="/selectQuestions" />);
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
                {this.state.scheduledRequestData.length > 0 &&
                  <CustomBootstrapTable data={this.state.scheduledRequestData} columns={columns} />
                }
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setScheduledRequestData: scheduledRequestData =>
      dispatch({ type: actionTypes.SCHEDULEDREQUESTDATA, value: scheduledRequestData })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ScheduleTest);

