import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const service = axios.create({
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000
})

service.interceptors.response.use(function (response) {
  return response
}, function (error: AxiosError) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        console.log('Unauthorized!!')
        break
      case 403:
        console.log('沒有存取的權限!!')
        break
      case 404:
        console.log('page not found!')
        break
      case 500:
        console.log('server error')
        break
      default:
        console.log(error.message)
    }
  }
  return Promise.reject(error)
})

export function request ({ url, method = 'GET', data, headers, params, signal }: AxiosRequestConfig) {
  return service.request({
    url,
    method,
    data,
    headers,
    params,
    signal
  })
}

export type { AxiosRequestConfig, AxiosResponse }
