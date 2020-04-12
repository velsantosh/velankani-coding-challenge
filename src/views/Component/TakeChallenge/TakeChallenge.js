import React, { Component} from 'react';
import {Nav, NavItem, NavLink,Card,CardBody, CardHeader} from 'reactstrap';
import { Link, NavLink as RRNavLink } from "react-router-dom";
import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';

class TakeChallenge extends Component {
    constructor(props){
        super(props);
        this.state = {
          isChallengeFetched : false,
          responsedata:[]
        };
    }

    async componentDidMount(){
      console.log("takechallenge -> componentWillMount");
      if(!this.state.isChallengeFetched){
        let challengeQuestions = await ScheduledChallengeDataService.getScheduledQuestionByUserId('sanotsh_001');
        //.then(
        //  response => {
        //    console.log("response data");
        //    console.log(response);
        //    console.log("response data ", response.data);
        //    this.setState({
        //      responsedata:response.data
        //    });
        //  }
        //);

        console.log('challenge questions ',challengeQuestions);
      }
    }

    render(){
      console.log("state data ", this.state.responsedata);
        return (
            <div className="animated fadeIn">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Subject Test</strong>                
              </CardHeader>
              <CardBody>
                <p>Take Subject challenge  - This type of test consists of one coding test. To solve the challenge click on below link.</p>
                <Nav>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/taketest">Take Subject Challenge</NavLink>
                  </NavItem>                 
                </Nav>               
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Objective Test</strong>                
              </CardHeader>
              <CardBody>
                <p>Take Subject challenge  - This type of test consists of questions against which options are provided to select.To solve the challenge click on below link.</p>
                <Nav>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/takeobjectivetest">Take Objective Challenge</NavLink>
                  </NavItem>                 
                </Nav>               
              </CardBody>
            </Card>
            </div>
        );
    }
}

export default TakeChallenge;