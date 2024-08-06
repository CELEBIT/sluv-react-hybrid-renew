import axios, { AxiosInstance } from 'axios'
import { ACCESS_TOKEN } from '../../config/constant'

// axios 인스턴스

const dev: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DEV_APP_API,
  timeout: 2500,
})
// 요청 인터셉터
// dev.interceptors.request.use(
//   (config) => {
//     // 요청 성공 직전 호출됨
//     const accessToken = window.localStorage.getItem(ACCESS_TOKEN)
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`
//     }
//     return config
//   },
//   (error) => {
//     console.log(error)
//     return Promise.reject(error)
//   },
// )

// 응답 인터셉터
dev.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default dev
