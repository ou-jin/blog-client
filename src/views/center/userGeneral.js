import SvgIcon from '../../component/common/svgIcon.js';
export default (props)=>{
    const user = props.user
    const Icon = (props)=>{
     return  <span><SvgIcon icon={props.icon} className='mr10' size={16} />{props.children}</span>
    }
    const Box = (props)=>{
        return <div className='column-center'>
            <div className='title'>{props.label}</div>
            <div className='content row-center'>{props.children}</div>
        </div>
    }
    return <div className='general_box'>
      <Box label={<Icon icon='read'>阅读数</Icon>}>{user.totalReadCount||1230}</Box>
      <Box label={<Icon icon='article'>文章数</Icon>}>{user.articleCount||1230}</Box>
      <Box label={<Icon icon='type'>类别</Icon>}>{user.typeLength||1230}</Box>
      <Box label={<Icon icon='agree'>点赞</Icon>}>{user.agreeCount||1230}</Box>
    </div>
}