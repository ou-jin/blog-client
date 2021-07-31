import { render } from "less";

const global = {
    // 当前博客类型
    currentBlogType:localStorage.getItem('currentBlogType'),
    // 当前文章对象
    currentArticle:JSON.parse(localStorage.getItem('currentArticle')||'{}'),
    test:''
}
export default (state=global,action)=>{
    switch(action.type){
        case 'SET_ARTICLE':
            localStorage.setItem('currentArticle',JSON.stringify(action.value))
            return {...state,currentArticle:action.value}
        case 'SET_CURRENTBLODTYPE':
            localStorage.setItem('currentBlogType',action.value)
            return {...state,...{currentBlogType:action.value}};
        case 'SET_TEST':return {...state,...action.value};
        default:return state;
    }
} 