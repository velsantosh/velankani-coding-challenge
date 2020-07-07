import React, { Component } from 'react';
import { Button, ModalBody,ModalFooter,Modal,Card, CardGroup, Container, CardBody, CardText, CardTitle, CardImg, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import QuestionService from '../../../service/QuestionService'
import classes from "../CreateQuestion/CreateQuestion.module.css";
import cx from "classnames";

class uploadFile extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          selectedFile:null,
          response:false,
          isModelOpen:false,
        }
        this.onFileChange=this.onFileChange.bind(this);  
        this.fileData=this.fileData.bind(this);
        this.onFileUpload=this.onFileUpload.bind(this);
        this.onFileUploadSubj=this.onFileUploadSubj.bind(this);
        this.toggle=this.toggle.bind(this);
      }
        toggle(){
          this.setState({selectedFile:null})
          this.setState({isModelOpen:!this.state.isModelOpen})
          console.log("called from toggle");
        }
      
      onFileUploadSubj(){
      console.log('from file upload2')
    const data = new FormData() 
   data.append('file', this.state.selectedFile)
   console.warn(this.state.selectedFile);
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
        console.log(response.status); 
        this.toggle();
      }
   }
 )   
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
            console.log(response.status);  
             this.toggle();
          }
        }
      )   
    }
    onFileChange(e){
        this.setState({ selectedFile: e.target.files[0] });
     }
      fileData(){
        if (this.state.selectedFile) { 
          
            return ( 
              <div> 
                <h2>File Details:</h2> 
                <p>File Name: {this.state.selectedFile.name}</p> 
                <p>File Type: {this.state.selectedFile.type}</p> 
                <p> 
                  Last Modified:{" "} 
                  {this.state.selectedFile.lastModifiedDate.toDateString()} 
                </p> 
              </div> 
            ); 
          } else { 
            return ( 
              <div> 
                <br /> 
                <h4>Choose before Pressing the Upload button</h4> 
              </div> 
            ); 
          } 

      }
     render() {
           console.log("upload file2")
        const buttonContainer = {
            marginBottom: '20px !important',
            backgroundColor: '#1dafe2',
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
                
                <Container>
                    <Row className="">
                        <Col md="12">
                            <CardGroup>
                                <Card style={cardStyle}>
                                    <CardBody>
                                        <CardTitle style={titleStyle}>Upload File To Add ObjectiveQuestions</CardTitle>
                                        <CardImg src={'../../../assets/img/avatars/codingQues.jpg'} className={cx(classes.questionImg)} alt="MCQ Image" />
                                    </CardBody>
                                    <CardBody>
                                    <input type="file" onChange={(e)=>this.onFileChange(e)} /> 
                                    <button className="btn btn-primary mb-1" style={buttonContainer} onClick={(e)=>this.onFileUpload()}> 
                                      Upload! 
                                    </button> 
                                    </CardBody>
                                </Card>
                                <Card style={cardStyle}>
                                    <CardBody>
                                        <CardTitle style={titleStyle}>Upload File To add SubjectiveQuestions </CardTitle>
                                        <CardImg src={'../../../assets/img/avatars/mcqQues.jpg'} className={cx(classes.questionImg)} alt="MCQ Image" />
                                    </CardBody>
                                    <CardBody>
                                    <input type="file" onChange={this.onFileChange} /> 
                                    <button className="btn btn-primary mb-1" style={buttonContainer} onClick={this.onFileUploadSubj}> 
                                      Upload! 
                                    </button> 
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
    </div>
          </div>
        );
    }
}

export default uploadFile;
