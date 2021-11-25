import { Button, Card, message } from "antd";
import api from "../../config/api";
import { connect } from 'react-redux'
const TypeBox = (props) => {
  const delUserType =async (type)=>{
    const res = await api.delUserType({params:{type:type}})
    if(!res)return
    message.success(res.msg)
  }
  const Box = (props) => {
    return (
      <div className="type_item row-space-between">
        <div>{props.label}</div>
        <div>123</div>
        <Button type="text" danger onClick={()=>{delUserType(props.label)}} >
          删除
        </Button>
      </div>
    );
  };
  return (
    <Card title="专栏管理" bordered={false} style={{ width: "100%" }} bodyStyle={{ padding: '0px' }} headStyle={{fontWeight:600,background:'rgb(251 251 251)'}}>
      <div className="type_box">
        {props.type.map((v,i) => (
          <Box label={v.name} key={i} />
        ))}
      </div>
    </Card>
  );
};

const mapStateToProps = (state)=>{
  return {
    type : state.global.artType
  }
}

const mapDispatchToProps  = (dispatch) => {
  return  {
     setUser :(v)=>dispatch({type:'SET_USER',value:v})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TypeBox)
