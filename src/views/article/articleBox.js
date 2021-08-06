import React from "react";
import { Tag,Button ,message,Popconfirm} from 'antd';
import { tagColors } from "../../config/common/constant";
import { LikeTwoTone ,EyeTwoTone} from '@ant-design/icons';
import api from "../../config/api";
import {fileServer,filePort} from '../../config/common/constant'
import axios from "axios";
const uploadUrl = process.env.UPLOAD_ADRESS;
export default class ArticleBox extends React.Component{
    constructor(props){
        super(props)
        this.updata = async (params)=>{
            let d = await api.articleSet({data:params})
        }
        this.delete = async (e)=>{
            e.stopPropagation()
            const {uid} = this.props.obj
            // 前往文件服务器 删除文件 
            let res = await axios.get(uploadUrl + "/deletFile",{params:{fileName:uid+'.md',filePath:'/md'}})
            if(!res||res.data.code!=200)return
            // 删除文件记录
            let d = await api.articleDelete({params:{uid:uid}})
            if(!d)return
            message.success(d.msg)
            props.updatList()
        }
    
    }
    render(){
        let typeList = this.props.obj.type
        if(!Array.isArray(typeList))typeList = typeList.split(',');
        let typeDom = typeList.map((x,i)=><Tag color={tagColors[i%tagColors.length]} key={x}>{x}</Tag>)
        const {category} = this.props.obj
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
                    <LikeTwoTone twoToneColor="#c5c5c5" onClick={this.likeAdd} />:<span className='mr10'>{this.props.obj.likeCount}</span>
                    {category==0&&<Tag color="#f50">原创</Tag>}
                    {category==1&&<Tag color="#87d068">转载</Tag>}
                    {category==2&&<Tag color="#2db7f5">翻译</Tag>}
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