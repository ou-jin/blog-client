import { Menu } from "antd";
import {
    LineChartOutlined,
    FileWordOutlined,
    FrownTwoTone
} from '@ant-design/icons';
import { useHistory } from "react-router";
import { useRef, useEffect ,useState } from 'react'
const { SubMenu } = Menu;
import Icon from '@ant-design/icons';
import AnimalSvg from '../../assets/sprite/animal.svg'
import { connect } from 'react-redux'
import api from "../../config/api";
 function SideMeau(props) {
    const history = useHistory();
    
    const herf = (url) => {
        const {key,keyPath} = url;
        console.log(url)
        const pagePath = keyPath[keyPath.length - 1]
        if(keyPath.length>1){
            // props.setCurrentBlodType(key)
            localStorage.setItem('typeId',key)
        }
        history.push('/main/' + pagePath)
    }
  

    const openMenu = (e) => {
        console.log('openMenu')
        e.preventDefault()
    }
    
    useEffect(() => {
        console.log(props.type)
    }, []);

    return <div>
        <div className='side_top row-center'  >
            {/* <FrownTwoTone /> */}
            <Icon style={{ fontSize: '26px'}} component={AnimalSvg} />
        </div>
        <Menu onClick={herf} mode="inline" defaultOpenKeys={['article']} >
        <Menu.Item key='' icon={<LineChartOutlined />} >主页</Menu.Item>
            <SubMenu title="分类" key='article' icon={<FileWordOutlined />} onContextMenu={openMenu}>
                {props.type.map((v,i)=><Menu.Item key={i.id} >{v.name}</Menu.Item>)}
                {/* <Menu.Item key='react'>React</Menu.Item>
                <Menu.Item key='vue'>Vue</Menu.Item> */}
            </SubMenu>
            <Menu.Item key='center' icon={<LineChartOutlined />} >个人中心</Menu.Item>
        </Menu>
    </div>
}
const mapStateToProps = (state) => {
    return {
        type: state.global.artType
    }
  }
const mapDispatchToProps  = (dispatch) => {
    return  {
       setArtType :(v)=>dispatch({type:'SET_ARTTYPE',value:v})
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(SideMeau)