import { Form, Input, Button,  } from 'antd';
import { UserOutlined, LockOutlined,SmileOutlined   } from '@ant-design/icons';
export default (props)=>{
    const register = props.register
    return <Form
    name="normal_login"
    className="login-form"
    onFinish={props.registerSub}
    ref={props.registerForm}
 >
    <Form.Item name="account" rules={[{ required: true, message: '请填写用户账号' }]} >
       <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" value={register.account}/>
    </Form.Item>
    <Form.Item name="name" rules={[{ required: true, message: '请填写用户用户名' }]} >
       <Input prefix={<SmileOutlined  className="site-form-item-icon" />} placeholder="用户名" value={register.name}/>
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: '请填写密码' }]}>
       <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          value={register.passWord}
          type="password"
          placeholder="密码"
       />
    </Form.Item>
    <Form.Item>
       <Button   htmlType="submit" className="login-form-button" >
          注册
       </Button>
    </Form.Item>
 </Form>
}