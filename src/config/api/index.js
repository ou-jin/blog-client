import axios from 'axios'
import api from './api.js'
import { message } from 'antd';

// 创建axios实例
const createApiInstance = (option) => {
  return axios.create({
    method: option.method,
    // eslint-disable-next-line no-undef
    baseURL: process.env.NODE_ENV === 'development' ? process.env.API_HOST : process.env.API_HOST,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: localStorage.getItem('token')
    },
    ...option
  })
}

const sendApiInstance = (option) => {
  const instance = createApiInstance(option)
  instance.interceptors.request.use(
    (config) => {
      // URL增加时间戳 防止请求缓存
      config.url = option.url + '?t=' + new Date().getTime()
      // token装载
      config.headers.Authorization = localStorage.getItem('JSON_TOKEN') || ''
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    (response) => {
      // 将接口返回的token更新到本地
      if (response.data.token) localStorage.setItem('JSON_TOKEN', response.data.token)
    //   return Promise.resolve(response.data)
      if (response.data && response.data.status === 200) {
        return Promise.resolve(response.data)
      } else {
        // ElMessage.error(response.data.msg)
        message.error(response.data.msg);
      }
    },
    (error) => {
      console.log('报错内容返回值', error.response, error.message)
      if ((error.response && error.response.status == 401) || error.message.indexOf('timeout') > -1) {
        // ElMessage({
        //   message: '登录过期请重新登录',
        //   type: 'error',
        //   duration: 2000
        // })
        // 清空localStorage
        localStorage.clear()
        // // 重置store
        // store.reset()
        // 返回登录
        // Router.push({ path: '/login' })
        return
      } else {
        var options = {
          message: error.message,
          center: true
        }
        // ElMessage.error(options)
      }

      // store.dispatch('app/closeLoading')
      return Promise.reject(error)
    })
  return instance
}

const getApiMap = (api) => {
  const apiList = {}
  for (const k in api) {
    apiList[k] = sendApiInstance(api[k])
  }
  return apiList
}
export default getApiMap(api)
