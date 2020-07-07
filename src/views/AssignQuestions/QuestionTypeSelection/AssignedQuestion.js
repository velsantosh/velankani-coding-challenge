import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table, Col, Row, Button, Container } from 'reactstrap';
import Parser from 'html-react-parser';
import cx from "classnames";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import DeleteChallengeModal from './DeleteChallengeModal';
import AssignedQuesModals from './AssignedQuesModal';
import QuestionService from '../../../service/QuestionService'
import classes from "./SelectQuestions.module.css";
import ChallengeRow from './ChallengeRow'
// import usersData from './UsersData'

class AssignedQuestion extends Component {

  constructor(props) {
    super(props)
    this.state = {
      challengeRec: [],
      redirectToAssign: false,
      redirectToDeleteModel: false,
      redirectToassignQuestion: false,
      redirectToReschedule: false,
      deleteFlag: false,
      addModelShow: false,
      ques: [],
      redirectToAssignModels: false,
      challengeId: '',
      question: ''

    }
    this.redirectAssign = this.redirectAssign.bind(this)
    this.deleteChallenge = this.deleteChallenge.bind(this)
    this.reTest = this.reTest.bind(this)
    this.reSchedule = this.reSchedule.bind(this)
    this.getQuestionsByChallengeId = this.getQuestionsByChallengeId.bind(this)
  }

  componentDidMount() {
    this.getChlngRecByAssignerId(this.props.userName.length > 0 && this.props.userName);
  }

  getChlngRecByAssignerId(assignerId) {
    QuestionService.getChlngRecByAssignerId(assignerId)
      .then(
        response => {
          this.setState({ challengeRec: response.data })
        }
      )
  }
  getQuestionsByChallengeId(challengeid) {
    console.log("getQuestionsByChallengeId challengeid : ", challengeid)
    QuestionService.getQuestionsByChallengeId(challengeid)
      .then(
        response => {
               //console.log(response.data)
          this.setState({ ques: response.data, redirectToAssignModels: true }, () => console.log("Model Question List", this.state.ques))
        }
      )
  }
  redirectAssign() {
    this.setState({ redirectToAssign: true })

  }

  deleteChallenge(row) {
        console.log(" deleteChallenge row",row)
    this.setState({ redirectToDeleteModel: true,
      challengeId : row })

  }

  reTest(row) {

    console.log(" reTest row",row)

    this.setState({ 
      redirectToassignQuestion: true })

  }

  reSchedule(row) {
    console.log(" reSchedule row",row)

    this.setState({ redirectToReschedule: true })

  }

  assigneduidFormatter = (cellContent, row) => {

    // this.setState({ challengeId: row.challengeid })
    console.log("row---->", row)
    return (<Link>{row.assigneduid}</Link>)
  }

