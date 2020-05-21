import React, { Component } from 'react'
import QuestionService from '../../../service/QuestionService'
import { Button } from 'reactstrap';
import classes from "./SelectQuestions.module.css";
import cx from "classnames";
import Modals from '../../Notifications/Modals/Modals';
import DeleteChallengeModal from './DeleteChallengeModal';
import { Link,  withRouter, Redirect } from 'react-router-dom';
import AssignedQuesModals from './AssignedQuesModal';
export class ChallengeRow extends Component {
constructor(props) {
    super(props)
    this.state = {
        redirectToBaseView: false,
        redirectToDeleteModel: false,
        redirectToassignQuestion: false,
        redirectToReschedule:false,
        deleteFlag: false,
        addModelShow:false,
        ques:[],
        redirectToAssignModels:false
      }
    this.deleteChallenge = this.deleteChallenge.bind(this)
    this.reTest = this.reTest.bind(this)
    this.reSchedule = this.reSchedule.bind(this)
    this.getQuestionsByChallengeId = this.getQuestionsByChallengeId.bind(this)
}

getQuestionsByChallengeId(challengeid) {
  QuestionService.getQuestionsByChallengeId(challengeid)
    .then(
      response => {
        this.setState({ ques: response.data, redirectToAssignModels:true },()=> console.log("Model Question List",this.state.ques))
      }
    )
} 

    deleteChallenge(id) {
        this.setState({ redirectToDeleteModel: true })
        
    }

    reTest(id) {
      this.setState({ redirectToassignQuestion: true })
       
   }

  reSchedule() {
    this.setState({ redirectToReschedule: true })
    
  }
    render() {
        let actionFlag = false ;
        let disableFlag = false;
        const question = this.props.question;
        const redirectToBaseView = this.state.redirectToBaseView;
        const redirectToDeleteModel = this.state.redirectToDeleteModel;
        const challengeId = question.challengeid;
        const redirectToassignQuestion = this.state.redirectToassignQuestion;
        const redirectToReschedule = this.state.redirectToReschedule;
        const redirectToAssignModels = this.state.redirectToAssignModels;
        let addModal=()=> this.setState({redirectToAssignModels:false});
        if (redirectToDeleteModel === true) {
            return (
              
              <DeleteChallengeModal challengeId={challengeId}></DeleteChallengeModal>
            );
          }

          if (redirectToAssignModels === true) {
            return (
              
              <AssignedQuesModals show={redirectToAssignModels}
                       onHide={addModal} 
                       qlist={this.state.ques}></AssignedQuesModals>
            );
          }

          if(redirectToassignQuestion){
            return (
              // <Redirect from="/login" to="/manageUser/UserList" />
              <Redirect to={{
                               pathname: '/assignQuestion/ReAssignChallenge',
                               state: { challenge: question }
                            }}
      />
            );
          }

          if(redirectToReschedule){
            console.log("inside Reschedule")
            return (
              // <Redirect from="/login" to="/manageUser/UserList" />
              <Redirect to={{
                               pathname: '/assignQuestion/RescheduleChallenge',
                               state: { challenge: question }
                            }}
      />
            );
          }
        // if (redirectToBaseView === true) {
        //     return (
        //       <Modals message={`Challenge Deleted succesfully`} linkValue={"/assignQuestion/AssignedQuestion"}></Modals>
        //     );
        //   }

        if(question.status === "Scheduled") {
            actionFlag=true
            disableFlag=true
        }

        if(question.status === "Stale") {
          disableFlag=true
      }
        return (
            <tr key={question.challengeid}>
              <td onClick={this.getQuestionsByChallengeId.bind(this, question.challengeid)}><Link>{question.assigneduid}</Link></td>
              
              <td>{question.scheduleTime}</td>
              <td>{question.status}</td>
              <td><Button className="btn btn-primary mb-1" className={cx(classes.createTableBtn)} hidden={!actionFlag} onClick={this.reSchedule.bind()}>RESCHEDULE</Button>
                  <Button className="btn btn-primary mb-1" className={cx(classes.createTableBtn)} hidden={disableFlag} onClick={this.reTest.bind()} disabled={disableFlag}>RE-TEST</Button>
                  <Button className="btn btn-primary mb-1" className={cx(classes.createTableBtn)} onClick={this.deleteChallenge.bind(this, question.challengeid)} >DELETE</Button>
              </td>
              
            </tr>
          )
    }
}

export default ChallengeRow
