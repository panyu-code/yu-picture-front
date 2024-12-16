import axios from 'axios'
import { message } from 'ant-design-vue'

axios.create({
  baseURL: 'localhost:8080/api',
  timeout: 5000,
  withCredentials: true,
})

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    const { data } = response
    if (data.code === 50000) {
      message.error('服务器异常，请稍后重试！')
    }
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default axios
