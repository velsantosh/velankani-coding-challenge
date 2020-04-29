import React, { Component } from 'react';
import { Button, Card, CardGroup, Container, CardBody, CardText, CardTitle, CardImg, Col, Row } from 'reactstrap';
//import styled from "@emotion/styled";
//import Dropdowns from '../Dropdowns/Dropdowns';
import { Link } from 'react-router-dom';
import classes from "../CreateQuestion/CreateQuestion.module.css";
import cx from "classnames";


class CreateQuestion extends Component {

    render() {
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
        const marginTop = {
            marginTop: '10px'
        }

        return (
            <>
                <div>
                    <h1 className={cx(classes.heading)}>Create Your Custom Question</h1>
                </div>
                <Container>
                    <Row className="">
                        <Col md="12">
                            <CardGroup>
                                <Card style={cardStyle}>
                                    <CardBody>
                                        <CardTitle style={titleStyle}>Programming Question</CardTitle>
                                        <CardImg src={'../../../assets/img/avatars/codingQues.jpg'} className={cx(classes.questionImg)} alt="Coding question img" />
                                    </CardBody>
                                    <CardBody>
                                        <CardText>Create a coding task in various programming languages and add different test cases to validate candidate solutions.</CardText>
                                        <Link to="/manageQuestion/createSubjective">
                                            <Button className="btn btn-primary mb-1" style={buttonContainer}>Create Live Coding Question</Button>
                                        </Link>
                                    </CardBody>
                                </Card>
                                <Card style={cardStyle}>
                                    <CardBody>
                                        <CardTitle style={titleStyle}>Mutilpe Choice Question</CardTitle>
                                        <CardImg src={'../../../assets/img/avatars/codingQues.jpg'} className={cx(classes.questionImg)} alt="MCQ Image" />
                                    </CardBody>
                                    <CardBody>
                                        <CardText>For questions with multiple answer options but only one correct answer.</CardText>
                                        <Link to="/manageQuestion/createObjective">
                                            <Button className="btn btn-primary mb-1" style={buttonContainer}>Create Multiple Choice Question</Button>
                                        </Link>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

// const StyledHtmlSelect = styled.select`
//   padding: 0;
//   margin: 0 0 0 10px;
//   height: 23px !important;
//   color: black;
//   background: #fff;

// `;
export default CreateQuestion;
