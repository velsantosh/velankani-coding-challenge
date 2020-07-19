import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, Form, CardGroup, Input } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
import PopulateQid from './PopulateQid';
import AssignSubjective from './AssignSubjective';
import classes from "./SelectQuestions.module.css";
import cx from "classnames";
import Modals from '../../Notifications/Modals/Modals';
import PopulateAll from './PopulateAll';
import { connect } from "react-redux";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Parser from "html-react-parser";
import { Link } from 'react-router-dom';

class QuestionTemplate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            qidList: [],
            message: null,
            userList: "",
            type: 'ALL',
            flag: true,
            redirectToBaseView: false,
            selectedTechnology: "java",
            scheduleDate: "",
            status: "Scheduled",
            challengeid: "",
            assigndQuesT: [],
            questionList: []
        }
        this.getQuestionsByTech = this.getQuestionsByTech.bind(this)
    }

    componentDidMount() {
        this.getQuestionsByTech()
    }

    getQuestionsByTech() {
        QuestionService.getQuestionsByTech(this.state.selectedTechnology)
            .then(
                response => {
                    this.setState({ questionList: response.data })
                }
            )
    }

    createTemplate() {
        alert("Templat created:2222", "this.state.questions[0]");
        console.log("Templat created:2222", this.state.questions);

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

    handleSelectChange = (selectedValue) => {
        console.log("qwerty", selectedValue);
        this.setState({
            questions: [...this.state.questions, selectedValue]
        },
            () => {
                console.log("Selected Objective Q List", this.state.questions);
                this.setState({ flag: false })
            });
    }

    removeQuestion = itemId => {
        console.log("ItemId::", itemId);
        const items = this.state.questions.filter(item => item !== itemId);
        this.setState({ questions: items },
            () => {
                console.log("Removed UserId", this.state.questions);
                if (this.state.questions === []) {
                    this.setState({ flag: true })
                }
            });
    }

    selectedType = (e) => {
        let type = e.target.value;
        if (type === "ALL") {
          this.setState({ type: type })
          this.getQuestionsByTech();
    
        } else {
          QuestionService.getQuestionsByTypeTech(e.target.value, this.state.selectedTechnology)
            .then(
              response => {
                this.setState({ questionList: response.data})
                this.setState({ type: type })
              }
            );
        }
      }
    
      getQuestionsByTech() {
        QuestionService.getQuestionsByTech(this.state.selectedTechnology)
          .then(
            response => {
              this.setState({ questionList: response.data })
            }
          )
      }
    render() {

        const marginTop = {
            marginTop: '20px'
        }
        const text = {
            textAlign: 'right',
            marginRight: '7%'
        }
        const buttonContainer = {
            marginRight: '0.5%',
            marginTop: '20px',
            backgroundColor: '#1dafe2',
            color: 'white',
        };
        const marginRight = {
            marginBottom: '10px',
            marginRight: '0.5%'
        };

        const marginLeft = {
            marginBottom: '5px',
            marginLeft: '0.5%'
        };

        let columns = [{
            dataField: 'title',
            text: 'Title',
            sort: true,
            headerStyle: { color: '#47bff7' }
        },
        {
            dataField: 'topic',
            text: 'Topic',
            sort: true,
            headerStyle: { color: '#47bff7' }

        },
        {
            dataField: 'type',
            text: 'Type',
            sort: true,
            headerStyle: { color: '#47bff7' },
            formatter: this.roleFormatter,
        },
            ,
        {
            dataField: 'statement',
            text: 'Statement',
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
            dataField: 'experience',
            text: 'Experience',
            sort: true,
            headerStyle: { color: '#47bff7' }
        },
        {
            dataField: 'difficulty',
            text: 'Difficulty',
            sort: true,
            headerStyle: { color: '#47bff7' },
            formatter: this.roleFormatter,
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

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log("------>", row.id);
                console.log("------>", isSelect);
                console.log("------>", rowIndex);
                console.log("------>", e);

                if (isSelect) {
                    this.handleSelectChange(row.id);
                } else {
                    this.removeQuestion(row.id);
                }
            },
        };


    

        function onColumnMatch({ searchText, value, column, row }) {
            if (searchText == row.name || searchText == row.userName || searchText == row.role) {
                return true;
            }

        }

        return (
            <div className="animated fadeIn" style={marginTop}>

                <Row style={marginLeft}>
                    <h4 style={marginRight}>Type</h4>
                    <abbr className="no-border" style={marginRight} >
                        <Button block outline color="primary" onClick={this.selectedType} value="ALL"
                            className={this.state.type === "ALL" ? classes.showActive : ""
                            }
                        >ALL</Button>
                    </abbr>

                    <abbr className="no-border" style={marginRight} >
                        <Button block outline color="primary" onClick={this.selectedType} value="SUBJECTIVE"
                            className={this.state.type === "SUBJECTIVE" ? classes.showActive : ""}>
                            Subjective</Button>
                    </abbr>


                    <abbr className="no-border" style={marginRight} >
                        <Button block outline color="primary" onClick={this.selectedType} value="OBJECTIVE"
                            className={this.state.type === "OBJECTIVE" ? classes.showActive : ""}>
                            Objective</Button>
                    </abbr>
                </Row>

                <Row xs="12" className="justify-content-center">
                    <Col xl={12}>
                        {this.state.questionList.length > 0
                            &&
                            <>
                                <ToolkitProvider
                                    keyField="id"
                                    data={this.state.questionList}
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
                                                    data={this.state.questionList}
                                                    columns={columns}
                                                    selectRow={selectRow}
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
                <Row>
                    <Button className={cx(classes.createNxtBtn)} onClick={this.createTemplate.bind(this)}>Create Template</Button>
                </Row>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        scheduledRequestData: state.scheduledRequestData,
        userName: state.userName
    };
};

export default connect(mapStateToProps)(QuestionTemplate)
