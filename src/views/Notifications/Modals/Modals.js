import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Modals extends Component {

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

  redirect() {
    this.setState({
      modal: !this.state.modal,
      response:true
    });
    
  }

  render() {
    if(this.state.response){
      return (
        <Redirect to={{
                             pathname: this.props.linkValue
                             
                          }}
          />
      )
    }else{
    return (
      <div className="animated fadeIn">
        
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
                  <ModalHeader toggle={this.redirect}>{this.props.header}</ModalHeader>
                  <ModalBody>
                    {this.props.message}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.redirect}>Ok</Button>
                  </ModalFooter>
                </Modal>

                

              
      </div>
    );
  }
}
}

export default Modals;
