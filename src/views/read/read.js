import React from "react";
import MarkdownIt from "markdown-it";
import "./read.less";
import { connect } from "react-redux";
import { fileServer } from "../../config/common/constant";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-light.css";
import { RollbackOutlined, FormOutlined } from "@ant-design/icons";
const mdParser = new MarkdownIt();

class Read extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      readOnly: true,
    };
    // 初始化
    this.init = async () => {
      const url = fileServer + "/file/md/" + this.props.article.uid + ".md";
      let d = await axios.get(url);
      // 高亮代码部分
      this.setState({ content: d.data }, () => {
        const codeDom = document
          .getElementById("contentBox")
          .querySelectorAll("code");
        if (!codeDom) return;
        codeDom.forEach((el) => {
          hljs.highlightElement(el);
        });
      });
    };
    // 返回
    this.back = () => {
      this.props.history.push("./article");
    };
    // 编辑
    this.edit = ()=>{
        this.props.setArticle({...this.props.article})
        props.history.push('./write')
    }
  }
  componentDidMount() {
    this.init();
  }
  render() {
    //  const ContentDom = ()=>{__html:  mdParser.render(this.state.content)}
    return (
      <div className="read_wrapper   content">
        {/* <div className='left_banner'></div> */}
        <div className="main_content">
          <div className="title_row">{this.props.article.title}</div>
          {/* dangerouslySetInnerHTML={{__html: mdParser.render(this.state.content)}} */}
          <div className="content_box" id="contentBox">
            <div
              className="custom-html-style"
              dangerouslySetInnerHTML={{
                __html: mdParser.render(this.state.content + ""),
              }}
            ></div>
          </div>
          <div className="operate_banner column-start">
            <div className="item row-center" onClick={this.edit}>
              <FormOutlined></FormOutlined>
            </div>
            <div className="item row-center" onClick={this.back}>
              <RollbackOutlined></RollbackOutlined>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    article: state.global.currentArticle,
  };
};
const mapDispatchToProps  = (dispatch, ownProps) => {
    return  {
        setArticle :(v)=>dispatch({type:'SET_ARTICLE',value:v})
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Read);
