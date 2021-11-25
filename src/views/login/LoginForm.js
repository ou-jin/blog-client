import { Form, Input, Button,  } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
export default (props)=>{
    const user = props.user
    return <Form
    name="normal_login"
    className="login-form"
    autoComplete = "off"
    onFinish={props.login}>
    <Form.Item
       name="account"
       rules={[{ required: true, message: '请填写用户账号!' }]}
    >
       <Input prefix={<UserOutlined className="site-form-item-icon" />} 
             placeholder="用户名" 
             value={user.account}
             />
    </Form.Item>
    <Form.Item
       name="password"
       rules={[{ required: true, message: '请填写密码!' }]}
    >
       <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          value={user.passWord}
          type="password"
          placeholder="密码"
       />
    </Form.Item>
    <Form.Item>
       <Button   ghost htmlType="submit" className="login-form-button">
          登录
       </Button>
    </Form.Item>
 </Form>
}