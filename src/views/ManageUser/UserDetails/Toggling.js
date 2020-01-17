import React, { Component } from 'react';

import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap';
import ListUserDetails from './ListUserDetails';
import FormReg from './FormReg';


export class Toggling extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             action:'update',
             
        }
        
      }
    
    nextStep = () => {
        //const{ action } = this.state;
        this.setState({
        action: 'add'
      });
    };

    render() {
        const{action} = this.state;
        console.log(this.state.action);
        switch(action){
            case 'add':
             return (
              
                <div className="animated fadeIn" fluid={true}>
                   <Row className="justify-content-center" width="200">
                      <Col md="6" lg="7" xl="6">
                        <Card className="shadow p-3 mb-5 bg-white rounded">
                          <CardHeader>
                            <i className="fa fa-align-justify"></i> Manage User
                          </CardHeader>
                          <CardBody className="p-4">
                            <Row width="200">
                              <ListUserDetails history={this.props.history}/>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md="6" lg="7" xl="6">
                        <FormReg/>
                      </Col>
                  </Row>
                </div>
            )
            case 'update':
            return (
                 <div className="animated fadeIn" fluid>
                  <Row className="justify-content-left" width="200">
                    <ListUserDetails/>
                  </Row>
                </div>
            )
            default:
            return <h1>success</h1> 
        }
        
    }
}

export default Toggling
