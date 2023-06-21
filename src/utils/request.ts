import { notification } from 'ant-design-vue'
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const requests = axios.create({
	baseURL: '/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
	},
})

requests.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (localStorage.getItem('starskyToken')) {
			config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('starskyToken')
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
				notification.error({
					message: '错误',
					description: response.data.msg,
				})
				break
			case 402:
				notification.info({
					message: '提示',
					description: '登录状态已过期，您可以继续留在该页面，或者重新登录',
				})
				localStorage.removeItem('starskyToken')
				location.href = '/login'
			case 500:
				notification.error({
					message: '错误',
					description: response.data.msg,
				})
				break
		}
		return response.data
	},
	(error: AxiosError) => {
		const { message } = error
		let description = ''
		if (message == 'Network Error') {
			description = '后端接口连接异常'
		} else if (message.includes('timeout')) {
			description = '系统接口请求超时'
		} else if (message.includes('Request failed with status code')) {
			description = '系统接口' + message.substring(message.length - 3) + '异常'
		}
		notification.error({
			message: '错误',
			description,
		})
		return Promise.reject(error)
	}
)

export default requests
