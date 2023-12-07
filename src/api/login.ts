/*
 * @Description: login
 * @Author: hyx
 * @Date: 2022-09-06 10:55:36
 */

import { Result } from '@/interface'
import requests from '@/utils/request'
import { UserInfo } from './user'

interface LoginForm {
	username: string
	password: string
}

/**
 * 用户登录
 */
export const login: (params: LoginForm) => Promise<Result<UserInfo>> = (params) => requests.post('/users/login', params)

/**
 * 用户退出
 */
export const logout: () => Promise<Result<null>> = () => {
	return requests({
		url: '/logout',
		method: 'get',
	})
}
