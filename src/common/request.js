import axios from 'axios'
import router from '../router'
import { VueAxios } from './axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api base_url
  // baseURL: "http://127.0.0.1:7788",
  timeout: 15000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const status = error.response.status
    if (status === 401) {
      /* notification.error({
        message: '401 - 未授权',
        description: '抱歉，本次访问未经授权!'
      })
      store.dispatch('Logout') 
      setTimeout(() => {
        router.push({ path: TCM_CONSTANT.LOGIN_PATH })
      }, 2000)
      */
      router.push({ path: '/401' })
    } else if (status === 403) {
      router.push({ path: '/403' })
    } else if (status === 500) {
      router.push({ path: '/500' })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  // console.log(response)
  const data = response.data
  if (response.headers['content-type'] === 'application/x-msdownload') { // 文件下载
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', decodeURIComponent(response.headers['download']))// 文件名
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) // 下载完成移除元素
    window.URL.revokeObjectURL(url) // 释放掉blob对象
  } else if (data.success) {
    return Promise.resolve(data)
  } else {
    // notification.error({
    //   message: '错误提示',
    //   description: data.resultMsg
    // })
    // 1001:"TOKEN过期";1002:"TOKEN非法";1003:"TOKEN不存在
    // 跳转到登录路由
    return Promise.reject(response)
  }
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
