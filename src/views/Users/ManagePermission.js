import React, { Component } from 'react'
import classes from "./Users.module.css";
import cx from "classnames";
import { Card, CardBody, CardHeader, Col, Row, CardFooter, Button, Form, Table, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import AssignPermissions from './AssignPermissions';
import UsersDataService from '../../service/UsersDataService';

import PermissionModal from './PermissionModal';
import people from '../../assets/img/avatars/cil-people.png'

export class ManagePermission extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          fields: {},
          errors: {},
          value: "C",
          value1: "CA",
          response:false,
          flag: true,
          redirectToDeleteModel: false,
          redirectFlag:false,
          permissionIdList:[],
          assigndQuesT: [],
          unassignQuesT:[],
          permissionData:[{ids:"0",permissions:"MANAGE USER",description:"Permission to 'Add, Modify, Delete' users Details"},
                          {ids:"1",permissions:"VIEW USER",description:"Permission to read only User Details"},
                          {ids:"2",permissions:"MANAGE QUESTION",description:"Permission to 'Add, Modify, Delete' Questions"},
                          {ids:"3",permissions:"VIEW QUESTION",description:"Permission to read only Questions"},
                          {ids:"4",permissions:"SCHEDULE TEST",description:"Permission to Schedule Test for candidates(Schedule on VConnect)"},
                          {ids:"5",permissions:"ASSIGN QUESTION",description:"Permission to Schedule Test for candidates through CCT"},
                          {ids:"6",permissions:"TAKE TEST",description:"Permission for candidates to take test"},
                          {ids:"7",permissions:"VIEW RESULT",description:"Permission to view test results"},
                          {ids:"8",permissions:"TEST",description:"Permission"},
                          {ids:"9",permissions:"CANDIDATES REPORT",description:"Permission to list candidates's test report"}]
          
        }
      }
      
      componentDidMount() {
          this.setState({unassignQuesT:this.state.permissionData, value:"C"})
      }

      redirect() {
        this.setState({value:"C"})
    }

      handleSelectChange = (selectedValue) => {
        console.log("qwerty", selectedValue);
        this.setState({
            permissionIdList: [...this.state.permissionIdList, selectedValue]
        },
          () => {
            console.log("Selected permission List", this.state.permissionIdList);
            this.setState({ flag: false })
          });
      }
    
      removeQuestion = itemId => {
        console.log("ItemId::", itemId);
        const items = this.state.permissionIdList.filter(item => item !== itemId);
        this.setState({ permissionIdList: items },
          () => {
            console.log("Removed UserId", this.state.permissionIdList);
            if (this.state.permissionIdList === []) {
              this.setState({ flag: true })
            }
          });
      }

      contactSubmit(e){
        e.preventDefault();
        const uniqueSet = new Set(this.state.permissionIdList);
    console.log("final Question List",uniqueSet)
    const selectedPermIds = [...uniqueSet];
    if (this.state.permissionIdList.length !== 0) {
        let data = {
            "permissions": selectedPermIds,
          }
          UsersDataService.updateRolePermission(this.state.value,data) .then(
            response => {
              console.log("UserResponse : ",response.status)
                if(response.status === 200){
                  this.setState({ redirectToDeleteModel: true})
              }
            }
        )
      }
      else {
        alert("Select atleast one Permission from below list");
      }
    }
      handleChange = (event) => {
        let assignList = [];
        let  itemnav = [];
        this.setState({
            value: event.target.value
        },()=>UsersDataService.getPermissionIdByRole(this.state.value).then(
            response => {
                this.setState({permissionIdList:response.data},
                    ()=>{console.log("Permissions for the Selected Role : ",this.state.permissionIdList)
                          if(this.state.permissionIdList !== []){
                               assignList = this.state.permissionData.filter((ques) => {
                                                                         return this.state.permissionIdList.includes(ques.ids);
                                                                          });
                                                                        }                               
                               itemnav = this.state.permissionData.filter((item) =>   {
                                                                           return !assignList.some((ques) =>{return item.ids === ques.ids});
                                                                          });
                               this.setState({assigndQuesT:assignList,unassignQuesT:itemnav},()=>console.log("Un-Assigned Permissions ::", this.state.unassignQuesT))
                                                                    })
            }
        ));
    }
    render() {

      let addModal = () => this.setState({ redirectToDeleteModel:false },()=> this.redirect());
      if (this.state.redirectToDeleteModel === true) {
        return (
  
          <PermissionModal show={this.state.redirectToDeleteModel} 
                                 onHide={addModal}>
          </PermissionModal>
        );
      }
      const margin = {
            marginTop: '40px'
          };

        //   let assignList = [];
        //   let itemnav = [];
        //   if (this.state.permissionIdList !== []) {
        //     assignList = permissions.filter((ques) => {
        //      return this.state.permissionIdList.includes(ques.id);
        //    });

        //     itemnav = permissions.filter((item) =>   {
        //     return !assignList.some((ques) =>{return item.id === ques.id;});
        //    });

        //    console.log("Assigned Permissions ::", assignList);
        //    console.log("Un-Assigned Permissions ::", itemnav);
        // } 
       
        return (
            <div className="animated fadeIn">
        <Row className="justify-content-center" style={margin}>
          <Col md="10" lg="12" xl="11">
            {/* <Card className="mx-4 shadow-lg mx-10">
              <CardHeader className="mb-12 bg-primary">
                <strong><i className="icon-user pr-1"></i>Manage Permissions</strong>
              </CardHeader>
              <CardBody> */}
                  {/* <Table responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table> */}

                  <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)}>
                   <Row>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <img src={people} width="15" height="10" className="img-brand" alt="User" />
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input ref="role" type="text" placeholder="Role" autoComplete="role" onChange={this.handleChange.bind(this, "role")} value={this.state.users["role"]}/> */}
                      <select  className="form-control" id="exampleFormControlSelect" value={this.state.value} onChange={this.handleChange}>
                        <option value="C" disabled>Select Role</option>
                        <option key={2} value={"2"}>{"ADMIN"}</option>
                        <option key={3} value={"3"}>{"RECRUITMENT"}</option>
                        <option key={4} value={"4"}>{"CANDIDATE"}</option>
                        <option key={5} value={"5"}>{"INTERVIEWER"}</option>
                        <option key={6} value={"6"}>{"GUEST"}</option>
                        <option key={7} value={"7"}>{"TEST"}</option>
                    </select>  
                    </InputGroup>
                    </Row>
                    <Row>
                    <Table responsive hover striped>
                  <thead>
                    <tr>
                      <th scope="col" className="headingPrimary">#</th>
                      <th scope="col" className="headingPrimary">PERMISSIONS</th>
                      <th scope="col" className="headingPrimary">DESCRIPTION</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.assigndQuesT.map((permission, index) =>
                    <AssignPermissions key={index} permission={permission} onSelectChange={this.handleSelectChange} onDeselect={this.removeQuestion} defaultChecked={true}/>
                      )}
                    {this.state.unassignQuesT.map((permission, index) =>
                    <AssignPermissions key={index} permission={permission} onSelectChange={this.handleSelectChange} onDeselect={this.removeQuestion} defaultChecked={false}/>
                      )}
                  </tbody>
                </Table>
                    </Row>
                    
                    <CardFooter>
             
                <Button type="submit" size="sm" className={cx(classes.createBtn)}><i className="fa fa-dot-circle-o"></i> Update</Button>
              </CardFooter>
                  </Form>
              {/* </CardBody>
              
            </Card> */}
          </Col>
        </Row>
      </div>
        )
    }
}

export default ManagePermission
