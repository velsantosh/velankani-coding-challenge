import React, { Component } from 'react'
import {AppSidebarNav2 as AppSidebarNav} from '@coreui/react';
import * as router from 'react-router-dom';
export class NavItems extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
            <AppSidebarNav navConfig={this.props} {...this.props} router={router}/>
            </div>
        )
    }
}

export default NavItems
