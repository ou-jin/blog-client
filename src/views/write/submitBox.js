import React from "react";
import "./write.less";
import { Form, Card, Input, Checkbox, Tag ,Radio} from "antd";

import { PlusOutlined,ExclamationCircleOutlined } from "@ant-design/icons";
export default class SubmitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOtion:[],
      selected: [],
      inputVal: "",
      inputVisible: false,
      category: 0,
      submitType:0,
    };
    this.onFinish = (v) => {
      console.log(v);
    };
    this.typeSelect = (checkedValues) => {
      console.log("checked = ", checkedValues);
      const { selected, typeOtion } = this.state;
      this.setState({ selected: [...selected.filter(x=>x&&typeOtion.indexOf(x)==-1), ...checkedValues] })
    };
    this.tagClose = (e) => {
      console.log("tagClosse", e);
    };
    this.confirmInput = () => {
      const { selected, inputVal } = this.state;
      if (selected.indexOf(inputVal) != -1) {
        return;
      }
      this.setState({ selected: [...selected, inputVal] }, () => {
        this.setState({ inputVal: "" });
        this.setState({ inputVisible: false });
      });
    };
  }
  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('user'))
    this.setState({typeOtion:user.type.split(',').slice(1)})
  }
  render() {
    const categoryOption = [
      { label: "原创", value: 0 },
      { label: "转载", value: 1 },
      { label: "翻译", value: 2 },
    ];
    const submitTypeOption = [
        { label: "公开", value: 0 },
        { label: "私密", value: 1 },
        { label: "仅粉丝可见", value: 2 },
      ];
    const TypeDom = this.state.selected.map((v) => (
      <Tag closable key={v} onClose={this.tagClose}>
        {v}
      </Tag>
    ));
    const { inputVisible, inputVal, category ,submitType,typeOtion} = this.state;
    return (
      <div className="submit_box">
        <div className="tip_row">
        <ExclamationCircleOutlined style={{  color: '#e33e33' ,marginRight:'10px'}} />
          请勿发布涉及政治、广告、营销、翻墙、违反国家法律法规等内容
        </div>
        <Form onFinish={this.onFinish} labelCol={{ span: 3 }} >
          <Form.Item label="分类" name="type">
            {TypeDom}
            {inputVisible && (
              <Input
                size="small"
                className="tag-input"
                value={inputVal}
                maxLength={15}
                onChange={(e) => {
                  this.setState({ inputVal: e.target.value });
                }}
                onBlur={this.confirmInput}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={() => {
                  this.setState({ inputVisible: true });
                }}
                className="add_tag"
              >
                <PlusOutlined /> 新增
              </Tag>
            )}

            <Card title="选择已有分类" bordered={false} style={{ width: 550 }}>
              <Checkbox.Group
                options={typeOtion}
                onChange={this.typeSelect}
              />
            </Card>
          </Form.Item>

          <Form.Item label="类型" name="category">
            <Radio.Group
              options={categoryOption}
              onChange={(e) => {this.setState({ category: e.target.value });}}
              value={category}
              defaultValue={category}
            />
          </Form.Item>

          <Form.Item label="发布形式" name="submitType">
            <Radio.Group
            options={submitTypeOption}
              onChange={(e) => {
                this.setState({ submitType: e.target.value });
              }}
              value={submitType}
              defaultValue={submitType}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
