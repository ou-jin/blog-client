import React from 'react';
import './article.less'
import { EditTwoTone } from '@ant-design/icons';
import ArticleBox from './articleBox';
import api from '../../config/api';
import { connect } from 'react-redux';
import axios from 'axios'
let blogType= ''
 class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogType:'',
            articleList : []
        }
        this.getArticleList = async ()=>{
            let d = await api.articleGetList({params:{type:blogType}})
            if(!d)return
            this.setState({articleList:d.data.length?d.data.map(v=><ArticleBox click={this.articleClick} obj={v} key={v.title} updatList={this.getArticleList} edit={this.edit}></ArticleBox>):[]})
        }
        this.edit = (article,e)=>{
            e.stopPropagation()
            // 全局保存当前博客记录
            this.props.setArticle(article)
            props.history.push('./write')
        }
        this.writeNew = (e)=>{
            this.props.setArticle({})
            props.history.push('./write')
        }
        this.articleClick =async (article)=>{
            // 更新阅读次数
            const params = {...article}
            params.readCount++
            await api.articleSet({data:params})
            this.props.setArticle(params)
            props.history.push('./read')
        }
      
    }
    writeNewArticle(){
        console.log('writeNewArticle',this.props)
        this.props.history.push('./read')
    }
    componentDidMount(){
        blogType = this.props.blogType
        this.getArticleList(this.props.blogType)
    }
    componentWillReceiveProps(newProps){
        blogType = newProps.blogType
        this.getArticleList(newProps.blogType)
    }
 
    render() {
        return (
            <div className='content article_wrapper'>
                <div className='top_row row-flex-end '>
                    <EditTwoTone style={{ fontSize: '18px',cursor:'pointer'}} onClick={this.writeNew} />
                </div>
                <div className='bottom_wrapper'>
                    {this.state.articleList}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogType: state.global.currentBlogType
    }
  }
// const mapDispatchToProps = (dispatch)=>{setArticle:(v)=>dispatch({type:'SET_ARTICLE',value:v}) }

const mapDispatchToProps  = (dispatch, ownProps) => {
    return  {
        setArticle :(v)=>dispatch({type:'SET_ARTICLE',value:v})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Article)