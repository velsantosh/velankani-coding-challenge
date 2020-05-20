import React, { Component } from 'react';
import Charts from '../../Charts/Charts';
import { Jumbotron, Button ,Table,CardText,CardTitle,Card,CardHeader} from 'reactstrap';
import { ScheduleRequestReportRow } from './ScheduleRequestReportRow';
import UsersDataService from '../../../service/UsersDataService'
class ScheduleRequestReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
         requests: [],
         message: null,
         flag:false
        }
    
        this.getAllRequests = this.getAllRequests.bind(this);}
    
    
    componentDidMount() {
        this.getAllRequests();
    }
       
    getAllRequests(){
        console.log("making http request");
        UsersDataService.getAllRequests()
          .then(
              response => {
                if(response.data === null){
                  console.log(response)
                  this.setState({requests:response.data})
                  this.setState({flag:true})
              }else{
                console.log(response)
                  this.setState({requests:response.data})
                  console.log(response.data)
                }
            }
          )
      }


    render() {
        const requestsList = this.state.requests;
        console.log("form scheduleRequestReport");
        return (  

            <div className="container-fluid">
                <div >
                <Card body color="info">
            <CardHeader >ScheduleRequestsReport</CardHeader>
      </Card>
                </div>
                <div>
                    <Table striped >
                        <thead>
                            <tr><th>Created By </th> <th>HiringMangerName</th><th>RecruiterName </th><th>CandidateName</th><th>CandidateEmailId</th><th>CandidateMobileNo</th>
                            <th>CandidateExperience</th> <th>Technology</th>
                              <th>RequestedDate</th>
                            </tr>

                        </thead>
                        <tbody>
                            {requestsList.map((cdetail ,index) =>

                                <ScheduleRequestReportRow key={index} cdetail={cdetail} />
                            )}
                        </tbody>
                       
                    </Table>

                </div>

            </div>

        );

    }

}
export default ScheduleRequestReport;