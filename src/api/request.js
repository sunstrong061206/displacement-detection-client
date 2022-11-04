// TODO 测试目录
import axios from 'axios'
import nProgress from 'nprogress'

import 'nprogress/nprogress.css'

let requests = axios.create({
  baseURL: '/mock',
})

requests.interceptors.request.use((config) => {
  nProgress.start()
  return config
})

requests.interceptors.response.use(
  (res) => {
    nProgress.done()
    return res
  },
  (err) => {
    nProgress.done()
    return Promise.reject(new Error(err))
  }
)

export let FakeAPI = () =>
  requests({
    url: '/info',
    method: 'get',
  })
