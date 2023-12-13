/*
 * @Description: login
 * @Author: hyx
 * @Date: 2022-09-06 10:55:36
 */

import { Result } from '@/interface'
import requests from '@/utils/request'

/**
 * 用户登录
 */
export const login: (params: {
	username: string
	password: string
	rememberMe: boolean
}) => Promise<Result<string>> = (params) => requests.post('/login', params)

/**
 * 用户退出
 */
export const logout: () => Promise<Result<null>> = () => {
	return requests({
		url: '/logout',
		method: 'get',
	})
}
