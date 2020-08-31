import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button, Badge } from 'reactstrap';
import UsersDataService from '../../service/UsersDataService'
// import usersData from './UsersData'
import classes from "./Users.module.css";
import cx from "classnames";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Parser from 'html-react-parser';
//import Counter from '../../AssignQuestions/QuestionTypeSelection/Counter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { connect } from "react-redux";
import * as actionTypes from "../../store/Actions";


function UserRow(props) {
  const user = props.user
  const userLink = `/manageUser/user/${user.id}`
  const userLink1 = `/manageUser/user/${user.userId}`

  const getBadge = (status) => {
    return status === 'ADMIN' ? 'success' :
      status === 'RECRUITMENT' ? 'primary' :
        status === 'CANDIDATE' ? 'secondary' :
          status === 'INTERVIEWER' ? 'warning'
            : 'danger'
  }

  return (
    <tr key={user.id}>
      {/* <th scope="row"><Link to={userLink1}>{user.id}</Link></th> */}
      <td scope="row"><Link to={userLink1}>{user.name}</Link></td>
      <td>{user.userId}</td>
      <td>{user.experience}</td>
      {/* <td>{user.role_id}</td> */}
      <td><Badge color={getBadge(user.roleId)}>{user.roleId}</Badge></td>
    </tr>
  )
}

class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      message: null
    }
    this.refreshCourses = this.refreshCourses.bind(this)
  }

  componentDidMount() {
    this.refreshCourses();
  }
  refreshCourses() {
    UsersDataService.getAllUser()
      .then(
        response => {
          console.log("***************", response.data)
          this.setState({ users: response.data })
        }
      )
  }

  titleFormatter = (cell, row) => {
    let editUserLink = `/manageUser/user/${row.userId}`;
    console.log("editUserLink ####", editUserLink);
    return (<Link to={editUserLink}>{row.name}</Link>);
  }



  roleFormatter = (cellContent, row) => {
    if (row.roleId === "ADMIN") {
      return (
        <span className="badge badge-success"> {row.roleId}</span>
      );
    }
    if (row.roleId === 'RECRUITMENT') {
      return (
        <span className="badge badge-primary"> {row.roleId}</span>
      );
    }
    if (row.roleId === 'CANDIDATE') {
      return (
        <span className="badge badge-secondary"> {row.roleId}</span>
      );
    }
    if (row.roleId === 'INTERVIEWER') {
      return (
        <span className="badge badge-warning"> {row.roleId}</span>
      );
    }
    return (
      <span className="badge badge-danger"> {row.roleId}</span>
    );
  }

  render() {

    //define columns for table
    let columns = [{
      dataField: 'name',
      text: 'Name',
      sort: true,
      headerStyle: { color: '#47bff7' },
      formatter: this.titleFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          this.props.editSelectedUser(row);
        }
      }

    },
    {
      dataField: 'userId',
      text: 'UserName',
      sort: true,
      headerStyle: { color: '#47bff7' }

    },
    {
      dataField: 'experience',
      text: 'Experience',
      sort: true,
      headerStyle: { color: '#47bff7' }
    },
    {
      dataField: 'roleId',
      text: 'Role',
      sort: true,
      headerStyle: { color: '#47bff7' },
      //formatter: this.roleFormatter,
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

    function onColumnMatch({ searchText, value, column, row }) {
      if (searchText == row.name || searchText == row.userName || searchText == row.role) {
        return true;
      }

    }

    return (
      <div className="animated fadeIn">
        <Row xs={2} md={4} lg={6}>
          <Col md={{ span: 6, offset: 11 }}>
            <Link to="/manageUser/createUser">
              <Button className="btn btn-primary mb-1" className={cx(classes.createBtn)}>Add User</Button>
            </Link>
          </Col>
        </Row>

        <Row xs="12" className="justify-content-center">
          <Col xl={12}>
            {this.state.users.length > 0
              &&
              <>
                <ToolkitProvider
                  keyField="id"
                  data={this.state.users}
                  columns={columns}
                  search={onColumnMatch}
                >
                  {
                    props => (
                      <div>
                        <SearchBar {...props.searchProps} />

                        <BootstrapTable
                          bootstrap4
                          striped
                          hover
                          keyField='id'
                          data={this.state.users}
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


const mapDispatchToProps = dispatch => {
  return {
    editSelectedUser: editUserData =>
      dispatch({ type: actionTypes.EDITUSERDATA, value: editUserData })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Users);
