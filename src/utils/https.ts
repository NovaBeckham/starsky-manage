/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-27 14:02:14
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export interface ResponseData<T extends any> {
	time: string
	code: number
	data: T
	msg: string
}

export interface MyResponse<T extends any> extends AxiosResponse {
	message: string
	total: number
	data: T
}

const createAxiosByinterceptors = (config?: AxiosRequestConfig): AxiosInstance => {
	// 创建 axios 实例
	const service = axios.create({
		baseURL: 'http://localhost:3000/api/v1', // api 的 base_url
		timeout: 50000, // 请求超时时间
		...config,
	})

	// request 拦截器 axios 的一些配置
	service.interceptors.request.use(
		(config: AxiosRequestConfig) => {
			const starToken = localStorage.getItem('starToken') ?? ''
			config.headers = {
				Authorization: `Bearer ${starToken}`,
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
		(res) => {
			// Some example codes here:
			// code == 0: success
			const { message } = res.data
			if (res.status === 200) {
				return res.data
			} else {
				ElMessage({
					message,
					type: 'error',
				})
				return Promise.reject(new Error(message || 'Error'))
			}
		},
		(error: any) => Promise.reject(error)
	)

	return service
}

export const request = createAxiosByinterceptors({})