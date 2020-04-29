/* Tutorial at https://youtu.be/MAD2HnUFjgg */

import React from "react";
import ReactDOM from "react-dom";
import TestAccordion from "./TestAccordion";
import { Link } from '@material-ui/core';
import { Accordion, Card, CardColumns, useAccordionToggle } from 'react-bootstrap';
import "./styles.css";

function TestAccordionLayout() {

  const list = ['Java', 'Java and SQL', 'Java and Spring Framework'];
  const simpleList = (
    <ul>
      {list.map(item => {
        return <li key={item}> <Link to="/"{...item}> {item}</Link></li>;
      })}
    </ul>
  );

  const cardStyle = {
    backgroundColor:'#80808014',
    marginLeft :'20px',
    border: '0px solid grey'
};

const headingStyle = {
  backgroundColor : 'green',
  font :'inherit',
  border : '1px solid blue',
  padding :'8px',
  }

  return (
    <div className="App">
       <div>
        <h1 className= {headingStyle}>Programming Tests</h1>
        </div>
      <CardColumns>
      <Card style ={cardStyle}>
          <TestAccordion
            title="Java"
            content={list}
          />
        </Card>        
      </CardColumns>
    </div>
  );
}

export default TestAccordionLayout;

