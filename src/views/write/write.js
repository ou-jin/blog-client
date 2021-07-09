import React from 'react';
import './write.less'
import { Input ,Button} from 'antd';
import api from '../../config/api/index.js'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
// Finish!
function handleEditorChange({ html, text }) {
  }
console.log(api)
export default class Write extends React.Component {
    constructor(props){
        super(props)
    }
    handleImgUpload(file, callback){
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload = function(event) {
            // 文件里的文本会在这里被打印出来
            console.log('onload')
            console.log(event.target.result)
            api.uploadImg()
          };
       
        // callback('http://106.55.160.96/file/img/filmReport.png')
    }
    render(){
        return (
            <div className='content write_wrapper'>
                <div className='top_row row-flex-start'>
                    <Input bordered={false} placeholder="文章标题" maxLength={100}></Input>
                    <Button type='primary'>发布文章</Button>
                </div>
                <div className='bottom_wrapper'>
                <MdEditor style={{ height:'100%' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} onImageUpload={this.handleImgUpload} />
                </div>
            </div>
        )
    }
}