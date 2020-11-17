import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, CardGroup, Input, Container } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
import classes from "../../ManageQuestion/QuestionsList/Questions.module.css";
import cx from "classnames";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Parser from 'html-react-parser';
import QuestionDetails from '../../AssignQuestions/QuestionTypeSelection/QuestionDetails';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Modals from '../../Notifications/Modals/Modals';

class ManageQuestionTemplate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questTemplate: [],
            type: '',
            selectedType: '',
            selectedTechnology: '',
            activeType: 'subjective',
            activeTechnology: 'java',
            showModalFlag: false,
            selectedData: '',
            question: '',
            questionData: [],
            templateId: '',
            redirectToDeleteModel: false,
            selectedRow: ''
        }
    }

    componentDidMount() {
        console.log(" componentDidMount getAllQuestionTemplates");
        this.getAllQuestionTemplates();
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

    getAllQuestionTemplates() {
        QuestionService.getAllQuestionTemplates()
            .then(
                response => {
                    this.setState({ questTemplate: response.data })
                }
            )
    }

    getQuestionsByTypeTech(type, tech) {
        QuestionService.getQuestionsByTypeTech(type, tech)
            .then(
                response => {
                    this.setState({ questTemplate: response.data })
                }
            )
    }

   

    templateNameFormatter = (cell, row) => {
        let templateLink = `/modifyQuestionTemplate`;
        return (<Link to={{
            pathname: `/modifyQuestionTemplate`,
            state: {
                selectedRow: row
            }
        }}>
            {row.templateName}</Link>)


    }


    actionFormatter = (cellContent, row) => {
        this.setState({
            question: row
        })
        return (
            <>
                <Button className="btn btn-primary mb-1" className={cx(classes.createTableBtn)} onClick={this.viewTemplateQuestionDetails.bind(this, row.id)}>VIEW QUESTIONS</Button>
                <Button className="btn btn-primary mb-1" className={cx(classes.createTableBtn)} onClick={this.deleteQuestionTemplate.bind(this, row.id)}>DELETE</Button>
            </>
        );
    }

    viewTemplateQuestionDetails(row) {
        console.log(" view Template Question Details", row);

        QuestionService.getAllQuestionsDataByTemplateId(row).then(
            response => {
                this.setState({
                    ...this.state,
                    questionData: response.data,
                    showModalFlag: true
                })
            }
        );
    }


    deleteQuestionTemplate(row) {
        console.log(" delete Question Template row", row);

        QuestionService.deleteQuestionTemplate(row.toString()).then(
            response => {
                console.log(" delete Question Template row response ", response);
                if (response.status === 200) {
                    this.setState({ ...this.state, redirectToDeleteModel: true })
                } else {
                    console.log("delete Question Template : ", response.data)
                    this.props.history.push(`/404`)
                }
            }
        )
    }

    setModalFlag = () => this.setState({ showModalFlag: false });

    render() {
        const marginRight = {
            marginRight: '3%'
        }
        //define columns for table


        let columns = [{
            dataField: 'templateName',
            text: 'Template Name',
            sort: true,
            headerStyle: { color: '#47bff7' },
            formatter: this.templateNameFormatter,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    console.log("######## row : ", row)
                    this.props.setSelectedTemplate(row);
                }

            }
        },
        {
            dataField: 'technology',
            text: 'Technology',
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
            if (searchText == row.templateName || searchText == row.questionList) {
                return true;
            }
        }

        if (this.state.redirectToDeleteModel) {
            console.log("Question Templated Deleted successfully");
            return (
                <Modals message={`Question Templated Deleted successfully.`} linkValue={"/manageQuestion/questionList"}></Modals>
            );
        }
        return (
            <div className="animated fadeIn">
                <Container>
                    <Row className={cx(classes.filterContainer)}>
                         {/* <div className="col-md-6 big-line btn-group" id="type" style={{ padding: '.5rem' }}>
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
                                </div> */}
                        <div className="col-md-6 big-line btn-group" id="technology" style={{ padding: '.5rem', left: '2%' }}>
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


                    <Row xs={2} md={4} lg={6}>
                        <Col md={{ span: 6, offset: 9 }}>
                            <Link to="/createQuestionTemplate">
                                <Button className="btn btn-primary mb-1" className={cx(classes.createBtn)}>Create Question Template</Button>
                            </Link>
                        </Col>
                    </Row>

                    <Row xs="12" className="justify-content-center">
                        <Col xl={12}>

                            {this.state.questTemplate.length > 0
                                &&
                                <>
                                    <ToolkitProvider
                                        keyField="id"
                                        data={this.state.questTemplate}
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
                                                        data={this.state.questTemplate}
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

                    <QuestionDetails show={this.state.showModalFlag}
                        onHide={this.setModalFlag} templatedata={this.state.questionData}></QuestionDetails>
                </Container>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setSelectedTemplate: selectedTemplateData =>
            dispatch({ type: actionTypes.SELECTEDTEMPLATEDATA, value: selectedTemplateData })
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ManageQuestionTemplate);

