import React, { Component } from 'react';
//import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import QuestionService from '../../../service/QuestionService'
import classes from "./SelectQuestions.module.css";
import cx from "classnames";
import Modals from '../../Notifications/Modals/Modals';
class DeleteQuestionTemplateModal extends Component {

  constructor(props) {
    super(props); 

    this.redirect = this.redirect.bind(this);
    this.redirectWithoutDel = this.redirectWithoutDel.bind(this);
  }

  redirect() {
      QuestionService.deleteQuestionTemplate(this.props.templateId)
      .then(
          response => {
              console.log("DeleteChallenge_Response : ",response.status);
              if (response.status === 200) {
                  this.props.onHide();
              } else {
                  console.log("DeleteChallenge_Response : ", response.data)
                  this.props.history.push(`/404`)
              }
          }
      )
  }

  redirectWithoutDel() {
    this.props.onHide();
  }

  render() {
    
    return (
      <div>
      <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={true}
            style={{opacity:1}}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Question Template
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            QuestionTemplate Deleted Successfully 
            </Modal.Body>
            <Modal.Footer>
            <Button color="primary" className={cx(classes.createBtn)} onClick={this.redirect}>Yes</Button>
            <Button color="primary" className={cx(classes.createBtn)} onClick={this.redirectWithoutDel}>No</Button>
            </Modal.Footer>
          </Modal>
          </div>
    );
  }
}

export default DeleteQuestionTemplateModal;
