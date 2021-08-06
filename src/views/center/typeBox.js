import { Button, Card } from "antd";
export default (props) => {
  console.log(props);
  const typeList = props.user.type.split(",");
  const Box = (props) => {
    return (
      <div className="type_item row-space-between">
        <div>{props.label}</div>
        <div>123</div>
        <Button type="text" danger>
          删除
        </Button>
      </div>
    );
  };
  return (
    <Card title="专栏管理" bordered={false} style={{ width: "100%" }} bodyStyle={{ padding: '0px' }} headStyle={{fontWeight:600,background:'rgb(251 251 251)'}}>
      <div className="type_box">
        {typeList.map((v) => (
          <Box label={v} key={v} />
        ))}
      </div>
    </Card>
  );
};
