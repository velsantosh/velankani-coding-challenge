import React, { Component } from 'react';
import Charts from '../../Charts/Charts';
import { Jumbotron,Modal, Button,ListGroup,Container,Row, ListGroupItem,Breadcrumb,BreadcrumbItem,Table,CardText,CardTitle,Card,CardHeader,ModalBody,ModalFooter,ModalHeader,Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { CandidateReportRow } from './CandidateReportRow';
import UsersDataService from '../../../service/UsersDataService'
import { connect } from "react-redux";
import { Menu_items } from './Menu_items';
import { MailList } from './MailList';
 import app from '../../../App.scss';
 import { useAlert } from 'react-alert'
 import ChipInput from 'material-ui-chip-input'
 import { MailAlert } from './MailAlert';
 class CandidatesReport extends Component {
    constructor(props) {
        super(props)
        this.userid=""
          this.id='';
        this.state = {
         candidates: [],
         interviewer:[],
          tempInterviewer:[],
         emails:[],
         message: null,
         flag:false,
        modal:false,
        isDropDown:false,
        isMailAlertVisible:false,
      }
         this.getUserDetail=this.getUserDetail.bind(this);
        this.getAllCandidates = this.getAllCandidates.bind(this);
          this.toggle=this.toggle.bind(this);
          this.toggle1=this.toggle1.bind(this);
          this.deleteFromMailList=this.deleteFromMailList.bind(this);
          this.addToMailingList=this.addToMailingList.bind(this);
           this.sendToInterviewrs=this.sendToInterviewrs.bind(this);
            this.deleteFromInterviewrsList=this.deleteFromInterviewrsList.bind(this);
            this.onDismiss=this.onDismiss.bind(this);
          }
          deleteFromInterviewrsList(mail){
        
            console.log("delete from interviewerList");
            this.setState({
              interviewer: this.state.interviewer.filter(email => email.userId !== mail)
            });
          }
          sendToInterviewrs(){
          console.log("send to all interviers");
           let  tempListOfinterviewerEmails=[];
              for(let i=0;i<this.state.emails.length;i++){
               tempListOfinterviewerEmails.push(this.state.emails[i].userId);
              }
            let tempListOfEmails =tempListOfinterviewerEmails;
            let stringOfListOfEmails ="";
             if(tempListOfEmails.length==1){
                     stringOfListOfEmails=tempListOfEmails[0];
             }else{
            for(var i=0;i<tempListOfEmails.length-1;i++) {
                 stringOfListOfEmails+=tempListOfEmails[i]+";";                             
          }
           stringOfListOfEmails+=tempListOfEmails[tempListOfEmails.length-1];
        }
          
          let  payload={
             toEmailIds:stringOfListOfEmails,
               candidateId:this.id,
              }
          UsersDataService.sendToInterviewers(payload)
      .then(
          response => {
            if(response.data === null){
              console.log(response)
              //this.setState({candidates:response.data})
              //this.setState({flag:true})
          }else{
            console.log(response)
              this.setState({interviewer:response.data})
              console.log("fromInterviewer"); 
              console.log(response.data)
              alert("Mail has been sent to concerned interviewer");
              this.onDismiss();
            }
        }
      )
      this.setState({modal:!this.state.modal}) ;
       /*this.onDismiss();*/
    }    
        onDismiss(){
          this.setState({isMailAlertVisible:!this.state.isMailAlertVisible});
        }

        toggle1(){
           this.setState({isDropDown:!this.state.isDropDown});
         }

          toggle(id){
            this.id=id;
            console.log("togle is called");
            UsersDataService.getInterviewer()
      .then(
          response => {
            if(response.data === null){
              console.log(response)
              //this.setState({candidates:response.data})
              //this.setState({flag:true})
          }else{
            console.log(response)
              this.setState({interviewer:response.data})
              console.log("fromInterviewer"); 
              console.log(response.data)
            }

        }
      )
         
      this.state.emails.splice(0,this.state.emails.length)
      this.setState({modal:!this.state.modal}) ;
           }
         
     componentDidMount() {
      //this.getUserDetail(this.props.usrName)
      this.getAllCandidates(this.props.usrName);
    }
    getUserDetail(userName){
      //console.log( this.props.userName); 
      //console.log("userdetail");
        UsersDataService.retrieveUserByUserName(this.props.userName)
          .then(
              response => {
                if(response.data === null){
                  console.log(response)
                  //this.setState({candidates:response.data})
                  //this.setState({flag:true})
              }else{
                console.log(response)
                 // this.setState({candidates:response.data})
                  this.userId=response.data.userId;
                      console.log(this.userId);
                  console.log(response.data)
                }
            }
          )
      }
      getAllCandidates(){
      console.log( this.userId); 
      console.log("making http request");
        UsersDataService.getAllCandidates(this.props.userName)
          .then(
              response => {
                if(response.data === null){
                  console.log(response)
                  this.setState({candidates:response.data})
                  this.setState({flag:true})
              }else{
                console.log(response)
                  this.setState({candidates:response.data})
                  console.log(response.data)
                }
            }
          )
      }
        addToMailingList(mail){
          if(this.state.emails.indexOf(mail) !== -1){
            alert("Value exists!")
               return ; }
          console.log(mail);
           this.setState({
            emails:[...this.state.emails, mail],
            
          }); 
           this.deleteFromInterviewrsList(mail.userId);
          console.log("from mailinglist");
          }
          
          deleteFromMailList(mail){
            console.log("delete from list");
            this.setState({
              emails: this.state.emails.filter(email => email.userId !== mail.userId)
            });
            this.setState({interviewer:[...this.state.interviewer, mail]});
          }
    render() {
        const candidateList = this.state.candidates;
          const interviewerList=  this.state.interviewer;   
           const mailingList=this.state.emails;
          console.log(this.props.userName)
        console.log("form CandidateReport");
        return (  
            <div className="container-fluid">
                <div >
                <Card body color="info">
            <CardHeader >CandidatesReport</CardHeader>
      </Card>
                </div>
                <div>
                    <Table striped >
                        <thead>
                            <tr><th><input type="checkbox" /></th><th> Candiadte Name </th> <th>Test Case Report </th><th> status</th><th>Test Report</th><th>Test scheduler</th></tr>
                        </thead>
                        <tbody>
                            {candidateList.map((cdetail ,index) =>
                                <CandidateReportRow key={index} cdetail={cdetail} toggle2={this.toggle} />
                            )}
                        </tbody>
                    </Table>

                </div>
               <div>
               <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} size= {"lg"} >
        <ModalHeader toggle={this.toggle}>Mail To All Interviewer</ModalHeader>
        <ModalBody>
               To
               <div> </div>
              
               <span>
    {mailingList.map(email => (
      <span>
        {email.userId}
        <Button
          type="button"
          className="button"
          onClick={() =>  this.deleteFromMailList(email)}
        >
          &times;
        </Button>
      </span>
    ))}
    
    </span>
  
              <span>
              <ListGroup horizontal>
             {
               /*mailingList.map((cdetail ,index) =>
               <MailList key={index} cdetail={cdetail} handleDelete={this.deleteFromMailList} />
             )*/}</ListGroup>
           </span>  
           
               <Dropdown isOpen={this.state.isDropDown} toggle={this.toggle1}>
      <DropdownToggle caret>
        Dropdown
        </DropdownToggle>
      <DropdownMenu>
        {
          interviewerList.map((cdetail ,index) =>
          <Menu_items key={index} cdetail={cdetail} addToList={this.addToMailingList} />
      )}
        
      </DropdownMenu>
    </Dropdown>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.sendToInterviewrs}>Proced</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
               </div><div>
        
               <MailAlert isMailAlertVisiblee={this.state.isMailAlertVisible}  togglee={this.onDismiss}/>
               </div>
            </div>
        );

    }

}
const mapStateToProps = state => {
   //console.log(state.userName);
  return {
    userName : state.userName
  };
};

export default connect(mapStateToProps)(CandidatesReport)
