import React, { Component } from 'react'
import { Col, Row } from 'reactstrap';
import ScheduledChallengeDataService from '../../../service/ScheduledChallengeDataService';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';


export class VideoStream extends Component {
  constructor(props) {
    super(props);
    this.state = {    
      candidateList: []
    }
  }

  componentDidMount() {

    ScheduledChallengeDataService.getAllVideoStreamingCandidateData(this.props.userName).then(
      response => {
          console.log("getAllVideoStreamingCandidateData  response.data : ", response.data);
          this.setState({ candidateList: response.data })
      }
  );
  }
  assigneduidFormatter = (cellContent, row) => {
    // this.setState({ challengeId: row.challengeid })
    return (<Link>{row.assigneduid}</Link>)
  }


  render() {

    //define columns for table
    let columns = [
      {
        dataField: 'assigneduid',
        text: 'Candidate Id',
        sort: true,
        headerStyle: { color: '#47bff7' }       
      },
      {
        dataField: 'assigneduid',
        text: 'Candidate Video Stream',
        sort: true,
        headerStyle: { color: '#47bff7' },
        formatter: this.assigneduidFormatter,
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            console.log("row.assigneduid ", row);    
           // this.props.history.push(`/testVideoStream/${row.assigneduid}`); 
            const url = `https://10.0.250.140:3000/#/testVideoStream/${row.assigneduid}`;
            window.open(url, '_blank');

          }      
        }
      },           
      {
        dataField: 'status',
        text: 'Challeng Status',
        sort: true,
        headerStyle: { color: '#47bff7' }
      }     
    ]


    const options = {
      page: 1,  // page that shows as default
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      },
      {
        text: '15', value: 15
      },
      {
        text: '20', value: 20
      }
      ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last',
      paginationShowsTotal: true,  // Accept bool or function
      paginationPosition: 'bottom'  // default is bottom, top and both is all available
    };
    const { SearchBar } = Search;

    return (

      <div>
        <Row xs="12" className="justify-content-center">
          <Col xl={12}>
            {this.state.candidateList.length > 0
              &&
              <>
                <ToolkitProvider
                  keyField="id"
                  data={this.state.candidateList}
                  columns={columns}
                >
                  {
                    props => (
                      <div>
                        <h3>Video stream running candidate list</h3>
                        <SearchBar {...props.searchProps} />
                        <BootstrapTable
                          bootstrap4
                          striped
                          hover
                          keyField='id'
                          data={this.state.candidateList}
                          columns={columns}
                          pagination={paginationFactory(options)}
                          {...props.baseProps}
                          bordered={false} />
                      </div>
                    )
                  }
                </ToolkitProvider>
              </>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userName
  };
};

export default connect(mapStateToProps)(VideoStream)
