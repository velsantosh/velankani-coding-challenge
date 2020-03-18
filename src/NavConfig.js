import React, { Component } from 'react'
// import navigation from './_nav';
import UsersDataService from '../../velankani-coding-challenge-master/src/service/UsersDataService'
import NavItems from './NavItems';
// import AdminDefaultLayout from './containers/AdminDefaultLayout/AdminDefaultLayout';

class NavConfig extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      permissionList:[],
      permissionFlag:false,
      navMenu:[],
    }
     
    //this.handleAddNavitem = this.handleAddNavitem.bind(this)
  }
  
  componentDidMount(){
    
    console.log("ComponentMount");
    this.getPermission();
  }
  
getPermission(){
   let userName = this.props.userName;
      console.log("@@@@ getPermission: ",userName)
      UsersDataService.getPermission(userName)
            .then(
               response => {
                    console.log("RespData:",response.data)
                    this.setState({permissionList:response.data})
                  }
                )
        }
  
        render() {
            console.log("(NavConfig:)=>",this.props);
            console.log("(11)=>"+this.state.permissionList);
            const itemnav = this.props.items.filter((item) =>   {
              // console.log("(2)=>"+item);
           return this.state.permissionList.includes(item.name);
          });
  console.log("(4)=>",itemnav);
  return(
        <div>
        <NavItems items={itemnav}/>
        </div>
      )
  
  }

}

export default NavConfig















