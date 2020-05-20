import React, { Component } from 'react';
import { Jumbotron,Modal, Button,ListGroup, ListGroupItem  ,Table,CardText,CardTitle,Card,CardHeader,ModalBody,ModalFooter,ModalHeader,Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
export class Menu_items extends Component {
        constructor(props){
         super(props);
         this.select=this.select.bind(this);
        }
        select(evt){
            
            console.log("from select")
            console.log(evt.userId);
               /*this.props.addToList(evt.userId);*/
               this.props.addToList(evt);
            }
    render() {
           // console.log(this.props.cdetail)
        return (
            <DropdownItem onClick={() =>  this.select(this.props.cdetail)}>{this.props.cdetail.name}</DropdownItem>
        )
    }}