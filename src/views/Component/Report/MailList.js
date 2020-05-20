import React, { Component } from 'react';
import { Jumbotron,Modal, Button,ListGroup, ListGroupItem  ,Container,Col,Table,CardText,CardTitle,Card,CardHeader,ModalBody,ModalFooter,ModalHeader,Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import UsersDataService from '../../../service/UsersDataService';
export class MailList extends Component {
        constructor(props){
         super(props);
         this.select=this.select.bind(this);
        }
        select(evt){
           
            console.log(evt.userId);
               this.props.addToList(evt.userId);
        }
    render() {
           // console.log(this.props.cdetail)
        return (
                <ListGroupItem>
                {this.props.cdetail}
                <Button  onClick={() =>  this.props.handleDelete(this.props.cdetail)}>&times;</Button>     
                </ListGroupItem>
                )
    }}