import { Menu, Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import React from 'react';

export default function Head() {
    const history = useHistory();
    const logout = ()=>{
        localStorage.clear()
        history.push('/login')
    }

    const menu = (
        <Menu  >
            <Menu.Item key="0" onClick={()=>{logout()}}>
                <span >退出登录</span>
            </Menu.Item>
        </Menu>
    );

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')||'{}'))
    }, [])
    
    return (
        <div className='row-flex-end head_box'>
        <Dropdown overlay={menu}  >
            <div>{user.name} <DownOutlined /></div>
        </Dropdown> 
    </div>
    )
}