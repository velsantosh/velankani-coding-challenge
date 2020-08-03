import React, { Component } from 'react';
import { Button,  Modal } from 'react-bootstrap';
import QuestionService from '../../../service/QuestionService'
import classes from "./SelectQuestions.module.css";
import cx from "classnames";
class DeleteQuestionModal extends Component {

    constructor(props) {
        super(props);
        this.redirect = this.redirect.bind(this);
        this.redirectWithoutDel = this.redirectWithoutDel.bind(this);

        console.log("DeleteQuestionModal");
        console.log("DeleteQuestionModal props :", this.props);
    }

    redirect() {
        console.log("DeleteQuestionModal redirect  :", this.props);
        QuestionService.deleteQuestiob(this.props.questionId).then(
            response => {
                console.log(" delete Question row response ", response);
                if (response.status === 200) {
                    this.props.onHide();

                } else {
                    console.log("delete Question : ", response.data)
                    this.props.history.push(`/404`)
                }
            }
        )

    }

    redirectWithoutDel() {
        this.props.onHide();
    }

    render() {
        console.log("DeleteQuestionModal render  :", this.props);
        return (
            <>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    animation={true}
                    style={{ opacity: 1 }} >
                    <Modal.Header closeButton>  </Modal.Header>
                    <Modal.Body>  Do you want to Delele Question ? </Modal.Body>
                    <Modal.Footer>
                        <Button color="primary" className={cx(classes.createBtn)} onClick={this.redirect}>Yes</Button>
                        <Button color="primary" className={cx(classes.createBtn)} onClick={this.redirectWithoutDel}>No</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default DeleteQuestionModal;
