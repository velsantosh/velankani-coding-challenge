import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup, Input, Container } from 'reactstrap';
import QuestionService from '../../../../service/QuestionService';
import ScheduledChallengeDataService from '../../../../service/ScheduledChallengeDataService';
import { connect } from "react-redux";
import Parser from "html-react-parser"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import * as actionTypes from "../../../../store/Actions";
import Counter from '../../../AssignQuestions/QuestionTypeSelection/Counter';


class SubQuestionsList extends Component {

  constructor(props) {

    super(props)
    this.state = {
      questions: [],
      type: '',
      index: 0,
      scheduledQuestionsOrNot: false,
      showModalFlag: false,
      selectedData: ''
    }    

    this.getQuestionsByTech = this.getQuestionsByTech.bind(this);
    this.getQuestionsByType = this.getQuestionsByType.bind(this);
  }

  componentDidMount() {
    console.log("this.props.userName:  ", this.props.userName);    
    console.log("getQuestionsByTech ", this.state.scheduledQuestionsOrNot);
      this.getQuestionsByTech();
   
  }
  

  getQuestionsByTech() {
    QuestionService.getQuestionsByTech("Java")
      .then(
        response => {
          this.setState({ questions: response.data })
        }
      )
  }

  getQuestionsByType(e) {
    QuestionService.getQuestionsByType(e.target.value)
      .then(response => {
        this.setState({ questions: response.data })
      }
      )
  }

  titleFormatter = (cell, row) => {
    console.log("editUserLink ####", row);

    let solveQuestionLink = `/solveQuestion/${row.id}`;
    if (row.type === 'OBJECTIVE') {
      solveQuestionLink = `/takeobjectivetest/${row.id}`    
    }
    console.log("solveQuestionLink ####", solveQuestionLink);
    return (<Link to={solveQuestionLink}>{row.title}</Link>) 
    
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
 
  setModalFlag = () => this.setState({ showModalFlag: false });

  render() {
    const marginTop = {
      marginTop: '20px'
    };
    const tableMargin = {
      marginTop: '5%'
    };
    const marginRight = {
      marginRight: '0.5%',
      marginBottom: '2%'
    };
    const questionsList = this.state.questions

    let filterByTypeComponent = (
      <Row>
        <abbr class="no-border" style={marginRight} >
          <Button block outline color="primary" onClick={this.getQuestionsByType} value="SUBJECTIVE">Subjective</Button>
        </abbr>
        <abbr class="no-border" style={marginRight} >
          <Button block outline color="primary" onClick={this.getQuestionsByType} value="OBJECTIVE">Objective</Button>
        </abbr>
      </Row>
    );

 

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

    
    //define columns for table
    let columns = [{
      dataField: 'title',
      text: 'Title',
      sort: true,
      align: 'center',
      headerAlign: 'center',
      headerStyle: { color: '#47bff7', width :'1.5%' },
      formatter: this.titleFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          this.props.solveTestQuestion(row);
        }
      }

    },
    {
      dataField: 'technology',
      text: 'Technology',
      sort: true,
      align: 'center',
      headerStyle: { color: '#47bff7' },
      headerAlign: 'center',
      headerStyle: {
        color: '#47bff7',
        width :'1%'
      }

    },
    {
      dataField: 'statement',
      text: 'Question Statement',
      sort: true,
      align: 'left',
      headerAlign: 'center',
      headerStyle: { color: '#47bff7', width :'5%' },
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
      dataField: 'difficulty',
      text: 'Difficulty',
      align: 'center',
      sort: true,
      headerAlign: 'center',
      headerStyle: { color: '#47bff7', width :'1%' },
    },
    {
      dataField: 'expectedTime',
      text: 'Expected Time',
      sort: true,
      align: 'center',
      headerAlign: 'center',
      headerStyle: { color: '#47bff7',  width :'1.2%' },
    }
    ]

    return (
      <div className="animated fadeIn" style={marginTop}>

        <div className="col-xs-10 big-line btn-group" id="Skills" data-skill="4" data-is-custom="False" style={{ padding: '.5rem' }}>
          <h4>Programming Test </h4>
        </div>
        <Container>
          {!this.state.scheduledQuestionsOrNot ? filterByTypeComponent : null}
        
          <Row xs="12" className="justify-content-center">
          <Col xl={10}>
            {this.state.questions.length > 0
              &&
              <>
                <ToolkitProvider
                  keyField="id"
                  data={this.state.questions}
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

const mapStateToProps = state => {
  return {
    userName: state.userName
  };
};


const mapDispatchToProps = dispatch => {
  return {
    solveTestQuestion: solveQuestion =>
      dispatch({ type: actionTypes.SOLVEQUESTION, value: solveQuestion })

  };
};

export default connect(
   mapStateToProps, mapDispatchToProps
)(SubQuestionsList);