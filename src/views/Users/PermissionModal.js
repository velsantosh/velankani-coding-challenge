import React, { Component } from 'react';
//import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import classes from "./Users.module.css";
import cx from "classnames";
class PermissionModal extends Component {

  constructor(props) {
    super(props);
    

    this.redirect = this.redirect.bind(this);
    
  }

  redirect() {
      
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
                Assgined Permissions
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Permissions Assigned Successfully To Selected Role
            </Modal.Body>
            <Modal.Footer>
            <Button color="primary" className={cx(classes.createBtn)} onClick={this.redirect}>ok</Button>
            </Modal.Footer>
          </Modal>
          </div>
    );
  }
}

export default PermissionModal;
