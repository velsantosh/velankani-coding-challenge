import React, { Component } from 'react';
import {Button} from 'reactstrap';
import { connect } from "react-redux";
import * as actionTypes from "../../../store/Actions";
import {Redirect} from 'react-router-dom';

class RequestRow extends Component{

    constructor(props){
        super(props);
        this.state = {
            redirectToQuestionsPage :false
        }
    }

    handleClick =() =>{
     this.props.setScheduledRequestData(this.props.request);
     this.setState({
        redirectToQuestionsPage :true
     })
    }

    render(){
        const scheduleBtn={
            backgroundColor:' #20a8d8',
            color: 'white'
        }
        
        const requestData = this.props.request
        const redirectToQuestionsPage = this.state.redirectToQuestionsPage;

        if (redirectToQuestionsPage === true) {
            return (<Redirect to="/selectQuestions" />);
        }
            return (
              <tr key={this.props.key}>
                <td>{requestData.requirementId}</td>
    
                <td>{requestData.technology}</td>
                <td>{requestData.interviewDate}</td>
                <td>{requestData.candidateEmailId}</td>
                <td>{requestData.candidateExperience}</td>
                <td>{requestData.hiringManagerName}</td>
                <td>{requestData.recruiterName}</td>
                <td>
                <Button className="btn btn-primary mb-1" style ={scheduleBtn} onClick={this.handleClick.bind(this)}>Schedule</Button>
                </td>
              </tr>
            )
          
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setScheduledRequestData: scheduledRequestData =>
        dispatch({ type: actionTypes.SCHEDULEDREQUESTDATA, value: scheduledRequestData })
    };
  };
  
  export default connect(
    null,
    mapDispatchToProps
  )(RequestRow);
