import React from 'react';
import MarkdownIt from 'markdown-it';
import './read.less'
import { connect } from 'react-redux';
import {fileServer} from '../../config/common/constant'
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-light.css'

const mdParser = new MarkdownIt();

 class Read extends React.Component {
      constructor(props){
         super(props)
         this.state = {
             content:'',
             readOnly:true
         }
         this.init = async ()=>{
             const url = fileServer+'/file/md/'+this.props.article.uid+'.md'
             let d = await axios.get(url)
             this.setState({content:d.data},()=>{
                const codeDom = document.getElementById('contentBox').querySelectorAll('code')
                if(!codeDom)return
                codeDom.forEach(el => {
                    hljs.highlightElement(el);
                });
             })
         }
         }
         componentDidMount(){
             this.init()
         }
         render(){
            //  const ContentDom = ()=>{__html:  mdParser.render(this.state.content)}
              return (
               <div className='read_wrapper   content'>
                   {/* <div className='left_banner'></div> */}
                   <div className='main_content'>
                       <div className='title_row'>{this.props.article.title}</div>
                       {/* dangerouslySetInnerHTML={{__html: mdParser.render(this.state.content)}} */}
                       <div className='content_box' id='contentBox'  >
                         <div className='custom-html-style' dangerouslySetInnerHTML={{__html: mdParser.render(this.state.content+'')}}></div>
                       </div>
                   </div>
                   {/* <div className='right_banner'></div> */}

               </div>
            )
     }
   }
   const mapStateToProps = (state)=>{
       return {
           article:state.global.currentArticle
       }
   }
 
   export default connect(mapStateToProps,null)(Read)
