import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class AdminDefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://velankani.com">VSPL</a> &copy; 2019 .</span>
        <span className="ml-auto">Powered by <a href="https://velankani.com">Velankani Coding Tool</a></span>
      </React.Fragment>
    );
  }
}

AdminDefaultFooter.propTypes = propTypes;
AdminDefaultFooter.defaultProps = defaultProps;

export default AdminDefaultFooter;
