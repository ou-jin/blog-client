import { Menu } from "antd";
import {
    LineChartOutlined,
    FileWordOutlined,
    FrownTwoTone
} from '@ant-design/icons';
import { useHistory } from "react-router";
import { useRef, useEffect } from 'react'
const { SubMenu } = Menu;
import Icon from '@ant-design/icons';
import AnimalSvg from '../../assets/sprite/animal.svg'
export default function SideMeau() {
    const history = useHistory();
    
    const herf = (url) => {
        // console.log('url',url)
        // history.push('/main/' + url.key)
    }

    const openMenu = () => {
        console.log('openMenu')
    }

    const test = ()=>{
        console.log('test')
    }

    const blogRef = useRef()

    const testRef = useRef()
    
    useEffect(() => {
        console.log('blogRef useEffect', blogRef)
        console.log('testRef',testRef)
    }, []);

    return <div>
        <div className='side_top row-center' ref={testRef}>
            {/* <FrownTwoTone /> */}
            <Icon style={{ fontSize: '26px'}} component={AnimalSvg} />
        </div>
        <Menu onClick={herf} mode="inline" onContextmenu={openMenu}>
            <SubMenu title="blod" icon={<FileWordOutlined />} onContextmenu={openMenu} onClick={test} ref={blogRef}>
                <Menu.Item>React</Menu.Item>
                <Menu.Item>Vue</Menu.Item>
                {/* <SubMenu title="">
                    <Menu.Item>子菜单项</Menu.Item>
                </SubMenu> */}
            </SubMenu>
            <Menu.Item key='statistics' icon={<LineChartOutlined />} >page2</Menu.Item>
        </Menu>
    </div>
}