import React from 'react';
import {
    Route
} from "react-router-dom";
import { useEffect } from "react";
import { Layout } from 'antd';
import Head from "./head"
const { Header, Sider, Content } = Layout;
import SideMeau from "./sideMeau";
import "./main.less"
import Article from '../article/article.js'
import Write from '../write/write';
import Index from '../index/index'
import Read from '../read/read';
import Center from '../center/center'
import { connect } from 'react-redux'
import api from '../../config/api/index.js'
 function Main(props) {
    const login = async (values) => {
        if(localStorage.getItem('user'))return
        let d = await api.login({data:values})
        if(!d)return
        // 缓存用户信息
        props.setStoreUser(d.data)
        // 缓存用户文章类别信息
        props.setType(d.data.t)
        // 跳转主页
     };
     useEffect(()=>{
        login()
     },[])
    return <Layout  >
        <Sider theme='light'><SideMeau /></Sider>
        <Layout>
            <Header>
                <Head/>
            </Header>
            <Content style={{ padding: 15 }}>
                <Route path="/main/article"   component={Article}></Route>
                <Route path="/main/write"   component={Write}></Route>
                <Route path="/main/read"   component={Read}></Route>
                <Route path="/main/center"   component={Center}></Route>
                <Route path='/main'  component={Index} exact></Route>
            </Content>
        </Layout>
    </Layout>
}
const mapDispatchToProps  = (dispatch, ownProps) => {
    return  {
       setStoreUser :(v)=>dispatch({type:'SET_USER',value:v}),
       setType :(v)=>dispatch({type:'SET_ARTTYPE',value:v}),
    }
  }
  
 export default connect(null,mapDispatchToProps)(Main) ;