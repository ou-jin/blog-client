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
 

export default function Main() {
    return <Layout>
        <Sider theme='light'><SideMeau /></Sider>
        <Layout>
            <Header>
                <Head/>
            </Header>
            <Content>
                <Route path="/main/article"   component={Article}></Route>
            </Content>
        </Layout>
    </Layout>
}