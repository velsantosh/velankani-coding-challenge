import React, { Component } from 'react'

export class AssignPermissions extends Component {
    constructor(props) {
        super(props)
        this.state={
            permissionList: this.props.permission,
            qidList:[],
            message: null,
            isChecked: true
        }
    }

    componentDidMount() {
      this.setState({
        isChecked: this.props.defaultChecked
     });
    }

    handleChange = (event) =>
    {
        //let selectedValue = event.target.value;
        let value = event.target.checked;
        let permId = event.target.value;
        console.log("valueONChange", value);
        console.log("valueONChange", permId);
        this.setState({
          isChecked: !this.state.isChecked,
        },()=> {
                  if(value){
                  //qids.push(question.id,question.id);
                    this.props.onSelectChange(permId);
                  }
                  else{
                     this.props.onDeselect(permId);
                  }
              } );
            }

    render() {
       
        const permission = this.props.permission;
       
   
    return (
                
                    <tr key={permission.ids}>
                      <td><input type="checkbox" onClick={this.handleChange} checked={this.state.isChecked} value={permission.ids}/></td>
                      <td className="headingPrimary">{permission.permissions}</td>
                      <td>{permission.description}</td>
                    </tr>
    )
  }
}

export default AssignPermissions
