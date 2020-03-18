import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//import Toggling from './Toggling';
//import FormReg from './FormReg';
import Users from '../../Users/Users'
import User from '../../Users/User'
import Regestration from '../../../views/ManageUser/UserRegistration/UserRegistration'
class UserDetails extends Component {
  render() {
    return (
        <Router>
            <>
                <h1>User Details</h1>
                <Switch>
                    <Route path="/" exact component={Users} />
                    <Route path="/manage/CREATE_USER" exact component={Users} />
                    <Route path="/users/:id" component={User} />
                    <Route path="/manageUser/createUser" exact component={Regestration} />
                </Switch>
            </>
        </Router>
        
    )
}
}

export default UserDetails;