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
 function SideMeau(props) {
    let [type,setType] = useState([])
    
    const history = useHistory();
    
    const herf = (url) => {
        const {key,keyPath} = url;
        const pagePath = keyPath[keyPath.length - 1]
        if(keyPath.length>1){
            props.setCurrentBlodType(key)
        }
        history.push('/main/' + pagePath)
    }

    const openMenu = (e) => {
        console.log('openMenu')
        e.preventDefault()
    }
    
    useEffect(() => {
        const user = localStorage.getItem('user')
        if(!user)return
        setType(JSON.parse(user).type.split(','))
    }, []);

    return <div>
        <div className='side_top row-center'  >
            {/* <FrownTwoTone /> */}
            <Icon style={{ fontSize: '26px'}} component={AnimalSvg} />
        </div>
        <Menu onClick={herf} mode="inline" defaultOpenKeys={['article']} >
            <SubMenu title="分类" key='article' icon={<FileWordOutlined />} onContextMenu={openMenu}>
                {type.map(v=><Menu.Item key={v}>{v}</Menu.Item>)}
                {/* <Menu.Item key='react'>React</Menu.Item>
                <Menu.Item key='vue'>Vue</Menu.Item> */}
            </SubMenu>
            <Menu.Item key='center' icon={<LineChartOutlined />} >个人中心</Menu.Item>
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