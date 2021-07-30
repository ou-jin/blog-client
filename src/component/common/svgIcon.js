import Icon from '@ant-design/icons';
const ctx = require.context('../../assets/sprite', true, /\.svg$/)
const map = {}
for (const key of ctx.keys()) {
    const k = key.match(/(\.\/=?)(\w*)(?=\.svg)/)[2]
    map[k] = ctx(key).default
}
console.log(map)
export default (props)=>{
    return <Icon style={{ fontSize: props.size}} className={props.className} component={map[props.icon]} />
}
