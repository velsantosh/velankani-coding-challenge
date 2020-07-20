import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, FormText, Col, Row, InputGroup, InputLabel, InputGroupAddon, InputGroupText } from 'reactstrap';
import QuestionService from '../../../service/QuestionService';
import classes from "../../ManageQuestion/CreateSubjective/CreateSubjective.module.css";
import cx from "classnames";
import Slider from '@material-ui/core/Slider';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Parser from "html-react-parser";
import { Link } from 'react-router-dom';

class CreateQuestionTemplate extends Component {

    subQuestionData = {
        "templateName": '',
        "technology": '',
        "experience": '',
        difficulty : '',
        "questionList": '',
    }

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownOpen: new Array(6).fill(false),
            activeTab: new Array(4).fill('1'),
            qId: '',
            redirectToBaseView: false,
            questionList: [],
            technology: '',
            experience: '',
            difficulty : '',
            title: '',
            qidList: []

        };
    }

    componentDidMount() {
        this.getQuestionsByTech(this.state.technology);
    }


    getQuestionsByTech(technology) {
        console.log("this.this.state.technology : ", technology);
        QuestionService.getQuestionsByTech(technology)
            .then(
                response => {
                    this.setState({ questionList: response.data })

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
    handleDifficulty = (event) => {
        console.log("selected difficulty : ", event.target.value);
        this.setState({ difficulty: event.target.value });
        this.subQuestionData.difficulty = event.target.value
    }


    createQuestionTemplate = () => {
        console.log("this.state.qidList", this.state.qidList);
        this.subQuestionData.questionList = this.state.qidList;

        QuestionService.createQuestionTemplate(this.subQuestionData)
            .then(response => {
                this.setState({
                    redirectToBaseView: true
                });
            })
    }

    close = () => {
        this.setState({
            redirectToBaseView: true
        });
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
                        this.setState({ questionList: response.data })
                        this.setState({ type: type })
                    }
                );
        }
    }
    handleSelectChange = (selectedValue) => {
        console.log("qwerty", selectedValue);
        this.setState({
            qidList: [...this.state.qidList, selectedValue]
        },
            () => {
                console.log("Selected Objective Q List", this.state.qidList);
                this.setState({ flag: false })
            });
    }

    removeQuestion = itemId => {
        console.log("ItemId::", itemId);
        const items = this.state.qidList.filter(item => item !== itemId);
        this.setState({ qidList: items },
            () => {
                console.log("after unselecting remaining items", this.state.qidList);
                if (this.state.qidList === []) {
                    this.setState({ flag: true })
                }
            });
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

        if (redirectToBaseView === true) {
            return (<Redirect to="/manageQuestionTemplate" />);
        }

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
            <>
                <div>
                    <h1 className={cx(classes.heading)}>Create Question Template heading</h1>
                </div>
                <Container>
                    <Form>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="qtitle" style={lableStyle}>Template Name</Label>
                                    <Input type="textbox" name="qtitle" id="qtitle" placeholder="Enter the title" onChange={(e) => this.handleTemplateName(e)} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="technology" style={lableStyle}>Technology</Label>
                                    <Input type="select" name="technology" id="technology" onChange={(e) => this.handleTechnology(e)}>
                                        <option disabled selected>Select Technology</option>
                                        <option>Java</option>
                                        <option>Python</option>

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="topic" style={lableStyle}>Experiance</Label>
                                    <Input type="select" name="topic" id="topic" onChange={(e) => this.handleExperiance(e)}>
                                        <option disabled selected>Select Experiance</option>
                                        <option>0-2</option>
                                        <option>2-4</option>
                                        <option>4-6</option>
                                        <option>6-8</option>
                                        <option>8+</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="difficultyComponentSelect" style={lableStyle}>Difficulty Level</Label>
                                    <Input type="select" name="topic" id="difficultyComponentSelect" onChange={(e) => this.handleDifficulty(e)}>
                                    <option disabled selected>Select Difficulty Level</option>
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                    </Input>
                                </FormGroup>
                            </Col> 

                        </Row>
                        <FormGroup>
                            <Label for="statement" style={lableStyle}>Select Questions</Label>
                        </FormGroup>

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


                        <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.createQuestionTemplate} >Create Template</Button>
                        <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.close}>Cancel</Button>
                    </Form>

                </Container>
            </>
        );
    }
}

export default CreateQuestionTemplate;
