import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
export class  MailAlert extends Component{
         constructor(props){
             super(props)}
         render(){
             
            return(
                <Alert color="info" isOpen={this.props.isMailAlertVisiblee} toggle={this.props.togglee}>
                 Mail has been succfully sent
              </Alert>
             );
             }


            
         }
      
             


         






