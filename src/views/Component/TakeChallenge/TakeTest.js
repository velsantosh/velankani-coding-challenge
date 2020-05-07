import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import EditorJava from '../EditorJava';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';
import TestResult from '../TakeChallenge/Test/TestResult';
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import { Tabs, Tab } from 'react-bootstrap';
import Popup from "reactjs-popup";
import { Link, NavLink as RRNavLink } from "react-router-dom";

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
  CardText,
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
//   constructor(props) {
//     super(props);
//     this.state = {
//       dropdownOpen: false,
//       runtestClicked: false,
//       radioSelected: 2,
//       dropdownOpen: new Array(6).fill(false),
//       activeTab: new Array(4).fill('1'),
//       dropDownValue: 'Language',
//       editorContent: '',
//       questionContent: '',
//       qId: '',
//       testCaseResults: '',
//       showPopup: false

//     };
//     this.toggle = this.toggle.bind(this);
//     this.toggleItem = this.toggleItem.bind(this);
//     this.changeValue = this.changeValue.bind(this);
//     this.updatedEditorContent = this.updatedEditorContent.bind(this);

//   }

//   componentDidMount() {
//     console.log("componentDidMount this.props:", this.props)
//     this.updateScheduledQuesWithState();
//   }

//   updateScheduledQuesWithState() {
//     ScheduledChallengeDataService.getScheduledQuestionByUserId(this.props.userName.length > 0 && this.props.userName).then(
//       response => {
//         if (response.data === null) {
//           console.log("response null")
//           this.registerUser();
//         }
//         else {
//           response.data.map((question) => {
//             console.log("question 123:", question)
//             if (question.type === 'SUBJECTIVE') {
//               this.setState({ questionContent: question.statement });
//               this.setState({ qId: question.id });
//               this.setState({
//                 editorContent: question.methodName
//               });
//             }
//           });
//         }
//       }
//     )
//   }

//   lorem() {
//     return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
//   }

//   toggle(tabPane, tab) {
//     const newArray = this.state.activeTab.slice()
//     newArray[tabPane] = tab
//     this.setState({
//       activeTab: newArray,
//     });
//   }

//   changeValue(e) {
//     this.setState({ dropDownValue: e.currentTarget.textContent })
//   }

//   toggleItem(i) {
//     const newArray = this.state.dropdownOpen.map((element, index) => {
//       return (index === i ? !element : false);
//     });
//     this.setState({
//       dropdownOpen: newArray,
//     });
//   }

//   tabPane() {
//     return (
//       <>
//         <TabPane tabId="1">
//           {`1. ${this.lorem()}`}
//         </TabPane>
//         <TabPane tabId="2">
//           {`2. ${this.lorem()}`}
//         </TabPane>
//         <TabPane tabId="3">
//           {`3. ${this.lorem()}`}
//         </TabPane>
//       </>
//     );
//   }

//   updatedEditorContent(newValue) {

//     this.setState({ editorContent: newValue }, () => {
//       console.log("change onChangeEditor  after updating state :", this.state.editorContent);
//     });
//   };

//   handleSubmit = (event) => {

//     let key = {
//       qid: this.state.qId,
//       userId: this.props.userName
//     }

//     let resultValue = {
//       program: this.state.editorContent,
//       consolidatedoutput: this.state.editorContent,
//       className: "ExampleClass",
//       key: key
//     };


//     console.log("clicked on submit new values here takeTest: ", this.state.editorContent);
//     ScheduledChallengeDataService.submitScheduledSubQuestionResultsByUserId(resultValue)
//       .then(
//         response => {
//           console.log("submitScheduledSubQuestionResultsByUserId questions testCaseResults: ", response.data)

//           if (response.data) {
//             this.setState({ testCaseResults: "Test result submitted successfully" });
//           }
//           else {
//             this.setState({ testCaseResults: "Test program compailation failed, and submitted successfully" });
//           }
//           //hardcoded for now
//           this.setState({
//             showPopup: !this.state.showPopup
//           });

