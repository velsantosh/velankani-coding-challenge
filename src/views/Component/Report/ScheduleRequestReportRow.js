import React, { Component } from 'react';
import { Jumbotron,Progress, Button ,Table} from 'reactstrap';
export class ScheduleRequestReportRow extends Component {

constructor(props){

super(props);
this.state = {


}

}
    render() {

        return (
            <tr>
                <td color="info">{this.props.cdetail.createdBy}</td>
                <td>{this.props.cdetail.hiringManagerName}</td>
                <td>{this.props.cdetail.recruiterName}</td>
                <td>{this.props.cdetail.candidateName}</td>
                <td>{this.props.cdetail.candidateEmailId}</td>
                <td>{this.props.cdetail.candidateMobileNo}</td>
                <td>{this.props.cdetail.candidateExperience}</td>
                <td>{this.props.cdetail.technology}</td>
                <td>{this.props.cdetail.requestedDate}</td>
            </tr>
        );

    }}