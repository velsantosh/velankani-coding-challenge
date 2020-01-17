import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button,Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
class ButtonDropdowns extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Manage User
              </CardHeader>
              <CardBody >
              
                <Table responsive>
                  <thead>
                  <tr>
                    <th></th>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Result</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td><input type="checkbox"/></td>
                    <td>Samppa Nori</td>
                    <td>2012/01/01</td>
                    <td>Pass</td>
                    <td>
                      <Badge color="success">Final Round</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"/></td>
                    <td>Estavan Lykos</td>
                    <td>2012/02/01</td>
                    <td>Partial</td>
                    <td>
                      <Badge color="warning">Retest</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"/></td>
                    <td>Chetan Mohamed</td>
                    <td>2012/02/01</td>
                    <td>Fail</td>
                    <td>
                      <Badge color="danger">Inactive</Badge>
                    </td>
                  </tr>
                  
                  </tbody>
                </Table>
                
                <Row width="200">
                    <Col xs="8" sm="8">
                      <Link to="/manageUser/createUser">
                        <Button className="btn-primary mb-1" >Result</Button>
                        <span> </span>
                      </Link>
                    
                      <Link to="/manageUser/createUser">
                        <Button className="btn-primary mb-1" >Reschedule</Button>
                      </Link>
                    <span> </span>
                      <Link to="/manageUser/createUser">
                        <Button className="btn-primary mb-1" >Forward_Result</Button>
                        <br></br>
                       </Link> 
                    </Col>
                  </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default ButtonDropdowns;
