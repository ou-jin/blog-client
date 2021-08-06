import {  Form  ,Input ,Radio,Button } from "antd";
const { TextArea } = Input;

export default (props)=>{
    const user = props.user
    return <Form name="userEdit"   onFinish={props.editSubmit} labelCol={{ span: 5 }} initialValues={user}>
    <Form.Item label="用户名" name="name"  ><Input bordered={false} /></Form.Item>
    <Form.Item label="账号" name="account"  ><Input bordered={false} disabled /></Form.Item>
    <Form.Item label="性别" name="sex">
    <Radio.Group>
        <Radio value='male'>男</Radio>
        <Radio value='female'>女</Radio>
    </Radio.Group></Form.Item>
    <Form.Item label="学校" name="school"  ><Input  bordered={false}/></Form.Item>
    <Form.Item label="专业" name="major"  ><Input bordered={false}/></Form.Item>
    <Form.Item label="公司" name="company"  ><Input bordered={false} /></Form.Item>
    <Form.Item label="职位" name="position"  ><Input bordered={false}/></Form.Item>
    <Form.Item label="行业" name="industry"  ><Input bordered={false}/></Form.Item>
    <Form.Item label="个人简介" name="introduction"  ><TextArea  bordered={false}/></Form.Item>
    <Form.Item> <Button block type="primary" htmlType="submit">提交</Button></Form.Item>
</Form>
}