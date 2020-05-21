import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import QuestionService from '../../../service/QuestionService'
import classes from "./SelectQuestions.module.css";
import cx from "classnames";
import Modals from '../../Notifications/Modals/Modals';
class DeleteChallengeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      response:false
    };

    this.toggle = this.toggle.bind(this);
    this.redirect = this.redirect.bind(this);
    
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
    
  }

  redirect(flag) {
    if(flag){
      QuestionService.deleteChallenge(this.props.challengeId)
      .then(
          response => {
              console.log("DeleteChallenge_Response : ",response.status);
              if (response.status === 200) {
                  this.setState({ redirectToBaseView: true })
              } else {
                  console.log("DeleteChallenge_Response : ", response.data)
                  this.props.history.push(`/404`)
              }
          }
      )
    }
    this.setState({
      modal: !this.state.modal,
      response:true
    });
    
  }

  render() {
    if(this.state.response){
      return (
        <Redirect to={{
                             pathname: `/assignQuestion/AssignedQuestion`
                             
                          }}
          />
      )
    }else{
    return (
      <div className="animated fadeIn">
        
                <Modal aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={true}
            style={{opacity:1}} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
                  <ModalHeader toggle={this.redirect.bind(this, false)}>{this.props.header}</ModalHeader>
                  <ModalBody>
                  <div className="container">{`Do You Want To Permanently Delete the Test`}</div>
                    
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" className={cx(classes.createBtn)} onClick={this.redirect.bind(this, true)}>Yes</Button>
                    <Button color="primary" className={cx(classes.createBtn)} onClick={this.redirect.bind(this, false)}>No</Button>
                  </ModalFooter>
                </Modal>
      </div>
    );
  }
}
}

export default DeleteChallengeModal;
