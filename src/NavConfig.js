import React, { Component } from 'react'
// import navigation from './_nav';
import UsersDataService from '../../velankani-coding-challenge/src/service/UsersDataService'
import NavItems from './NavItems';
// import AdminDefaultLayout from './containers/AdminDefaultLayout/AdminDefaultLayout';
import { Redirect } from 'react-router-dom';

class NavConfig extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      permissionList:[],
      permissionFlag:false,
      navMenu:[],
      redirectToLogin :false
    }
     
    //this.handleAddNavitem = this.handleAddNavitem.bind(this)
  }
  
  componentDidMount(){
    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.setState({
          redirectToLogin :true
        })  
    }

    else{
      this.getPermission();
    }
  }
   
  }

  
getPermission(){
   let userName = this.props.userName;
      console.log("getPermission for user: ",userName)
      UsersDataService.getPermission(userName)
            .then(
               response => {
                    console.log("RespData:",response.data)
                    this.setState({permissionList:response.data})
                  }
                )
        }
  
   render() {
    if (this.state.redirectToLogin === true) {
      return (<Redirect to="/" />);
  }
            console.log("(NavConfig:)=>",this.props);
            console.log("(11)=>"+this.state.permissionList);
            const itemnav = this.props.items.filter((item) =>   {
               return this.state.permissionList.includes(item.actual_name);
          });
  console.log("Component based on User Permission",itemnav);

  return(
        <div>
        <NavItems items={itemnav}/>
        </div>
      )
  
  }

}

export default NavConfig















