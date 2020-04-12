import React, { Component } from 'react';
import ObjectiveQuestion from '../ObjtiveQuestion/ObjectiveQuestion';

class ObjectiveQuestionStep extends Component {
    constructor(props) {
        super(props);
        console.log("ObjectiveQuestionStep : ", this.props);
    }

    render() {
        return (
            <div className="animated fadeIn">
                <ObjectiveQuestion result={this.props.result} handleOptionSelection={this.props.handleOptionSelection}
                    prevstep={this.props.prevstep} nextstep={this.props.nextstep}
                    answerOptions={this.props.answerOptions} count={this.props.count}
                    content={this.props.content} id={this.props.indentid} />
            </div>
        );
    }
}

export default ObjectiveQuestionStep;