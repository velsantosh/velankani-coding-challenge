import React, { Component } from 'react';
import { Button, ModalBody,ModalFooter,Modal,Card, CardGroup, Container, CardBody, CardText, CardTitle, CardImg, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import QuestionService from '../../../service/QuestionService'
import classes from "../CreateQuestion/CreateQuestion.module.css";
import cx from "classnames";
import { FileIcon, defaultStyles } from 'react-file-icon';
import {TiDocumentText} from "react-icons/ti";
class uploadFile extends Component {
    constructor(props){
      super(props)
      this.myRef = React.createRef();  
       this.subjRef= React.createRef();
      this.state = {
          selectedFile:null,
          response:false,
          isModelOpen:false,
          isResponseError:false,
          subjSelectedFile:null,
          error:null,
          isSubjModelOpen:false,
          isSujResponseError:false,
          isSubjModelOpen:false,
        }
         this.chooseFile=this.chooseFile.bind(this);
         this.chooseSubjFile=this.chooseSubjFile.bind(this);
         this.onFileChange=this.onFileChange.bind(this);  
         this.onSubjFileChange=this.onSubjFileChange.bind(this);
         this.fileData=this.fileData.bind(this);
        this.onFileUpload=this.onFileUpload.bind(this);
        this.onFileUploadSubj=this.onFileUploadSubj.bind(this);
        this.toggle=this.toggle.bind(this);
        this.toggle2=this.toggle2.bind(this);
        this.isSelected=this.isSelected.bind(this);
         this.getFileName=this.getFileName.bind(this);
        this.getSubjFileName=this.getSubjFileName.bind(this);
        this.isSubjSelected=this.isSubjSelected.bind(this);
        this.subjToggle=this.subjToggle.bind(this);
        this.handleSubjError=this.handleSubjError.bind(this);
      }
         getFileName(){
              if(this.state.selectedFile) {
                return this.state.selectedFile.name
              }else{
          return 'No File Choosen'}
         } 
         getSubjFileName(){
          if(this.state.subjSelectedFile) {
            return this.state.subjSelectedFile.name
          }else{
      return 'No File Choosen'}
     } 
         isSelected(){
         if(this.state.selectedFile){
           return "Cancel"
         }else{
           return "ChooseFile"
         }
       }
       isSubjSelected(){
        if(this.state.subjSelectedFile){
          return "Cancel"
        }else{
          return "ChooseFile"
        }
      } 
       
       chooseFile(){
          console.log("choose File")
            if(this.state.selectedFile){
              this.setState({selectedFile:null})
            }else{
              this.myRef.current.click()
            }
          //this.myRef.current.click()
        }  
        chooseSubjFile(){
          console.log("choose File")
            if(this.state.subjSelectedFile){
              this.setState({subjSelectedFile:null})
            }else{
              this.subjRef.current.click()
            }
          //this.myRef.current.click()
        }
        toggle2(){
          this.setState({selectedFile:null})
          this.setState({isResponseError:!this.state.isResponseError})
          console.log("called from toggle2");
         }
         toggle(){
          this.setState({selectedFile:null})
          this.setState({isModelOpen:!this.state.isModelOpen})
          console.log("called from toggle");
        }
         subjToggle(){
          //this.setState({subjSelectedFile:null})
          this.setState({isSubjModelOpen:!this.state.isSubjModelOpen})
          console.log("called from toggle");
        }
      handleSubjError(){
      

      }
      onFileUploadSubj(){
      console.log('from file upload2')
    const data = new FormData() 
   data.append('file', this.state.subjSelectedFile)
   console.warn(this.state.subjSelectedFile);
   QuestionService.uploadObjFile(data)
 .then(
     response => {
       if(response.data === null){
         console.log(response)
         //this.setState({candidates:response.data})
         //this.setState({flag:true})
         console.log(response.data.status);
        }else{
        console.log(response.data);
        console.log(response.data.message)
        console.log(response.status); 
        console.log("ranjeet")
        this.state.subjSelectedFile=null;
        this.setState({isSubjModelOpen:!this.state.isSubjModelOpen})
        //this.subjToggle();
      }
   }
 ).catch (error =>{console.log(error.response.data.error)
               this.state.subjSelectedFile=null;
              this.state.error=error.response.data.message;
               this.setState({isResponseError:!this.state.isResponseError})
              }) 
}    
    
    onFileUpload(){
           console.log('from file upload')
         const data = new FormData() 
        data.append('file', this.state.selectedFile)
        console.warn(this.state.selectedFile);
        QuestionService.uploadSubjFile(data)
      .then(
          response => {
            if(response.data === null){
              console.log(response)
               console.log(response.data.status);
              //this.setState({candidates:response.data})
              //this.setState({flag:true})
          }else{
            console.log(response.data);
              console.log(response.data.message);
              console.log("ranjeet")
              console.log(response.status);  
             this.toggle();
          }
        }
      ).catch (error =>{console.log(error.response.data)
        this.state.error=error.response.data.message;
        this.setState({isResponseError:!this.state.isResponseError})
      })   
    }
    onFileChange(e){
        this.setState({ selectedFile: e.target.files[0] });
     }
     onSubjFileChange(e){
      this.setState({ subjSelectedFile: e.target.files[0] });
   }
     fileData(){
       // if (this.state.selectedFile) { 
            
          //  return ( 
             // <div> 
               // <h2>File Details:</h2> 
                //<p>File Name: {this.state.selectedFile.name}</p> 
                //<p>File Type: {this.state.selectedFile.type}</p> 
                //<p> 
                 // Last Modified:{" "} 
                 // {this.state.selectedFile.lastModifiedDate.toDateString()} 
                //</p> 
              //</div> 
            //); 
         // } else { 
            return ( 
              <div> 
                <br /> 
                <h4>Choose before Pressing the Upload button</h4> 
              </div> 
            ); 
          //} 

      }
     render() {
           console.log("upload file2")
        const buttonContainer = {
            marginBottom: '20px !important',
            backgroundColor: '#1dafe2',
             marginLeft: '.5rem' ,
             color: 'white'
        };
        const cardStyle = {
            backgroundColor: 'rgba(128, 128, 128, 0.08)',
            marginLeft: '3%',
            marginRight: '3%',
            border: '7px solid #767f7e'
        };

        const titleStyle = {
            alignText: 'center',
            marginLeft: '50px',
            fontWeight: 'bold'
        }

        const cardTxt = {
            height: '70px'
        }
           
        return (
                  
                <div>
                    <h1>Create Your Custom Question</h1>

                <Container style={{  borderColor: '#333' }}>
                    <Row className="">
                        <Col md="10">
                            <CardGroup >
                                <Card >
                                    <CardBody>
                                        <CardTitle color="primary">Upload File To Add ObjectiveQuestions</CardTitle>
                                        <TiDocumentText color='blue' size='10rem' />
                                    </CardBody>
                                    <CardBody>
                                    <input type="file"  style={{display:'none'}} onChange={(e)=>this.onFileChange(e)} ref={this.myRef}  /> 
                                    <Button color="primary"   onClick={(e)=>this.chooseFile()}> 
                                      {this.isSelected()}
                                    </Button>{'          '}
                                      <span>{this.getFileName()} </span>{'    '}
                                    <Button color="success" disabled={!this.state.selectedFile}  onClick={(e)=>this.onFileUpload()}> 
                                      Upload! 
                                    </Button> 
                                    </CardBody>
                                </Card>
                                <Card >
                                    <CardBody>
                                        <CardTitle style={titleStyle}>Upload File To add SubjectiveQuestions </CardTitle>
                                        <TiDocumentText  color='blue' size='10rem' />
                                    </CardBody>
                                    <CardBody>
                                    <input type="file"     style={{display:'none'}} onChange={this.onSubjFileChange} ref={this.subjRef}/> 
                                    <Button color="primary"   onClick={(e)=>this.chooseSubjFile()}> 
                                      {this.isSubjSelected()}
                                    </Button>{'          '}
                                      <span>{this.getSubjFileName()} </span>{'    '}
                                    <Button color="success" disabled={!this.state.subjSelectedFile} onClick={this.onFileUploadSubj}> 
                                      Upload! 
                                    </Button> 
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            {this.fileData()}
            <div>
      <Modal isOpen={this.state.isModelOpen}>
        <ModalBody>
            Question Added Succesfully.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Ok</Button>{' '}
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.isSubjModelOpen}>
        <ModalBody>
            Question Added Succesfully.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.subjToggle}>Ok</Button>{' '}
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.isResponseError}>
        <ModalBody>
           {this.state.error}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle2}>Ok</Button>{' '}
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.isSujResponseError}>
        <ModalBody>
           {this.state.error}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSubjError}>Ok</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
          </div>
        );
    }
}

export default uploadFile;
