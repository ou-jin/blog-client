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
import { connect } from 'react-redux'
 function SideMeau(props) {
    
    const history = useHistory();
    
    const herf = (url) => {
        const {key,keyPath} = url;
        const pagePath = keyPath[keyPath.length - 1]
        if(keyPath.length>1){
            props.setCurrentBlodType(key)
        }
        history.push('/main/' + pagePath)
    }

    const openMenu = () => {
        console.log('openMenu')
        event.preventDefault()
    }
    
    useEffect(() => {
        console.log(props)
    }, []);

    return <div>
        <div className='side_top row-center'  >
            {/* <FrownTwoTone /> */}
            <Icon style={{ fontSize: '26px'}} component={AnimalSvg} />
        </div>
        <Menu onClick={herf} mode="inline"  >
            <SubMenu title="blog" key='article' icon={<FileWordOutlined />} onContextMenu={openMenu}    >
                <Menu.Item key='react'>React</Menu.Item>
                <Menu.Item key='vue'>Vue</Menu.Item>
                {/* <SubMenu title="">
                    <Menu.Item>子菜单项</Menu.Item>
                </SubMenu> */}
            </SubMenu>
            <Menu.Item key='statistics' icon={<LineChartOutlined />} >page2</Menu.Item>
        </Menu>
    </div>
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
  }
const mapDispatchToProps  = (dispatch, ownProps) => {
    return  {
       setCurrentBlodType :(v)=>dispatch({type:'SET_CURRENTBLODTYPE',value:v})
    }
  }
export default connect(null,mapDispatchToProps)(SideMeau)