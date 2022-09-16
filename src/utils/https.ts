/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-27 14:02:14
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export interface ResponseData {
	time: string
	code: number
	data?: any
	msg: string
}

// console.log('import.meta.env: ', import.meta.env);

// 创建 axios 实例
const service = axios.create({
	// baseURL: 'http://localhost:8080', // api 的 base_url
	timeout: 50000, // 请求超时时间
})

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const starToken = localStorage.getItem('starToken') ?? ''
		config.headers = {
			auth: starToken,
		}
		return config
	},
	(error: any) => {
		// Do something with request error
		console.error('error:', error) // for debug
		Promise.reject(error)
	}
)

// respone 拦截器 axios 的一些配置
service.interceptors.response.use(
	(res: AxiosResponse) => {
		// Some example codes here:
		// code == 0: success
		if (res.status === 200) {
			const data: ResponseData = res.data
			if (data.code === 200) {
				return data
			} else {
				ElMessage({
					message: data.msg,
					type: 'error',
				})
			}
		} else {
			ElMessage({
				message: '网络错误!',
				type: 'error',
			})
			return Promise.reject(new Error(res.data.msg || 'Error'))
		}
	},
	(error: any) => Promise.reject(error)
)

export default service
