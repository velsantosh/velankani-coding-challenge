import React, { Component } from 'react'
import { connect } from "react-redux";
import { Nav, NavItem, NavLink, Button, CardGroup, Container, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';

export class VideoChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

        console.log("this.props.userName : ", this.props.userName);
    }

    enableVideoChat() {

        ScheduledChallengeDataService.updateScheduleVideoStreamFlag(this.props.userName, "true")

        console.log("this.props.history",this.props.history);
        

     const url = `http://localhost:3000/#/testVideoStream/${this.props.userName}`;
     //const url = `https://10.0.250.140:3000/#/testVideoStream/${this.props.userName}`;

      // window.open(url, '_blank','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no ,width=720,height=800');
      window.open(url, '_blank');
    }
    render() {

        const buttonContainer = {
            marginBottom: '20px !important',
            backgroundColor: '#1dafe2',
            color: 'white',
            marginLeft: '35%',
            marginRight: '40%',
            marginBottom: '5%',
            alignContent: "center"

        };
        const cardStyle = {
            backgroundColor: 'rgba(128, 128, 128, 0.08)',
            marginLeft: '3%',
            marginRight: '3%',
            border: '7px solid #767f7e'
        };

        const textCard = {
            height: '150px'
        };

        const titleStyle = {
            alignText: 'center',
            marginLeft: '50px',
            fontWeight: 'bold'
        }
        let videoChatInstComponent = (
            <Card style={cardStyle}>
                <CardBody style={textCard}>
                    <CardTitle style={titleStyle}>Enable VideoChat</CardTitle>
                    <CardText>
                        <ul className="fa-ul">
                            <li>Check your webcam. </li>
                            <li>Test the microphone. </li>
                            <li>Check your internet speeds. </li>
                            <li>Dont swap between tabs, it invalidate test. </li>
                        </ul>
                    </CardText>
                </CardBody>

                <br></br>
                <br></br>
                <Button target="_blank" onClick={this.enableVideoChat.bind(this)} style={buttonContainer}>Start VideoChat</Button>

            </Card>
        );
        //const url = this.props.history.push(`/testVideoStream/${this.props.userName}`);

        return (

            <div>
                <Row xs="12" className="justify-content-center">
                    <Col md="12">
                        <CardGroup>

                            {videoChatInstComponent}

                        </CardGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.userName
    };
};

export default connect(mapStateToProps)(VideoChat)