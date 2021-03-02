import axios from 'axios'
import { Loading, Notification } from 'element-ui'
import router from '../router'
import { VueAxios } from './axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 60000 // 请求超时时间
})

const err = (error) => {
  loadingInstance && loadingInstance.close()
  if (error.response) {
    const status = error.response.status
    if (status === 401) {
      router.push({ path: '/401' })
    } else if (status === 403) {
      router.push({ path: '/403' })
    } else if (status === 500) {
      router.push({ path: '/500' })
    }
  }
  Notification.error({
    title: '错误',
    message: error
  });
  return Promise.reject(error)
}

let loadingInstance = null;

// request interceptor
service.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    target: "body",
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return config
}, err)

service.interceptors.response.use((response) => {
  loadingInstance && loadingInstance.close()
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
