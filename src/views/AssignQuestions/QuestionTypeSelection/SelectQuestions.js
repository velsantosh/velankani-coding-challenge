import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, Form, CardGroup,Input } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
import PopulateQid from './PopulateQid';
import AssignSubjective from './AssignSubjective';
// import usersData from './UsersData'

class SelectQuestions extends Component {

  constructor(props) {
    super(props)
    this.state={
               questions: [],
               qidList:[],
               message: null,
               userList:[this.props.values.users],
               type:'SUBJECTIVE',
               flag:true,
               redirectToBaseView :false
              }
    this.getQuestionsByType = this.getQuestionsByType.bind(this)
  }

   componentDidMount(){
     this.getQuestionsByType();
  }

   selectedType = (e) =>{
       let type=e.target.value;
       QuestionService.getQuestionsByTypeTech(e.target.value,this.props.values.technology)
        .then(
          response => {
              this.setState({questions:response.data, qidList:[]}, ()=> console.log("clean list",this.state.qidList))
              this.setState({type:type})
              }
          );
  }
    
   getQuestionsByType(){
       QuestionService.getQuestionsByTypeTech(this.state.type,this.props.values.technology)
        .then(
            response => {
                this.setState({questions:response.data})
            }
        )
  }

    back = e => {
      e.preventDefault();
      this.props.prevStep();
      
    }

    handleSelectChange = (selectedValue) =>{
      console.log("qwerty",selectedValue);
      this.setState({qidList: [...this.state.qidList,selectedValue]
      },
      () => {console.log("Selected Objective Q List",this.state.qidList);
              this.setState({flag:false})
            });
    }

    handleSubjectiveChange = (selectedValue) =>{
      console.log("Subjective radio",selectedValue);
      this.setState({qidList: [selectedValue]},
      () => {console.log("Selected Subjective Q list",this.state.qidList);
              this.setState({flag:false})
            });
    }

  removeQuestion = itemId => {
        console.log("ItemId::",itemId);
        const items = this.state.qidList.filter(item => item !== itemId);
        this.setState({ qidList: items },
         () => {console.log("Removed UserId",this.state.qidList);
                  if(this.state.qidList === []){
                    this.setState({flag:true})
                }
              });
    }

  contactSubmit(e){
      console.log("Question Detials:",this.state.userList)
       e.preventDefault();
       this.addQuestion();
    }

