import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TestResult extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                {this.props.resultData}
            </div>
        );
    }
}



export default TestResult;