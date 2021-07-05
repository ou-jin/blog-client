
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined ,ExperimentTwoTone } from '@ant-design/icons';
import api from '../../config/api/index.js'
import { useState } from "react";
import "./login.less"
import { useHistory } from 'react-router';
function Login() {
   // const [account, setAccount] = useState('')
   // const [passWord, setPassWord] = useState('')
   const history = useHistory()
   const [user] = useState({
      account:'',
      passWord:''
   })
   const onFinish = async (values) => {
      let d = await api.login({data:values})
      if(!d)return
      localStorage.setItem('user',JSON.stringify(d.data))
      history.push('/main')
   };

   return (
      <div className='content login_wrapper row-flex-start '>
         <div className='left_img '></div>
         <div className='login_box column-center'>
         <ExperimentTwoTone className='icon_wrapper rotate' twoToneColor="#3db389"  />
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
         </div>
      </div>
   );
}

export default Login;
