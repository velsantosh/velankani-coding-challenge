import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class RecruitDefaultFooter extends Component {
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

RecruitDefaultFooter.propTypes = propTypes;
RecruitDefaultFooter.defaultProps = defaultProps;

export default RecruitDefaultFooter;
