import React, { Component } from 'react'
import {AppSidebarNav2 as AppSidebarNav} from '@coreui/react';
import * as router from 'react-router-dom';
export class NavItems extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             nav:{history:this.props.history,
                    location:this.props.location,
                match:this.props.match,
            router:this.props.router,
            items:this.props.list},
             redirect:true
        }
    }
    stateMethod(e){
console.log("logging Nav",e);
// this.setState({...this.state.nav, items: e, redirect:false},()=>console.log("NavItems based on User Permission",this.state.nav.items));
 
}
    render() {
        console.log("THis Props",this.props);
        console.log("Navssss Props",this.state.nav);
       let itemnav = this.props.items.filter((item) =>   {
            return this.props.permissionList.includes(item.actual_name);
       });
       let n=this.state.nav.items.filter((item) =>   {
        return this.props.permissionList.includes(item.actual_name);
   });
   console.log("logging Navvvvvv",n);
if(this.state.redirect){
    this.stateMethod(n);
}
//    this.setState(prevState => {
//     let nav = Object.assign({}, prevState.nav);  // creating copy of state variable jasper
//     nav.items = n;                     // update the name property, assign a new value                 
//     return { nav };                                 // return new object jasper object
//   },()=> console.log("NavItems based on User Permission",this.state.nav.items))
    //    console.log("NavItems based on User Permission",this.state.nav.items);
        return (
            
            <div>
            <AppSidebarNav navConfig={this.state.nav}  router={router} {...this.props}/>
            </div>
        )
    }
}

export default NavItems
