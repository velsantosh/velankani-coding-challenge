import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, Form, CardGroup,Input } from 'reactstrap';
import QuestionService from '../../../service/QuestionService'
import PopulateQid from './PopulateQid';
import AssignSubjective from './AssignSubjective';
// import usersData from './UsersData'

function QuestionRow(props) {
  const question = props.question
  let qids = [];
  //const questionLink = `/manageQuestion/question/${question.id}`
  // const userLink1 = `/manageUser/user/${user.userName}`

  const getExp = (status) => {
    return status === '2' ? 'Below 3 yrs' :
    status === '3' ? '3 to 5' :
      status === '4' ? '3 to 5' :
        status === '6' ? '5 to 8' :
         'Above 8 yrs'
  }

  return (
    // <tr key={user.id}>
    //   <th scope="row"><Link to={userLink}>{user.id}</Link></th>
    //   <td><Link to={userLink}>{user.name}</Link></td>
    //   <td>{user.userName}</td>
    //   <td>{user.experience}</td>
    //   {/* <td>{user.role_id}</td> */}
    //   {/* <td><Badge color={getBadge(user.role_id)}>{user.role_id}</Badge></td> */}
    // </tr>
                    <tr key={question.id}>
                      <td><input type="checkbox" onChange={e => {
                                    let value = e.target.checked;
                                    if(value){
                                      qids.push(question.id,question.id);
                                    }
                                    console.log("Testtttttttttttttttt",qids);
                                  }}/></td>
                    <td>{question.statement}</td>
                    <td>{question.type}</td>
                    </tr>
    )
}

class SelectQuestions extends Component {

  constructor(props) {
    super(props)
    this.state={
        questions: [],
        qidList:[],
        message: null,
        userList:[this.props.values.users]
    }
    this.getQuestionsByType = this.getQuestionsByType.bind(this)
}

    componentDidMount(){
        this.getQuestionsByType();
    }
    getQuestionsByType(){
      console.log("Users",this.props.values.users);
      console.log("Question Type",this.props.values.type);
      QuestionService.getQuestionsByType(this.props.values.type)
        .then(
            response => {
                console.log("***************",response.data)
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
      () => console.log("Selected UserId",this.state.qidList));

      
    }

    handleSubjectiveChange = (selectedValue) =>{
      console.log("Subjective radio",selectedValue);
      this.setState({qidList: [selectedValue]},
      () => console.log("Selected UserId",this.state.qidList));

      
    }

    removeQuestion = itemId => {
    console.log("ItemId::",itemId);
    const items = this.state.qidList.filter(item => item !== itemId);
    this.setState({ qidList: items },()=>console.log("Removed UserId",this.state.qidList));
    
  }

  contactSubmit(e){
    //this.setState({userList:this.props.values.users})
    console.log("Question Detials:",this.state.userList)
    e.preventDefault();
      this.addQuestion();
      alert("Form submitted");
  }

  addQuestion(){
    let data={
      "qidList":this.state.qidList,
      "assigneduidList":this.state.userList,
      "assigneruid":this.props.userName.length >0 && this.props.userName,
      }
console.log("Question Detials:",data)
    //let permissionFlag= false;
    QuestionService.assignObjQuestion(data)
    .then(
        response => {
          console.log("UserResponse : ",response.status)
          //   if(response.status === 200){
              
          //    this.setState({response:true})
          // }else{
          //   console.log("UserResponse : ",response.data)
          // this.props.history.push(`/404`)}
        }
    )
    
} 

  render() {

    // const userList = usersData.filter((user) => user.id < 10)
    const questionsList = this.state.questions
    let type=this.props.values.type
// let buttonSelect
     if(type === "SUBJECTIVE"){return (
      <div className="animated fadeIn">
       <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="bg-success mb-12">
                <i className="fa fa-align-justify"></i> Users <small className="text-white">Details</small>
              </CardHeader>
              <CardBody>
              <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)} >
                <Table responsive hover>
                  <thead>
                    <tr>
                      {/* <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th> */}
                                <th scope="col">#</th>
                                <th scope="col">Statement</th>
                                <th scope="col">Type</th>
                                
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
              
              <CardFooter>
              
                <Button size="sm" color="primary"><i className="fa fa-dot-circle-o" ></i> Assign Questions</Button>
                <span> </span>
                <Button  primary = "false" size="sm" color="danger" onClick={this.back}><i className="fa fa-ban"></i> Previous</Button>
                {/* <Link to="/manageUser/createUser"><Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Delete</Button></Link> */}
              </CardFooter>
              </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
            
                    
          
      </div>
    )}
     else{
    return (
      <div className="animated fadeIn">
       <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="bg-success mb-12">
                <i className="fa fa-align-justify"></i> Users <small className="text-white">Details</small>
              </CardHeader>
              <CardBody>
              <Form name="registerform" className="registerform" onSubmit= {this.contactSubmit.bind(this)} >
                <Table responsive hover>
                  <thead>
                    <tr>
                      {/* <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th> */}
                                <th scope="col">#</th>
                                <th scope="col">Statement</th>
                                <th scope="col">Type</th>
                                
                    </tr>
                  </thead>
                  <tbody>
                   {questionsList.map((question, index) =>
                      //<QuestionRow key={index} question={question} />
                      <PopulateQid key={index} question={question} onSelectChange={this.handleSelectChange} onDeselect = {this.removeQuestion} buttonSelect={"checkbox"}/>
                    )}
                  </tbody>
                </Table>
              
              <CardFooter>
              
                <Button size="sm" color="primary"><i className="fa fa-dot-circle-o" ></i> Assign Questions</Button>
                <span> </span>
                <Button  primary = "false" size="sm" color="danger" onClick={this.back}><i className="fa fa-ban"></i> Previous</Button>
                {/* <Link to="/manageUser/createUser"><Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Delete</Button></Link> */}
              </CardFooter>
              </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
            
                    
          
      </div>
    )
                   }
  }
}

export default SelectQuestions;
