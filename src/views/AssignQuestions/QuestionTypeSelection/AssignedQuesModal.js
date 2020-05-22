import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Table } from 'react-bootstrap';
import Parser from 'html-react-parser'
import QuestionModel from './QuestionModal';
import QuestionService from '../../../service/QuestionService'

 export default class AssignedQuesModals extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
          }
    }
    // componentDidMount() {
    //     console.log("Model CandidateID ::",this.props.candidateid)
    //     this.getQuestionsByChallengeId(this.props.candidateid);
    // }

    // getQuestionsByChallengeId(challengeid) {
    //     QuestionService.getQuestionsByChallengeId(challengeid)
    //       .then(
    //         response => {
    //           this.setState({ questions: response.data })
    //         }
    //       )
    // }  
      render() {
        const questionList = this.props.qlist;
        console.log("Candidate ID::",questionList)
        return (
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
                Assgined Questions
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
              <Table responsive hover striped>
                  <thead>
                    <tr>
                      <th scope="col" className="headingPrimary">TITLE</th>
                      <th scope="col" className="headingPrimary">STATEMENT</th>
                      <th scope="col" className="headingPrimary">TECHNOLOGY</th>
                      <th scope="col" className="headingPrimary">TYPE</th>
                    </tr>
                  </thead>
                  <tbody>
                  {questionList.map((question, index) =>
                      <QuestionModel key={index} question={question}/>
                    )}
                  </tbody>
                </Table>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    }
    


