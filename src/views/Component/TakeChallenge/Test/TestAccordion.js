import React, { useState, useRef } from "react";
import Chevron from "./Chevron";
import { Link } from 'react-router-dom';
import { Button, Card, CardGroup, Container, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import "./Accordion.css";
import SubQuestionsList from './SubQuestionsList';

function TestAccordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  console.log("TestAccordion:", props);
  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <p className="accordion__title">{props.title}</p>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <div
          className="accordion__text" />
        {props.content.map(item => {
          return <li key={item}>
            <Link to={{
              pathname: "/subQuestionsList",
              state: {
                scheduledQuestions: false
              }
            }}>{item}</Link></li>;
        })
        }
      </div>
    </div>
  );
}

export default TestAccordion;
