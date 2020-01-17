import React, { Component } from 'react'
import { Table } from 'reactstrap';
import UsersDataService from '../../../service/UsersDataService'
export class ListUserDetails extends Component {
    constructor(props) {
        super(props)
        this.state={
            users: [],
            message: null
        }
        this.refreshUsers = this.refreshUsers.bind(this)
        this.deleteUserClicked = this.deleteUserClicked.bind(this)
        this.updateUserClicked = this.updateUserClicked.bind(this)
        this.addUserClicked = this.addCourseClicked.bind(this)
    }

        componentDidMount(){
            this.refreshUsers();
        }
        refreshUsers(){
            UsersDataService.getAllUser()
            .then(
                response => {
                    console.log(response)
                    this.setState({users:response.data})
                }
            )
        }

        deleteUserClicked(id) {
            UsersDataService.deleteUser(id)
                .then(
                    response => {
                        this.setState({ message: `Delete of course ${id} Successful` })
                        this.refreshUsers()
                    }
                )
        }

        updateUserClicked(id) {
            console.log('update ' + id)
            this.props.history.push(`/users/${id}`)
        }

        addCourseClicked() {
            const { history } = this.props;
                 history.push(`/users/-1`)
        }
       
    render() {
        return (
            <div >
                <Table responsive onCheck={value => console.log(value)} fluid>
                  <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                {/* <th>User Name</th> */}
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(
                                user => 
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.type}</td>
                                {/* <td>{user.userName}</td> */}
                                <td><button className="btn btn-warning" onClick={() => this.deleteUserClicked(user.id)}>Delete</button></td>
                                <td><button className="btn btn-success" onClick={() => this.updateUserClicked(user.id)}>Update</button></td>
                                
                            </tr>
                            )
                        }
                        </tbody>
                </Table>
                <div className="row">
                        <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
                    </div>
            </div>
        )
    }
}

export default ListUserDetails
