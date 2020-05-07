import React, { Component } from 'react'

import AdminDefaultLayout from './containers/RecruitDefaultLayout';
export class _navRecruit extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      message:'hello',
       items:[]
            
    }

    //this.handleAddNavitem = this.handleAddNavitem.bind(this)
  }
  

  
  render() {
    const permi = this.props.permission;
    console.log("*********",permi);
    
  const itemnav=  permi.map(value => {
      
       // let itemlist=[];
          let itemlist= {
                          url : "/manage/"+value,
                          name: value,
                          icon:"icon-user"
                        };
          return itemlist;
        
        
        //return null;
    })
      console.log("###############",itemnav);
  
      return(
        <AdminDefaultLayout items={itemnav}/>
      )
  
  }

}

export default _navRecruit