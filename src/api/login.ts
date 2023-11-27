/*
 * @Description: login
 * @Author: hyx
 * @Date: 2022-09-06 10:55:36
 */

import { Result } from '@/interface'
import requests from '@/utils/request'
import { UserInfo } from './user'

interface LoginUser {
	userInfo: UserInfo
	token: string
}

interface LoginForm {
	nickname: string
	password: string
}

/**
 * 用户登录
 * @param data 登录信息
 * @returns Token
 */
export const login: (data: LoginForm) => Promise<Result<string>> = (data) => {
	return requests({
		url: '/login',
		method: 'post',
		data,
	})
}

/**
 * 用户退出
 */
export const logout: () => Promise<Result<null>> = () => {
	return requests({
		url: '/logout',
		method: 'get',
	})
}
