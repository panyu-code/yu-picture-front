import axios from 'axios'

const $axios = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 30000,
  withCredentials: true,
})

// 添加请求拦截器
$axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
$axios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default $axios
