import React, { Component } from 'react';
import { Jumbotron,Progress, Button,Tooltip ,Table} from 'reactstrap';
import UsersDataService from '../../../service/UsersDataService'
import { saveAs } from 'file-saver'
export class CandidateReportRow extends Component {
constructor(props){
super(props);
   
this.state = {
tooltipOpen:false,
}
this.toggle = this.toggle.bind(this);
this.download=this.download.bind(this);

}

toggle (){
    this.setState({tooltipOpen:!this.state.tooltipOpen});
    
}
  
download(id,userName){
        console.log("download button is clicked");
         console.log(id);
        UsersDataService.download(id)
          .then(
              response => {
                if(response.data === null){
                  console.log("no data from server")
                  //this.setState({candidates:response.data})
                  //this.setState({flag:true})
              }else{
                console.log(response.data);
                console.log(response);
               var str=userName+".pdf";
                console.log("data from server");
                var blob = new Blob([response.data], {type: "text/plain;charset=utf-8"});
                saveAs(blob, str);
                //const url = window.URL.createObjectURL(new Blob([response.data]));
                //const link = document.createElement('a');
                //link.href = url;
                //link.setAttribute('downloads', 'candidate.pdf');
                //document.body.appendChild(link);
                //link.click();
                }
            }
          )
              

     }
 render() {

        return (
            <tr>
                <td><input type="checkbox" /></td>
                <td color="info">{this.props.cdetail.candidateName}</td>
                <td><Progress animated value={this.props.cdetail.testCasePercentage} color="success"/>{this.props.cdetail.testCasePercentage}%</td>
                <td>{this.props.cdetail.status}</td>
                <td><span><Button color="primary" size="sm" id="ranjeet" onClick={ ()=> this.download(this.props.cdetail.id,this.props.cdetail.candidateName)
                }> View Report </Button>
                <Tooltip
        placement="right"
        isOpen={this.state.tooltipOpen}
        target="ranjeet"
        
        toggle={this.toggle}>{this.props.cdetail.testcaseReport}
      </Tooltip></span></td>
                <td color="success">{this.props.cdetail.testScheduler}</td>
               <td><Button color="success"onClick={ ()=> this.props.toggle2(this.props.cdetail.id)} size="sm" id="popover" >Forword </Button></td>
            </tr>
        );



    }


}