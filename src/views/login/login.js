
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined ,SmileOutlined } from '@ant-design/icons';
import api from '../../config/api/index.js'
import { useState,useEffect,useRef } from "react";
import "./login.less"
import { useHistory } from 'react-router';
import SvgIcon from '../../component/common/svgIcon.js';
import { connect, useStore } from 'react-redux'
import {uuid} from '../../config/common/fcn'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm.js';
import Screen from './Screen.js';
function Login(props) {
   const history = useHistory()
   const [user] = useState({
      account:'',
      passWord:''
   });
   const [loginBoxVisible,setLoginBoxVisible] = useState(false)
   const [register,setRegister] = useState({
      account:'',
      name:'',
      passWord:''
   }) 

   const registerForm = useRef()
   // 是否点击登录
   const [loginClick, setLoginClick]  = useState(false);
   // 是否是注册状态
   const [isRegister,setIsRegister] = useState(false);
   // 登录提交
   const login = async (values) => {
      setLoginClick(true)
      let d = await api.login({data:values})
      setLoginClick(false)
      if(!d)return
      // 缓存用户信息
      props.setStoreUser(d.data)
      // 缓存用户文章类别信息
      props.setType(d.data.t)
      // 跳转主页
      history.push('/main/center')
   };
   // 注册提交
   const registerSub = async (val)=>{
      const params = {...val}
      let d = await api.regist({data:params})
      if(!d)return
      message.success(d.msg)
      setIsRegister(false)
      // registerForm.current.resetFields();
   }
   // 游客登录
   const visitorLogin =async ()=>{
      let d = await api.visitorLogin()
      if(!d)return
      props.setStoreUser(d.data)
      history.push('/main/center')
   }
   useEffect(()=>{
      console.log(props)
   },[])
   //  气球dom
   const Balloon = [1,2,3,4,5,6].map(x=><SvgIcon icon={'balloon'+x} size={100} key={x} className={'rise'+x+' '+'balloon'+x }  />)

   return (
      <div className='content login_wrapper row-flex-start '>
         {/* <Screen showLoginBox={()=>{setLoginBoxVisible(true)}} /> */}
         <div className={'login_box'+' '+(loginBoxVisible&&'opacity_show')} >
            {loginBoxVisible&& <LoginForm user={user}  login={(v)=>(login(v))} />}
         </div>

         {/* <div className='left_img '>
         <SvgIcon icon='jump' size={200} className='humen_position fall_down' /> 
         {Balloon}

         </div> */}
         <div className='login_box column-center'>
         <SvgIcon icon='hippo' size={45} className={'icon_wrapper'+' '+(loginClick?'rotate':'')}></SvgIcon>
            {!isRegister&&<LoginForm user={user}  login={(v)=>(login(v))} />}
            {isRegister&&<RegisterForm register={register} registerForm={registerForm} registerSub={(v)=>{registerSub(v)}} />}

         <div className='addition_wrapper'> 
            <span className='mr10 font12 cursor info_color mb10' onClick={visitorLogin}>
                {!isRegister&&<span>随便<SvgIcon icon='walk'  size={18}  /> 随便</span>}
                {isRegister&&<span>快速<SvgIcon icon='lightning'  size={18}  />填充</span>}
                 </span>
              <span className='font12 cursor info_color' onClick={()=>{setIsRegister(!isRegister)}}>
                {!isRegister&&<span>立即<SvgIcon icon='smile'  size={18}  /> 注册</span>}
                {isRegister&&<span>返回<SvgIcon icon='back'  size={18}  /> 登录</span>}
            </span>
         </div>
         </div>
      </div>
   );
}
const mapStateToProps = (state) => {
   return {
       user: state.user,
       type: global.artType
   }
 }
 const mapDispatchToProps  = (dispatch, ownProps) => {
   return  {
      setStoreUser :(v)=>dispatch({type:'SET_USER',value:v}),
      setType :(v)=>dispatch({type:'SET_ARTTYPE',value:v}),
   }
 }
 
export default connect(mapStateToProps,mapDispatchToProps)(Login) ;
