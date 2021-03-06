import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardGroup, Container, CardBody, CardHeader,
  CardText, CardTitle, CardSubtitle, Col, Row, CardColumns
} from 'reactstrap';
import Parser from 'html-react-parser';

function QuestionContent(props) {

  const titleStyle = {
    marginLeft: '10px',
    alignText: 'right',
    padding: '1px 2px 1px 2px'
  }

  return (
<Row>
    <Card>
    {/* <img width="100%" src="./public/assets/img/avatars/318x180.svg" alt="Card image cap" /> */}
      <CardBody>
        { /* <CardText>{this.state.questions[idx].statement}</CardText> */}
        <CardText style={titleStyle}>{Parser(props.content)}</CardText>
      </CardBody>
    </Card>
  </Row>
  );

  //<h5 className="question">{props.content}</h5>;
}

export default QuestionContent;
