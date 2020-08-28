import React, { Component } from 'react'
// import navigation from './_nav';
import UsersDataService from "../../velankani-coding-challenge/src/service/UsersDataService"
import NavItems from './NavItems';
// import AdminDefaultLayout from './containers/AdminDefaultLayout/AdminDefaultLayout';
import { Redirect } from 'react-router-dom';
import * as router from 'react-router-dom';
import {AppSidebarNav2 as AppSidebarNav} from '@coreui/react';
class NavConfig extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      permissionList:[],
      permissionFlag:false,
      navMenu:this.props.items,
      redirectToLogin :false
    }
     
    //this.handleAddNavitem = this.handleAddNavitem.bind(this)
  }
  
  componentDidMount(){
    
    if (window.performance) {
            console.log("getPermission for user: ",this.props.userName)

      if (performance.navigation.type === 1) {
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
  
  let itemnav=[];
            console.log("(NavConfig:)=>",this.props);
            console.log("(11)=>"+this.state.permissionList);
            if(this.state.permissionList.length !== 0){
             itemnav = this.state.navMenu.filter((item) =>   {
               return this.state.permissionList.includes(item.actual_name);
          });
        }else{
          return null;
        }
  console.log("Component based on User Permission",itemnav);

console.log("State User Permission",this.state.navMenu);
  return(
        <div>
        <NavItems items={itemnav} list={itemnav} permissionList={this.state.permissionList}{...this.props} router={router}/>
        {/* <AppSidebarNav navConfig={itemnav}  router={router} {...this.props}/> */}
        </div>
      )
  
  }

}

export default NavConfig















