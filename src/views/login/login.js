
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined ,ExperimentTwoTone } from '@ant-design/icons';
import api from '../../config/api/index.js'
import { useState,useEffect } from "react";
import "./login.less"
import { useHistory } from 'react-router';
import SvgIcon from '../../component/common/svgIcon.js';
import { connect } from 'react-redux'
function Login(props) {
   const history = useHistory()
   const [user] = useState({
      account:'',
      passWord:''
   })
   const [loginClick, setLoginClick]  = useState(false)
   const onFinish = async (values) => {
      setLoginClick(true)
      let d = await api.login({data:values})
      setLoginClick(false)
      if(!d)return
      props.setStoreUser(d.data)
      history.push('/main')
   };
   useEffect(()=>{
      console.log(props)
   },[])
   //  气球dom
   const Balloon = [1,2,3,4,5,6].map(x=><SvgIcon icon={'balloon'+x} size={100} key={x} className={'rise'+x+' '+'balloon'+x }  />)
   return (
      <div className='content login_wrapper row-flex-start '>
         <div className='left_img '>
         <SvgIcon icon='jump' size={200} className='humen_position fall_down' /> 
         {Balloon}
         </div>
         <div className='login_box column-center'>
         <SvgIcon icon='hippo' size={45} className={'icon_wrapper'+' '+(loginClick?'rotate':'')}></SvgIcon>
            <Form
               name="normal_login"
               className="login-form"
               initialValues={{ remember: true }}
               onFinish={onFinish}
            >
               <Form.Item
                  name="account"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
               >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="用户名" 
                        value={user.account}
                        />
               </Form.Item>
               <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
               >
                  <Input
                     prefix={<LockOutlined className="site-form-item-icon" />}
                     value={user.passWord}
                     type="password"
                     placeholder="密码"
                  />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                     登录
                  </Button>
               </Form.Item>
            </Form>
         <div> 
            <span className='mr10 p_c underline'>游客登陆</span>
            <span className='p_c underline'>立即注册</span>
         </div>
        
         </div>
      </div>
   );
}
const mapStateToProps = (state) => {
   return {
       user: state.user
   }
 }
 const mapDispatchToProps  = (dispatch, ownProps) => {
   return  {
      setStoreUser :(v)=>dispatch({type:'SET_USER',value:v})
   }
 }
 
export default connect(mapStateToProps,mapDispatchToProps)(Login) ;