  actionFormatter = (cellContent, row) => {

    console.log("row---->", row)

    let actionFlag = false;
    let disableFlag = false;

    if (row.status === "Scheduled") {
      actionFlag = true
      disableFlag = true
    }

    if (row.status === "Stale") {
      disableFlag = true
    }

    this.setState({ 
      question : row })
    return (
      <>
        <Button className="btn btn-primary mb-1" className={cx(classes.createTableBtn)} hidden={!actionFlag} onClick={this.reSchedule.bind(row)}>RESCHEDULE</Button>
        <Button className="btn btn-primary mb-1" className={cx(classes.createTableBtn)} hidden={disableFlag} onClick={this.reTest.bind(row)} disabled={disableFlag}>RE-TEST</Button>
        <Button className="btn btn-primary mb-1" className={cx(classes.createTableBtn)} onClick={this.deleteChallenge.bind(this, row.challengeid)} >DELETE</Button>
      </>
    );


  }
  render() {
    const marginRight = {
      marginRight: '3%'
    }

    // const userList = usersData.filter((user) => user.id < 10)
    const challengeList = this.state.challengeRec;
    const redirectToAssign = this.state.redirectToAssign;

    const redirectToassignQuestion = this.state.redirectToassignQuestion;
    const redirectToReschedule = this.state.redirectToReschedule;
    const redirectToAssignModels = this.state.redirectToAssignModels;
    let addModal = () => this.setState({ redirectToAssignModels: false, redirectToDeleteModel:false },()=> this.componentDidMount());
    if (this.state.redirectToDeleteModel === true) {
      return (

        <DeleteChallengeModal show={this.state.redirectToDeleteModel} 
                              challengeid={this.state.challengeId}
                              onHide={addModal}>
        </DeleteChallengeModal>
      );
    }

    if (redirectToAssignModels === true) {
      return (

        <AssignedQuesModals show={redirectToAssignModels}
          onHide={addModal}
          qlist={this.state.ques}></AssignedQuesModals>
      );
    }

    if (redirectToassignQuestion) {
      return (
        // <Redirect from="/login" to="/manageUser/UserList" />
        <Redirect to={{
          pathname: '/assignQuestion/ReAssignChallenge',
          state: { challenge: this.state.question } 
        }}
        />
      );
    }

     if (redirectToReschedule) {
      console.log("inside Reschedule")
      return (
        // <Redirect from="/login" to="/manageUser/UserList" />
        <Redirect to={{
          pathname: '/assignQuestion/RescheduleChallenge',
          state: { challenge: this.state.question } 
        }}
        />
      );
    }
    if (redirectToAssign) {
      return (
        // <Redirect from="/login" to="/manageUser/UserList" />
        <Redirect to={{
          pathname: '/assignQuestion/AssignQuestion',
          state: { challenge: challengeList }
        }}
        />
      );
    }

    //define columns for table
    let columns = [
      {
        dataField: 'assigneduid',
        text: 'Candidate Id',
        sort: true,
        headerStyle: { color: '#47bff7' },
        formatter: this.assigneduidFormatter,
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            console.log("row.challengeid 111", row.challengeid)
            this.getQuestionsByChallengeId(row.challengeid)
            //this.props.solveTestQuestion(row);
          }
        }

      },
      {
        dataField: 'scheduleTime',
        text: 'Scheduled Time',
        sort: true,
        headerStyle: { color: '#47bff7' }
      },
      {
        dataField: 'status',
        text: 'Challeng Status',
        sort: true,
        headerStyle: { color: '#47bff7' }
      },
      {
        dataField: 'action',
        text: 'Action',
        sort: true,
        headerStyle: { color: '#47bff7' },
        formatter: this.actionFormatter

      }
    ]

    const options = {
      page: 1,  // page that shows as default
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      },
      {
        text: '15', value: 15
      },
      {
        text: '20', value: 20
      }
      ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last',
      paginationShowsTotal: true,  // Accept bool or function
      paginationPosition: 'bottom'  // default is bottom, top and both is all available
    };

    const { SearchBar } = Search;
    function onColumnMatch({ searchText, value, column, row }) {
      if (searchText == row.name || searchText == row.userName || searchText == row.role) {
        return true;
      }
    }

    return (
      <div className="animated fadeIn">
        <Container>
          <Row xs={2} md={4} lg={6}>
            <Col md={{ span: 6, offset: 10 }}>
              <Button className="btn btn-primary mb-1" className={cx(classes.createBtn)} onClick={this.redirectAssign.bind()}>Assign Question</Button>
            </Col>
          </Row>

          <Row xs="12" className="justify-content-center">
            <Col xl={12}>
              {this.state.challengeRec.length > 0
                &&
                <>
                  <ToolkitProvider
                    keyField="id"
                    data={this.state.challengeRec}
                    columns={columns}
                    search={onColumnMatch}
                  >
                    {
                      props => (
                        <div>
                          <SearchBar {...props.searchProps} />
                          <BootstrapTable
                            bootstrap4
                            striped
                            hover
                            keyField='id'
                            data={this.state.users}
                            columns={columns}
                            pagination={paginationFactory(options)}
                            {...props.baseProps}
                            bordered={false} />
                        </div>
                      )
                    }
                  </ToolkitProvider>
                </>
              }
            </Col>
          </Row>


        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    assignQuestion: assignQuestionData =>
      dispatch({ type: actionTypes.ASSIGNQUESTION, value: assignQuestionData })

  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(AssignedQuestion)
