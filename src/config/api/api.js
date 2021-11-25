let config = {
    login: { url: 'user/login', method: 'post' },
    regist:{ url: 'user/regist', method: 'post' },
    userSet:{ url: 'user/set', method: 'post' },
    visitorLogin:{ url: 'user/visitorLogin', method: 'post' },
    delUserType:{ url: 'user/delUserType', method: 'get' },
    getUserArticleType:{ url: 'user/getUserArticleType', method: 'get' },

    articleGetList: { url: 'article/getList', method: 'get' },
    articleAdd: { url: 'article/add', method: 'post' },
    articleDelete: { url: 'article/delete', method: 'get' },
    articleSet: { url: 'article/set', method: 'post' },
    articleSave: { url: 'article/save', method: 'post' },
    uploadImg:{ url: 'upload/uploadImg', method: 'post' },
}
export default config