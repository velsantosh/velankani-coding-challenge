import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Toggling from './Toggling';
import FormReg from './FormReg';


class UserDetails extends Component {
  render() {
    return (
        <Router>
            <>
                <h1>User Details</h1>
                <Switch>
                    <Route path="/" exact component={Toggling} />
                    <Route path="/users" exact component={Toggling} />
                    <Route path="/users/:id" component={FormReg} />
                </Switch>
            </>
        </Router>
    )
}
}

export default UserDetails;