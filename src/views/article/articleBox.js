import React from "react";
import { Tag,Button ,message,Popconfirm} from 'antd';
import { tagColors } from "../../config/common/constant";
import { LikeTwoTone ,EyeTwoTone} from '@ant-design/icons';
import api from "../../config/api";
export default class ArticleBox extends React.Component{
    constructor(props){
        super(props)
        this.updata = async (params)=>{
            let d = await api.articleSet({data:params})
        }
        this.delete = async (e)=>{
            e.stopPropagation()
            let d = await api.articleDelete({params:{id:this.props.obj.id}})
            if(!d)return
            message.success(d.msg)
            props.updatList()
        }
    
    }
    render(){
        let typeList = this.props.obj.type
        if(!Array.isArray(typeList))typeList = typeList.split(',');
        let typeDom = typeList.map((x,i)=><Tag color={tagColors[i%tagColors.length]} key={x}>{x}</Tag>)
        return (
                <div className='article_box' onClick={()=>{this.props.click(this.props.obj)}}>
                    <div className='row row-space-between'>
                        <span className='title'>{this.props.obj.title}</span>
                        <p className='info_color'>{this.props.obj.update_time?this.props.obj.update_time:this.props.obj.create_time}</p>
                    </div>
                    <div className='row'>
                       {typeDom}
                    </div>
                    <div className='row row-space-between'> 
                    <span className='info_color'>
                    <EyeTwoTone  twoToneColor="#c5c5c5" />:<span className='mr10'>{this.props.obj.readCount}</span>
                    <LikeTwoTone twoToneColor="#c5c5c5" onClick={this.likeAdd} />:{this.props.obj.likeCount}
                    </span>
                    <span>
                        <Button type="text" onClick={(e)=>{this.props.edit(this.props.obj,e)}}>编辑</Button>
                        <Popconfirm
                            title="此操作将永久删除数据,请确认"
                            onConfirm={this.delete}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type="text" onClick={(e)=>{e.stopPropagation()}}>删除</Button>
                        </Popconfirm>
                    </span>
              
                    </div>
                </div>
        )
    }
}