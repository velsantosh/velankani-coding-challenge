import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup, Input, Container } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
import classes from "./Questions.module.css";
import cx from "classnames";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Parser from 'html-react-parser';
import Counter from '../../AssignQuestions/QuestionTypeSelection/Counter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import DeleteQuestionModal from '../../AssignQuestions/QuestionTypeSelection/DeleteQuestionModal';



class Questions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      type: '',
      selectedType: '',
      selectedTechnology: '',
      activeType: 'subjective',
      activeTechnology: 'java',
      showModalFlag: false,
      showDeleteModalFlag: false,
      selectedData: '',
      redirectToDeleteModel: false,
      questionId: ''
    }
  }

  componentDidMount() {
    this.getQuestionsByTypeTech(this.state.activeType, this.state.activeTechnology);
  }

  handleType(e) {
    this.setState({
      ...this.state,
      activeType: e.target.value
    }, () => {
      this.getQuestionsByTypeTech(this.state.activeType, this.state.activeTechnology);
    });
  }

  handleTech(e) {
    this.setState({
      activeTechnology: e.target.value
    }, () => { this.getQuestionsByTypeTech(this.state.activeType, this.state.activeTechnology); });
  }
  getQuestionsByTypeTech(type, tech) {
    QuestionService.getQuestionsByTypeTech(type, tech)
      .then(
        response => {
          this.setState({ questions: response.data })
        }
      )
  }

  statementFormatter = (cell, row) => {
    let stmt = "";
    if (cell != null) {
      stmt = cell.substr(0, 30);
    }

    var newStmt = `${stmt}...`
    return (<><Link>{Parser(newStmt)}</Link>
    </>);
  }

  titleFormatter = (cell, row) => {
    let questionLink;
    if (this.state.activeType == "subjective") {
      questionLink = `/manageQuestion/modifySubjectiveQuestion`;
    }
    if (this.state.activeType == "objective") {
      questionLink = `/manageQuestion/modifyObjectiveQuestion`;
    }
    return (<Link to={questionLink}>{row.title}</Link>)
  }

  actionFormatter = (cellContent, row) => {
    this.setState({
      question: row
    })
    return (
      <>
        <Button className="btn btn-primary mb-1" className={cx(classes.createTableBtn)} onClick={this.deleteQuestion.bind(this, row.id)}>DELETE</Button>
      </>
    );
  }
  deleteQuestion(row) {
    console.log(" delete Question Id", row);
    this.setState({
      ...this.state,
      redirectToDeleteModel: true,
      questionId: row

    })

  }
  setModalFlag = () => this.setState({ showModalFlag: false });
  deleteModal = () => this.setState({ redirectToDeleteModel: false });

  render() {

    const marginRight = {
      marginRight: '3%'
    }
    //define columns for table
    let columns = [{
      dataField: 'title',
      text: 'Title',
      sort: true,
      headerStyle: { color: '#47bff7' },
      formatter: this.titleFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          this.props.setSelectedQuestion(row);
        }
      }
    },
    {
      dataField: 'statement',
      text: 'Question Statement',
      sort: true,
      headerStyle: { color: '#47bff7' },
      formatter: this.statementFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          this.setState({
            ...this.state,
            showModalFlag: true,
            selectedData: Parser(row.statement)
          })
        },
      }
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: 'difficulty',
      text: 'Difficulty',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: 'experience',
      text: 'Experience',
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
      if (searchText == row.title || searchText == row.statement) {
        return true;
      }

    }

    if (this.state.redirectToDeleteModel) {
      console.log("Question Deleted successfully");
      return (
        <DeleteQuestionModal show={this.state.redirectToDeleteModel} questionId={this.state.questionId} onHide={this.deleteModal}></DeleteQuestionModal>
      );
    }

    return (
      <div className="animated fadeIn">
        <Container>
          <Row className={cx(classes.filterContainer)}>
            <div className="col-md-6 big-line btn-group" id="type" style={{ padding: '.5rem' }}>
              <h4>Type</h4>

              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                  this.state.activeType === "subjective" ? classes.showActive : ""
                )} color="primary" onClick={this.handleType.bind(this)} value="subjective">Subjective</Button>
              </abbr>


              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                  this.state.activeType === "objective" ? classes.showActive : ""
                )} color="primary" onClick={this.handleType.bind(this)} value="objective">Objective</Button>
              </abbr>
            </div>
            <div className="col-md-6 big-line btn-group" id="technology" style={{ padding: '.5rem', left: '18%' }}>
              <h4>Technology</h4>

              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                  this.state.activeTechnology === "javascript" ? classes.showActive : ""
                )} color="primary" onClick={this.handleTech.bind(this)} value="javascript">Javascript</Button>
              </abbr>
              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                  this.state.activeTechnology === "java" ? classes.showActive : ""
                )} color="primary" onClick={this.handleTech.bind(this)} value="java">Java</Button>
              </abbr>
            </div>
          </Row>

          {/* uncomment the following code to bring technology tab below the type tab and comment out the technology tab in above Row*/}
          {/* <Row className={cx(classes.filterContainer)}>
            <div className="col-xs-10 big-line btn-group" id="technology" style={{ padding: '.5rem' }}>
              <h4>Technology</h4>

              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                  this.state.activeTechnology === "javascript" ? classes.showActive : ""
                )} color="primary" onClick={this.handleTech.bind(this)} value="javascript">Javascript</Button>
              </abbr>
              <abbr class="no-border" style={marginRight}>
                <Button block outline className={cx(classes.filterBtn,
                  this.state.activeTechnology === "java" ? classes.showActive : ""
                )} color="primary" onClick={this.handleTech.bind(this)} value="java">Java</Button>
              </abbr>
            </div>
          </Row> */}
          <Row xs={2} md={4} lg={6}>
            <Col md={{ span: 6, offset: 7 }}>
             {/*} <Link to="/manageQuestionTemplate">
                <Button className="btn btn-primary mb-1" className={cx(classes.createBtn)}>Manage Question Templates</Button>
              </Link>*/}
            </Col> 
            <Col >
              <Link to="/manageQuestion/createQuestion">
                <Button className="btn btn-primary mb-1" className={cx(classes.createBtn)}>Create New Question</Button>
              </Link>
            </Col>
          </Row>

          <Row xs="12" className="justify-content-center">
            <Col xl={10}>

              {this.state.questions.length > 0
                &&
                <>
                  <ToolkitProvider
                    keyField="id"
                    data={this.state.questions}
                    columns={columns}
                    search
                  //search={onColumnMatch}
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
                            data={this.state.questions}
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
              <Counter show={this.state.showModalFlag}
                onHide={this.setModalFlag} statement={this.state.selectedData}></Counter>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setSelectedQuestion: selectedQuestionData =>
      dispatch({ type: actionTypes.SELECTEDQUESTIONDATA, value: selectedQuestionData })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Questions);

