import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap';
import Parse from 'html-react-parser'

 export default class Counter extends Component {

    constructor(props) {
        super(props)
    }
       
      render() {
        //let  stmt=''+this.props.statement;
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
                Question Statement
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <p>{(this.props.statement)}</p> 
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    }
    