//         }
//       );
//   }

//   handleRunTest = (e) => {

//     console.log("clicked on run test", this.props);
//     let quesResponseObj = {
//       qId: this.state.qId,
//       userInput: this.state.editorContent,
//     }

//     let validateProgramContent = {
//       className: "ExampleClass",
//       quesResponseObj: quesResponseObj,
//       userId: this.props.userName
//     };

//     this.setState({ runtestClicked: true });
//     ScheduledChallengeDataService.runScheduledQuestionTestCases(validateProgramContent)
//       .then(
//         response => {
//           console.log(" runScheduledQuestionTestCases subjective questions testCaseResults: ", response.data)
//           this.setState({ testCaseResults: response.data.userInput + " : " + response.data.qId });
//         }
//       );

//   };

//   render() {

//     const headingStyle = {
//       backgroundColor: '#80808014',
//       font: 'inherit',
//       // border : '1px solid blue',
//       padding: '8px',
//       marginLeft: '10px',
//       "width": "170px",
//     }
//     const marginRight = {
//       marginRight: '0.5%'
//     };

    
//     const testCaseStyle = {
//       marginBottom: '0.25%'

//   }
//     return (
//       <div className="animated fadeIn">
//         if (this.state.showPopup) {
//           <Row>
//             <abbr class="no-border" style={marginRight} >
//               <Link to="/subQuestionsList">
//                 <Button block outline color="primary" value="SUBJECTIVE">Back to QuestionList</Button>
//               </Link>
//             </abbr>
//           </Row>}
//         <Row>
//           <Col xs="12" md="12" className="mb-4">
//             <Nav tabs>
//               <NavItem>
//                 <NavLink
//                   active={this.state.activeTab[0] === '1'}
//                   onClick={() => { this.toggle(0, '1'); }}
//                 > Challenge </NavLink>
//               </NavItem>
//             </Nav>
//             <TabContent activeTab={this.state.activeTab[0]}>
//               <pre>{this.state.questionContent}</pre>
//             </TabContent>
//           </Col>
//         </Row>
//         <Row className="p-xl-2">
//           <Col xs="12" sm="9" lg="12">
//             <Card>
//               <CardHeader>
//               </CardHeader>
//               <CardBody>
//                 <EditorJava content={this.state.editorContent} showGutter="true" updatedContent={this.updatedEditorContent} ></EditorJava>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//         <Row>
//           <Col col="6" sm="4" md="2" x1 className="card-header-actions mb-3 mb-xl-0">
//             <Button active block color="primary" aria-pressed="true" onClick={this.handleSubmit}>Submit</Button>
//           </Col>
//           <Col col="6" sm="4" md="2" x1 className="card-header-actions mb-3 mb-xl-0">
//             <Button active block color="primary" aria-pressed="true" onClick={this.handleRunTest}>Run Test</Button>
//           </Col>
//         </Row>
//         <Row>
//           <Col xs="12" md="12" className="mb-4">

//             <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
//               {/* <Tab eventKey="home" title="OutPut">
//                 <Card>
//                   <CardBody>
//                     <CardTitle style={headingStyle}>OutPut</CardTitle>
//                     <CardText>{this.state.testCaseResults}</CardText>
//                   </CardBody> style={buttonContainer}
//                 </Card> 
//                  </Tab> */}
//               <Tab eventKey="profile" title="JUnit Test Result take Test"  >
//                 <Card style={testCaseStyle} >
//                   <CardBody>
//                     <CardTitle style={headingStyle}>JUnit test case result 2</CardTitle>
//                     <CardText>{this.state.testCaseResults}</CardText>
//                   </CardBody>
//                 </Card>
//               </Tab>
//             </Tabs>
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }

// //export default Question
// const mapStateToProps = state => {
//   return {
//     userName: state.userName
//   };
// };

// export default connect(mapStateToProps)(TakeTest)
//export default TakeTest;
}