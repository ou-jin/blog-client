import React from "react";
import "./write.less";
import { Input, Button, message, Modal } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import axios from "axios";
import { getArticleByUid ,uuid} from "../../config/common/fcn";
import { connect } from "react-redux";
const mdParser = new MarkdownIt();
const uploadUrl = process.env.UPLOAD_ADRESS;
const port = "8010";
import SubmitBox from "./submitBox";
import "highlight.js/styles/github.css";
import api from "../../config/api";
class Write extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      submitVisible: false,
    };
    // 是否是编辑状态
    this.isEdit = false,
    // 提交框组件
    this.submitBoxRef =  React.createRef();
    // 打开提交框
    this.openSubmitBox = () => {
      this.setState({ submitVisible: true });
    };
    // 提交
    this.submit =async ()=>{
        const {selected, category, submitType} = this.submitBoxRef.current.state;
        const {title,text} = this.state;
        const uid = this.isEdit?article.uid: uuid();
        // 提交md文件
        const file = new File([text],(uid+'.md'))
        const fileFrom = new FormData()
        fileFrom.append("file", file);
        fileFrom.append("path", '/md');
        const d = await axios.post(uploadUrl  + "/upload", fileFrom);
        if (d.data.code != 200) return;
        const resParams = {
          submitType:submitType,
          category:category,
          type:selected.length?selected:['未分类'],
          title:title,
          uid:uid,
          isEdit:this.isEdit
        }
        let res = await api.articleAdd({data:resParams})
        if(!res)return
        message.success('发布成功')
        this.setState({submitVisible:false})
        // 更新文章类别
        props.setUser({type:res.data.type})

    }
    // 如果全局state中存储得有当前文章，则进行编辑
    this.init = async () => {
      if (!props.article || !props.article.uid) return;
      // 打开编辑模式
      this.isEdit = true;
      let d = await getArticleByUid(props.article.uid);
      if (!d) return;
      this.setState({ title: props.article.title });
      this.setState({ text: d });
    };
  }
  componentDidMount() {
    this.init();
  }
  // 上传图片
  async handleImgUpload(file, callback) {
    const uploadPath = "/img";
    let form = new FormData();
    form.append("file", file);
    form.append("path", uploadPath);
    const d = await axios.post(uploadUrl + ":" + port + "/upload", form);
    if (d.data != 200) return;
    callback(uploadUrl + "/file" + uploadPath + "/" + file.name);
  }
  render() {
    return (
      <div className="content write_wrapper">
        <div className="top_row row-flex-start">
          <Input
            bordered={false}
            placeholder="文章标题"
            maxLength={100}
            value={this.state.title}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
          ></Input>
          <Button type="primary" onClick={this.openSubmitBox}>
            发布文章
          </Button>
        </div>
        <div className="bottom_wrapper">
          <MdEditor
            style={{ height: "100%" }}
            onChange={({ html, text }) => {
              this.setState({ text, text });
            }}
            value={this.state.text}
            renderHTML={(text) => mdParser.render(text)}
            onImageUpload={this.handleImgUpload}
          />
        </div>
        <Modal
          visible={this.state.submitVisible}
          onCancel={() => {
            this.setState({ submitVisible: false });
          }}
          onOk={this.submit}
          width={700}
          getContainer={false}
          okText="确认"
          cancelText="取消"
        >
          <SubmitBox ref={this.submitBoxRef} /> 
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentBlodType: state.global.currentBlodType,
    article: state.global.currentArticle,
  };
};
const mapDispatchToProps  = (dispatch) => {
  return  {
     setUser :(v)=>dispatch({type:'SET_USER',value:v})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Write);
