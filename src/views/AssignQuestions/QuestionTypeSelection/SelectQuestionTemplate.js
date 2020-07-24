import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Col, Row, } from 'reactstrap';
import { Modal, ListGroup, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import QuestionService from '../../../service/QuestionService';
import classes from "../../ManageQuestion/CreateSubjective/CreateSubjective.module.css";
import cx from "classnames";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Parser from "html-react-parser";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import Modals from '../../Notifications/Modals/Modals';

class SelectQuestionTemplate extends Component {

    subQuestionData = {
        "templateName": '',
        "technology": '',
        "experience": '',
        "templateNameList": '',
    }

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownOpen: new Array(6).fill(false),
            activeTab: new Array(4).fill('1'),
            qId: '',
            redirectToBaseView: false,
            templateNameList: [],
            technology: '',
            experience: '',
            title: '',
            qidList: [],
            modal: false,
            seletedQuestionTemplate: '',
            assignQuestTempStatus: false

        };
        console.log("this.props-- SelectQuestionTemplate :", this.props.values);
    }

    componentDidMount() {
        this.getAllQuestionTemplates();
    }

    getAllQuestionTemplates() {
        const { technology, difficultyLevel, experience } = this.props.values;
        console.log("getAllQuestionTemplates : ", technology, difficultyLevel, experience);
        QuestionService.getAllQuestTempByTechDiffiExp(technology, difficultyLevel, experience)
            .then(
                response => {
                    this.setState({ templateNameList: response.data });
                }
            );
    }

    handleTemplateName = (event) => {
        console.log("selected Title : ", event.target.value);

        this.setState({ title: event.target.value })
        this.subQuestionData.templateName = event.target.value
    }

    handleTechnology = (event) => {

        console.log("selected  technology : ", event.target.value);
        this.setState({ technology: event.target.value })
        this.getQuestionsByTech(event.target.value);
        this.subQuestionData.technology = event.target.value
    }
    handleExperiance = (event) => {
        console.log("selected Experiance : ", event.target.value);
        this.setState({ experience: event.target.value });
        this.subQuestionData.experience = event.target.value

    }

    assignQuestionTemplate = () => {

        const myDate = this.props.values.date;
        let expDate = myDate.toUTCString();
        console.log(" questionList ---: ", this.state.seletedQuestionTemplate.questionList.toString().split(" "));

        const QuestionSchedulerCustom = {
            qidList: this.state.seletedQuestionTemplate.questionList, //@NonNull List<String> 
            assigneduidList: this.props.values.users.split(), //@NonNull List<String> 
            assigneruid: this.props.userName, //	private @NonNull String
            scheduleTime: expDate, //	private @NonNull Date
            status: this.props.values.status, //	private @NonNull String
            templateType: this.props.values.templateName, //	private @ String
            templateId: this.state.seletedQuestionTemplate.id, //	private @ String
            technology: this.props.values.technology, //	private @ String
            experience: this.state.seletedQuestionTemplate.experience, //	private @ String
            difficulty: this.state.seletedQuestionTemplate.difficulty, //	private @ String
            templateName: this.state.seletedQuestionTemplate.templateName //	private @ String

        }

        QuestionService.assignQuestionsByTemplate(QuestionSchedulerCustom)
            .then(
                response => {

                    console.log("response--->", response.data);

                    this.setState({
                        assignQuestTempStatus: response.data
                    })

                }
            );
        this.setState({
            redirectToBaseView: true
        });
    }
    cancel = () => {
        this.setState({
            modal: false
        });
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    selectedType = (e) => {
        let type = e.target.value;
        if (type === "ALL") {
            this.setState({ type: type })
            this.getQuestionsByTech(this.state.technology);

        } else {
            QuestionService.getQuestionsByTypeTech(e.target.value, this.state.technology)
                .then(
                    response => {
                        this.setState({ templateNameList: response.data })
                        this.setState({ type: type })
                    }
                );
        }
    }
    handleSelectChange = (row) => {
        console.log("qwerty", row);
        console.log("this.props.values :", this.props.values);
        this.setState({ seletedQuestionTemplate: row });

    }

    actionFormatter = (cell, row) => {
        return (<Button className="btn btn-primary mb-1" style={{ "backgroundColor": '#20a8d8', "color": 'white' }}>
            View Questions</Button>)
    }
    render() {



        const buttonContainer = {
            width: '200px',
            marginRight: '10px',
            marginTop: '20px',
            marginBottom: '20px !important',
            backgroundColor: '#1dafe2',
            color: 'white'
        };

        const lableStyle = {
            fontWeight: 'bold'
        };

        const marginRight = {
            marginBottom: '10px',
            marginRight: '0.5%'
        };

        const marginLeft = {
            marginBottom: '5px',
            marginLeft: '0.5%'
        };

        const redirectToBaseView = this.state.redirectToBaseView;


        let columns = [{
            dataField: 'templateName',
            text: 'Template Name',
            sort: true,
            headerStyle: { color: '#47bff7' }

        },
        {
            dataField: 'technology',
            text: 'Technology',
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
            formatter: this.actionFormatter,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    this.props.setScheduledRequestData(row);
                    this.setState({
                        challenge: row,
                        modal: true

                    })
                }
            }

        }
        ]
        const columnsQ = [{
            dataField: 'statement',
            text: 'Statement'
        }]
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
            mode: 'radio',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log("----id-->", row.id);
                console.log("---isSelect-->", isSelect);
                console.log("----rowIndex-->", rowIndex);
                console.log("----e-->", e);

                if (isSelect) {
                    this.handleSelectChange(row);
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
            <>
                <div>
                    <h1 className={cx(classes.heading)}>Select Template</h1>
                </div>
                <Container>
                    <Form>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="qtitle" style={lableStyle}>Candidate Name</Label>
                                    <Input type="textbox" value={this.props.values.users} disabled={true} name="qtitle" id="qtitle" placeholder="Enter the title" onChange={(e) => this.handleTemplateName(e)} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="technology" style={lableStyle}>Technology</Label>
                                    <Input type="select" name="technology" id="technology" value={this.props.values.technology} disabled={true} onChange={(e) => this.handleTechnology(e)}>
                                        <option disabled selected>Select Technology</option>
                                        <option>Java</option>
                                        <option>Python</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="topic" style={lableStyle}>Experiance</Label>
                                    <Input type="select" name="topic" id="topic" value={this.props.values.experience} disabled={true} onChange={(e) => this.handleExperiance(e)}>
                                        <option disabled selected>Select Experiance</option>
                                        <option>0-2</option>
                                        <option>2-4</option>
                                        <option>4-6</option>
                                        <option>6-8</option>
                                        <option>8+</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row xs="12" className="justify-content-center">
                            <Col xl={12}>
                                {this.state.templateNameList.length > 0
                                    &&
                                    <>
                                        <ToolkitProvider
                                            keyField="id"
                                            data={this.state.templateNameList}
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
                                                            data={this.state.templateNameList}
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
                        <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.assignQuestionTemplate} >Assign Template</Button>
                        <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.back}>Previous</Button>
                    </Form>

                </Container>

                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} size={"lg"} >
                        <ModalHeader>Question List</ModalHeader>
                        <ModalBody>
                            <div>
                                <BootstrapTable keyField='id' data={this.state.qidList} columns={columnsQ} />
                            </div>

                            <span>
                                <ListGroup horizontal>
                                </ListGroup>
                            </span>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.cancel}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>


            </>
        );
    }
}



const mapStateToProps = state => {
    console.log("#@#@", state.userName);
    return {
        userName: state.userName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setScheduledRequestData: scheduledRequestData =>
            dispatch({ type: actionTypes.SCHEDULEDREQUESTDATA, value: scheduledRequestData })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectQuestionTemplate);

