import React, { Component } from 'react'
import QuestionService from '../../../service/QuestionService'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Table } from 'react-bootstrap';
import { Col, Row } from 'reactstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import Parser from "html-react-parser";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Counter from '../../AssignQuestions/QuestionTypeSelection/Counter';

class QuestionDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModalFlag: false
        }
    }

    statementFormatter = (cell, row) => {
        let stmt = "";
        if (cell != null) {
            stmt = cell.substr(0, 30);
        }

        var newStmt = `${stmt}...`
        return (<><Link>{Parser(newStmt)}</Link>
        </>);
    }
    setModalFlag = () => this.setState({ showModalFlag: false });

    render() {
        console.log("QuestionDetails ", this.props);
        console.log("QuestionDetails ", this.props.templatedata);

        let columns = [{
            dataField: 'statement',
            text: 'Question Statement',
            sort: true,
            headerStyle: { color: '#47bff7' },
            formatter: this.statementFormatter,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    this.setState({
                        ...this.state,
                        showModalFlag: true,
                        selectedData: Parser(row.statement)
                    })
                }

            }
        }]

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={true}
                style={{ opacity: 1 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Template Questions Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row xs="12" className="justify-content-center">
                            <Col xl={10}>

                                {this.props.templatedata.length > 0
                                    &&
                                    <>
                                        <ToolkitProvider
                                            keyField="id"
                                            data={this.props.templatedata}
                                            columns={columns}
                                            search
                                        //search={onColumnMatch}
                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <BootstrapTable
                                                            bootstrap4
                                                            striped
                                                            hover
                                                            keyField='id'
                                                            data={this.props.templatedata}
                                                            columns={columns}
                                                            {...props.baseProps}
                                                            bordered={false} />
                                                    </div>
                                                )
                                            }
                                        </ToolkitProvider>
                                    </>
                                }

                            </Col>

                        </Row>
                        <Counter show={this.state.showModalFlag}
                            onHide={this.setModalFlag} statement={this.state.selectedData}></Counter>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal >
        );
    }

}
export default QuestionDetails;