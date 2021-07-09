import React from 'react';
import './article.less'
import { EditTwoTone } from '@ant-design/icons';
import ArticleBox from './articleBox';

export default class Article extends React.Component {
    constructor(prop) {
        super(prop)
    }
    render() {
        const articleList = []
        for(let i = 0 ; i < 20 ; i++){
            articleList.push({
                title:'文章'+i,
                readCount:parseInt(Math.random()*100) ,
                type:['react','vue','webpack','算法'],
                likeCount:parseInt(Math.random()*100)
            })
        }
        const articleDom = articleList.map(v=><ArticleBox obj={v} key={v.title}></ArticleBox>)
        return (
            <div className='content article_wrapper'>
                <div className='top_row row-flex-end '>
                    <EditTwoTone style={{ fontSize: '18px',cursor:'pointer'}} />
                </div>
                <div className='bottom_wrapper'>
                    {articleDom}
                </div>

            </div>
        )
    }
}