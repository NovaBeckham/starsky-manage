/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-27 16:07:14
 */

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { errorTips, infoTips } from '.'

const requests = axios.create({
	baseURL: '/api',
	timeout: 10000,
})

requests.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (localStorage.getItem('xingToken')) {
			config.headers['Authorization'] = localStorage.getItem('xingToken')
		}
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

requests.interceptors.response.use(
	(response: AxiosResponse) => {
		switch (response.data.code) {
			case 400:
				errorTips(response.data.message)
				break
			case 402:
				infoTips('登录状态已过期，您可以继续留在该页面，或者重新登录')
				localStorage.removeItem('xingToken')
				location.href = '/login'
			case 500:
				errorTips(response.data.message)
				break
		}
		return response.data
	},
	(error: AxiosError) => {
		errorTips(error.message)
		return Promise.reject(error)
	}
)

export default requests
