import React, { Component } from 'react'
// import navigation from './_nav';
import UsersDataService from '../../velankani-coding-challenge/src/service/UsersDataService'
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
            console.log("(NavConfig:)=>",this.props);
            console.log("(11)=>"+this.state.permissionList);
            const itemnav = this.props.items.filter((item) =>   {
            //  if(this.state.permissionList.includes(item.name)){
            //    if(item.url === ''){
            //    item.url=`${item.name}/${this.props.userName}`
               return this.state.permissionList.includes(item.actual_name);
              //  }
               
           //return this.state.permissionList.includes(item.name);
              //}
          });
  console.log("Component based on User Permission",itemnav);
  // const items = itemnav.map((item) => {
  // return item.url = `${item.url}/${this.props.userName}`
  // });
  // console.log("Component based on User ",items);
  return(
        <div>
        <NavItems items={itemnav}/>
        </div>
      )
  
  }

}

export default NavConfig















