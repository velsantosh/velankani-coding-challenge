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
import { connect } from "react-redux";

class ModifyQuestionTemplate extends Component {

    ModifyQuestionTemplateData = {
        "templateName": '',
        "technology": '',
        "experience": '',
        "difficulty": '',
        "questionList": '',
    }

    constructor(props) {
        super(props);
        const { difficulty, experience, id, questionList, technology, templateName } = this.props.questionTempData;
        this.state = {
            qidList: [],
            qId: '',
            disabled: true,
            redirectToBaseView: false,
            templateId: id,
            questionList: [],
            technology: technology,
            experience: experience,
            templateQuestList: questionList,
            templateName: templateName,
            difficulty: difficulty

        };

        console.log("this.props.questionTempData: ", this.props.questionTempData);
        console.log("templateQuestList: ", this.state.templateQuestList[0].split(" "));
        //console.log("templateQuestList:split ", this.state.templateQuestList.split(" "));
        

    }

    componentDidMount() {
        const { technology, difficulty, experience } = this.state;
        console.log("componentDidMount technology, difficulty, experience : ", technology, difficulty, experience);

        this.getAllQuestionsByTechDiffiExp(technology, difficulty, experience);
    }


    getAllQuestionsByTechDiffiExp(technology, difficulty, experience) {

        console.log("getAllQuestionsByTechDiffiExp technology, difficulty, experience : ", technology, difficulty, experience);
        QuestionService.getAllQuestionsByTechDiffiExp(technology, difficulty, experience)
            .then(
                response => {
                    console.log("getAllQuestionsByTechDiffiExp  response.data : ", response.data);
                    this.setState({ questionList: response.data })
                }
            );
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

    close = () => {
        this.setState({
            redirectToBaseView: true
        });
    }
    handleDifficultyLevel = (event) => {
        console.log("selected  difficulty : ", event.target.value);
        this.setState({ difficulty: event.target.value })
        this.getAllQuestionsByTechDiffiExp(this.state.technology, event.target.value, this.state.experience);
    }

    handleTechnology = (event) => {
        console.log("selected  technology : ", event.target.value);
        this.setState({ technology: event.target.value })
        this.getAllQuestionsByTechDiffiExp(event.target.value, this.state.difficulty, this.state.experience);
    }
    handleExperiance = (event) => {
        console.log("selected Experiance : ", event.target.value);
        this.setState({ experience: event.target.value });
        this.getAllQuestionsByTechDiffiExp(this.state.technology, this.state.difficulty, event.target.value);

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

    updateQuestionTemplate = () => {
        console.log("this.state.qidList", this.state.qidList);
        this.ModifyQuestionTemplateData.templateName = this.state.templateName;
        this.ModifyQuestionTemplateData.questionList = this.state.qidList.toString();
        this.ModifyQuestionTemplateData.difficulty = this.state.difficulty;
        this.ModifyQuestionTemplateData.technology = this.state.technology;
        this.ModifyQuestionTemplateData.experience = this.state.experience;

        QuestionService.updateQuestionTemplate(this.ModifyQuestionTemplateData, this.state.templateId)
            .then(response => {
                this.setState({
                    redirectToBaseView: true
                });
            })
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

        const text = {
            textAlign: 'left',
            marginLeft: '7%'
        }

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


        return (
            <>
                <Row>
                    <div>
                        <h2 className={cx(classes.heading)}>Modify Question Template : </h2>
                        <h6 style={text} className="headingPrimary">Template Name : <strong><u>{this.state.templateName}</u></strong></h6>
                    </div>
                </Row>

                <Container>
                    <Form>

                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="technology" style={lableStyle}>Technology</Label>
                                    <Input type="select" name="technology" id="technology" onChange={(e) => this.handleTechnology(e)} value={this.state.technology}>
                                        <option disabled >Select Technology</option>
                                        <option>Java</option>
                                        <option>Python</option>

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="experience" style={lableStyle}>Experience</Label>
                                    <Input type="select" name="experience" id="experience" onChange={(e) => this.handleExperiance(e)} value={this.state.experience}>
                                        <option disabled >Select Experience</option>
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
                                    <Label for="difficulty" style={lableStyle}>Difficulty</Label>
                                    <Input type="select" name="difficulty" id="difficulty" onChange={(e) => this.handleDifficultyLevel(e)} value={this.state.difficulty}>
                                        <option disabled >Select Difficulty Level</option>
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


                        <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.updateQuestionTemplate} >Update Template</Button>
                        <Button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.close}>Cancel</Button>
                    </Form>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        questionTempData: state.selectedTemplateData
    };
};
export default connect(mapStateToProps)(ModifyQuestionTemplate);
