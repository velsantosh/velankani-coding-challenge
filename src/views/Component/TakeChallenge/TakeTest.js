import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import EditorJava from '../EditorJava';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';

import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";

import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';


class TakeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      runtestClicked: false,
      radioSelected: 2,
      dropdownOpen: new Array(6).fill(false),
      activeTab: new Array(4).fill('1'),
      dropDownValue: 'Language',
      editorContent: '',
      questionContent: '',
      qId: ''
    };
    this.toggle = this.toggle.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.updatedEditorContent = this.updatedEditorContent.bind(this);
  }

  componentDidMount() {
    this.updateScheduledQuesWithState();
  }

  updateScheduledQuesWithState() {
    ScheduledChallengeDataService.getScheduledQuestionByUserId(this.props.userName.length >0 && this.props.userName).then(
      response => {
        if (response.data === null) {
          console.log("response null")
          this.registerUser();
        }
        else {
          response.data.map((question) => {
            console.log("question :", question)
            if (question.type === 'SUBJECTIVE') {
              this.setState({ questionContent: question.statement });
              this.setState({ qId: question.id });
            }

          });

          this.setState({
            editorContent: ` Class ExampleClass{
                  public static void main(String[] str){
                    System.out.println("Start the take test");
                  }}`});
        }
      }
    )
    console.log('challenge questions ');
  }

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  changeValue(e) {
    this.setState({ dropDownValue: e.currentTarget.textContent })
  }

  toggleItem(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {`1. ${this.lorem()}`}
        </TabPane>
        <TabPane tabId="2">
          {`2. ${this.lorem()}`}
        </TabPane>
        <TabPane tabId="3">
          {`3. ${this.lorem()}`}
        </TabPane>
      </>
    );
  }

  updatedEditorContent(newValue) {

    this.setState({ editorContent: newValue }, () => {
      console.log("change onChangeEditor  after updating state :", this.state.editorContent);
    });
  };

  handleSubmit = (event) => {

    console.log("clicked on submit event: ", event);
    let key = {
      qid: this.state.qId,
      userId: "test_user"
      //userId : this.props.userId
    }

    let resultValue = {
      program: this.state.editorContent,
      consolidatedoutput: this.state.editorContent,
      key: key
    };

    console.log("clicked on submit new values here : ", this.state.editorContent);
    ScheduledChallengeDataService.submitScheduledSubQuestionResultsByUserId(resultValue);

  }

  handleRunTest = (e) => {

    console.log("my question id ", this.state.qId);

    let questionProgramMap = {
      qId : this.state.qId,
      questId : this.state.editorContent

    }

    let validateProgramContent = {
      userId: "test_user",
      questionProgramMap: questionProgramMap,
    };

    console.log("clicked on run test");
    this.setState({ runtestClicked: true });
    ScheduledChallengeDataService.runScheduledQuestionTestCases(validateProgramContent);

  };

  render() {
    let unitTestResult;
    if (this.state.runtestClicked) {
      unitTestResult = (
        <Row className="p-xl-2">
          <Col xs="12" sm="9" lg="12">
            <EditorJava content={this.state.editorContent} showGutter="true"></EditorJava>
          </Col>
        </Row>);
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Challenge
                                    </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              <pre>{this.state.questionContent}</pre>
            </TabContent>
          </Col>
        </Row>
        <Row className="p-xl-2">
          <Col xs="12" sm="9" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Solution - Editor</strong>
                <div className="card-header-actions">
                  <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {
                    this.toggleItem(0);
                  }}>
                    <DropdownToggle caret>
                      {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.changeValue}>Java</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </CardHeader>
              <CardBody>
                <EditorJava content={this.state.editorContent} showGutter="true" updatedContent={this.updatedEditorContent} ></EditorJava>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col col="6" sm="4" md="2" x1 className="card-header-actions mb-3 mb-xl-0">
            <Button active block color="primary" aria-pressed="true" onClick={this.handleSubmit}>Submit</Button>
          </Col>
          <Col col="6" sm="4" md="2" x1 className="card-header-actions mb-3 mb-xl-0">
            <Button active block color="primary" aria-pressed="true" onClick={this.handleRunTest}>Run Test</Button>
          </Col>
        </Row>
        {unitTestResult}
      </div>
    );
  }
}

//export default Question
const mapStateToProps = state => {
  console.log(state.userName);
  return {
    userName : state.userName
  };
};

export default connect(mapStateToProps)(TakeTest)
//export default TakeTest;