  addQuestion(){
     let qidSize = this.state.qidList
     if(this.state.qidList.length !== 0){

     let data={
         "qidList":this.state.qidList,
         "assigneduidList":this.state.userList,
         "assigneruid":this.props.userName.length > 0 && this.props.userName,
      }

     QuestionService.getAllSchQuestionsByUserId(this.props.values.users).then(response => {
            let assignQidList = response.data;
            let assignList = assignQidList.filter((ques) => {
              return this.state.qidList.includes(ques.id);
          });
          console.log("assignList length",assignList.length)
          if(assignList.length === 0){
            this.assignQuestion(data);
          }
          else{
            alert("Already Question Assigned")
          }
        }
    ) 
    
      this.setState({
        redirectToBaseView: true
      });
  }
  else{
    alert("Select atleast one question");
  }
} 

assignQuestion(data){
  QuestionService.assignObjQuestion(data)
  .then(response => {
        console.log("UserResponse : ",response.status)
        
      })
    }

render() {

    const buttonContainer = {
      marginTop: '20px',
      backgroundColor :'#1dafe2',
      color:'white',
    };
    const marginRight ={
      marginBottom: '10px',
      marginRight: '0.5%'
    };

    const marginLeft ={
      marginBottom: '5px',
      marginLeft: '0.5%'
    };

    const redirectToBaseView = this.state.redirectToBaseView;
    if (redirectToBaseView === true) {
        return (<Redirect to = "/dashboard"/>);
    }
    // const userList = usersData.filter((user) => user.id < 10)
    let questionsList = this.state.questions;
    let type=this.state.type;
  // let buttonSelect
    console.log("Selected Q Type", type)
    //console.log("Selected flag", this.state.flag)
     if(type === "SUBJECTIVE"){
       return (
      <div className="animated fadeIn">
        <div className="col-xs-10 big-line btn-group" id="Skills" data-skill="4" data-is-custom="False" style={{ padding: '.5rem' }}>
            <h4>Question-Type</h4>
          </div>
          
         <Row style={marginLeft}>
            <abbr className="no-border" style={marginRight} >
            <Button block outline  color="primary" onClick = {this.selectedType} value="SUBJECTIVE">Subjective</Button>
            </abbr>
           
          
            <abbr className="no-border" style={marginRight} >
            <Button block outline color="primary" onClick = {this.selectedType} value="OBJECTIVE">Objective</Button>
            </abbr>
            </Row>

       <Row>
          <Col xl={12}>
            {/* <Card>
              <CardHeader className="bg-success mb-12">
                <i className="fa fa-align-justify"></i> Users <small className="text-white">Details</small>
              </CardHeader>
              <CardBody> */}
              <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)} >
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      {/* <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th> */}
                                <th scope="col" className="headingPrimary">#</th>
                                <th scope="col" className="headingPrimary">TITLE</th>
                                <th scope="col" className="headingPrimary">STATEMENT</th>
                                <th scope="col" className="headingPrimary">TYPE</th>
                                <th scope="col" className="headingPrimary">DIFFICULTY</th>
                                <th scope="col" className="headingPrimary">EXPECTED TIME</th>
                                
                    </tr>
                  </thead>
                  <tbody>
                   {questionsList.map((question, index) =>
                      //<QuestionRow key={index} question={question} />
                      //<PopulateQid key={index} question={question} onSelectChange={this.handleSelectChange} onDeselect = {this.removePeople} buttonSelect={"radio"}/>
                    <AssignSubjective key={index} question={question} onSelectChange={this.handleSubjectiveChange}/>
                    )}
                  </tbody>
                </Table>
              
              {/* <CardFooter> */}
              
                <Button size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Assign Questions</Button>
                <span> </span>
                <Button  primary = "false" size="sm" color="danger" onClick={this.back}><i className="fa fa-ban"></i> Previous</Button>
                {/* <Link to="/manageUser/createUser"><Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Delete</Button></Link> */}
              {/* </CardFooter> */}
              </Form>
              {/* </CardBody>
            </Card> */}
          </Col>
        </Row>
            
                    
          
      </div>
    )}
     else if(type === "OBJECTIVE"){
    return (
      <div className="animated fadeIn">
        
        <div className="col-xs-10 big-line btn-group" id="Skills" data-skill="4" data-is-custom="False" style={{ padding: '.5rem' }}>
            <h4>Question-Type</h4>
          </div>
          
         <Row style={marginLeft}>
            <abbr className="no-border" style={marginRight} >
            <Button block outline  color="primary" onClick = {this.selectedType} value="SUBJECTIVE">Subjective</Button>
            </abbr>
           
          
            <abbr className="no-border" style={marginRight} >
            <Button block outline color="primary" onClick = {this.selectedType} value="OBJECTIVE">Objective</Button>
            </abbr>
            </Row>
       <Row>
          <Col xl={12}>
            {/* <Card>
              <CardHeader className="bg-success mb-12">
                <i className="fa fa-align-justify"></i> Users <small className="text-white">Details</small>
              </CardHeader>
              <CardBody> */}
              <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)} >
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      {/* <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th> */}
                                <th scope="col" className="headingPrimary">#</th>
                                <th scope="col" className="headingPrimary">TITLE</th>
                                <th scope="col" className="headingPrimary">STATEMENT</th>
                                <th scope="col" className="headingPrimary">TYPE</th>
                                <th scope="col" className="headingPrimary">DIFFICULTY</th>
                                
                                
                    </tr>
                  </thead>
                  <tbody>
                   {questionsList.map((question, index) =>
                      //<QuestionRow key={index} question={question} />
                      <PopulateQid key={index} question={question} onSelectChange={this.handleSelectChange} onDeselect = {this.removeQuestion} buttonSelect={"checkbox"}/>
                    )}
                  </tbody>
                </Table>
              
              {/* <CardFooter> */}
              
                <Button size="sm" color="primary"><i className="fa fa-dot-circle-o" ></i> Assign Questions</Button>
                <span> </span>
                <Button  primary = "false" size="sm" color="danger" onClick={this.back}><i className="fa fa-ban"></i> Previous</Button>
                {/* <Link to="/manageUser/createUser"><Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Delete</Button></Link> */}
              {/* </CardFooter> */}
              </Form>
              {/* </CardBody>
            </Card> */}
          </Col>
        </Row>
            
                    
          
      </div>
    )
                   }
  }
}

export default SelectQuestions;
