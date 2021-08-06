import { Descriptions } from "antd";
import SvgIcon from '../../component/common/svgIcon.js';
export default (props)=>{
    const user = props.user
    return <Descriptions title="用户信息" column={1} labelStyle={{fontWeight:500,width:'70px'}} contentStyle={{color:'#777777',marginBottom:'10px'}} >
    <Descriptions.Item label="用户名">{user.name}</Descriptions.Item>
    <Descriptions.Item label="账号">{user.account}</Descriptions.Item>
    <Descriptions.Item label="性别"><SvgIcon icon={user.sex}  size={20}/></Descriptions.Item>
    <Descriptions.Item label="学校">{user.school}</Descriptions.Item>
    <Descriptions.Item label="专业">{user.major}</Descriptions.Item>
    <Descriptions.Item label="公司">{user.company}</Descriptions.Item>
    <Descriptions.Item label="职位">{user.position}</Descriptions.Item>
    <Descriptions.Item label="行业">{user.industry}</Descriptions.Item>
    <Descriptions.Item label="个人简介">{user.introduction}</Descriptions.Item>
  </Descriptions>

}