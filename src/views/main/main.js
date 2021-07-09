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
 

export default function Main() {
    return <Layout>
        <Sider theme='light'><SideMeau /></Sider>
        <Layout>
            <Header>
                <Head/>
            </Header>
            <Content style={{ padding: 15 }}>
                <Route path="/main/article"   component={Article}></Route>
                <Route path="/main/write"   component={Write}></Route>
                
            </Content>
        </Layout>
    </Layout>
}