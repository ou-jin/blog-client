import React from 'react';
import {
    Route
} from "react-router-dom";
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
 

export default function Main() {
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
                <Route path='/'  component={Index} exact></Route>
                
            </Content>
        </Layout>
    </Layout>
}