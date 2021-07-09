import React from "react";
import { Tag,Button } from 'antd';
import { tagColors } from "../../config/common/constant";
import { LikeTwoTone ,EyeTwoTone} from '@ant-design/icons';
export default class ArticleBox extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let typeDom = []
        if(this.props.obj.type.length)typeDom = this.props.obj.type.map((x,i)=><Tag color={tagColors[i%tagColors.length]} key={x}>{x}</Tag>)
        
        const LikeDom = function(props){
            return (
            <span><LikeTwoTone twoToneColor="#fff" /> {props.count}</span>
        )
    }
        return (
                <div className='article_box'>
                    <div className='row row-space-between'>
                        <span className='title'>{this.props.obj.title}</span>
                        <p className='info_color'>2019-05-27 19:06:03</p>
                    </div>
                    <div className='row'>
                       {typeDom}
                    </div>
                    <div className='row row-space-between'> 
                    <span className='info_color'>
                    <EyeTwoTone  twoToneColor="#c5c5c5" />:<span className='mr10'>{this.props.obj.readCount}</span>
                    <LikeTwoTone twoToneColor="#c5c5c5" />:{this.props.obj.likeCount}
                    </span>

                    <span>
                        <Button type="text">编辑</Button>
                        <Button type="text">删除</Button>
                    </span>
              
                    </div>
                </div>
        )
    }
}