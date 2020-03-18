import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
//import AceEditor from "react-ace";
import ReactAce from 'react-ace-editor';
class Tables extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="10" lg="5">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Editor
              </CardHeader>
              <CardBody>
              <ReactAce
  placeholder="Placeholder Text"
  mode="java"
  theme="eclipse"
  name="blah2"
  onLoad={this.onLoad}
  onChange={this.onChange}
  fontSize={14}
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  value={`function onLoad(editor) {
  console.log("i've loaded");
}`}
  setOptions={{
  enableBasicAutocompletion: false,
  enableLiveAutocompletion: false,
  enableSnippets: false,
  showLineNumbers: true,
  tabSize: 2,
  }}/>
              </CardBody>
            </Card>
          </Col>

          
        </Row>
  
      </div>

    );
  }
}

export default Tables;
