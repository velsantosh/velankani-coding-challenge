import React, { Component } from 'react'
import { AppSidebarNav2 as AppSidebarNav } from '@coreui/react';
import * as router from 'react-router-dom';
export class NavItems extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nav: {
                history: this.props.history,
                location: this.props.location,
                match: this.props.match,
                router: this.props.router,
                items: this.props.list
            },
            redirect: true

        }
    }

    render() {
        return (
            <div>
                <AppSidebarNav navConfig={this.state.nav}  router={router} {...this.props}/>
            </div>
        )
    }
}

export default NavItems
