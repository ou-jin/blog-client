import React from "react";
import "./center.less";
import {EditOutlined} from '@ant-design/icons';
import UserDesc from "./userDesc";
import UserForm from "./userForm";
import UserGeneral from './userGeneral'
import TypeBox from "./typeBox";
import StatisticsBox from './statisticsBox'
import api from "../../config/api";

export default class Center extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user:{sex:'',type:''},
        isEdit:false
    }
    this.editSubmit = async (v)=>{
        const newUser = {...this.state.user,...v}
        const d = await api.userSet({data:newUser})
        if(!d)return
        localStorage.setItem('user',JSON.stringify(newUser))
        this.setState({user:newUser})
        this.setState({isEdit:false})
    }
  }
  componentDidMount(){
      this.setState({user:JSON.parse(localStorage.getItem('user'))})
  }
  render() {
    const {user,isEdit} = this.state
    return (
      <div className="center_wrapper row-start-start">
        <div className="left_box">
            <UserGeneral user={user}/>
            <StatisticsBox user={user}/>
            <TypeBox user={user} /> 
        </div>
        <div className="user_box">
        <EditOutlined className='user_edit' onClick={()=>{this.setState({isEdit:!isEdit})}} />
        {isEdit?<UserForm user={user} editSubmit={this.editSubmit}/> :<UserDesc user={user}/>}
        </div>
      </div>
    );
  }
}
