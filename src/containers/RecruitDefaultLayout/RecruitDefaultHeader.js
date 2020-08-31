import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/vcti.png'
import sygnet from '../../assets/img/brand/vcti.png'
import classes from "./RecruitDefaultHeader.module.css";
import cx from "classnames";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class RecruitDefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    
    return (
      <React.Fragment >
        {/* <AppSidebarToggler className="d-lg-none" display="md" mobile /> */}
        <AppNavbarBrand className={cx(classes.logoStyle)} 
          full={{ src: logo, width: 180, height: 100, alt: 'Velankani' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Velankani' }} 
        />
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}

        <Nav className="d-md-down-none" navbar >
          {/* <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/users" className="nav-link">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/settings" className="nav-link">Settings</NavLink>
          </NavItem> */}
          <NavItem className="px-3">
            <NavLink to="/videostream" className="nav-link">Test Video Stream</NavLink>
          </NavItem>

        </Nav>
        <Nav className="ml-auto" navbar>
        <h3>Velankani Coding Challenge Tool</h3>
        </Nav>
        <Nav className="ml-auto" navbar>
        <button className={cx(classes.logoutBtn)} onClick={e => this.props.onLogout(e)}>
          <i class="fa fa-sign-out" aria-hidden="true"></i>
        </button>
        </Nav>
      </React.Fragment>
    );
  }
}

RecruitDefaultHeader.propTypes = propTypes;
RecruitDefaultHeader.defaultProps = defaultProps;

export default RecruitDefaultHeader;
