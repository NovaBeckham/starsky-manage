/*
 * @Description: login
 * @Author: hyx
 * @Date: 2022-09-06 10:55:36
 */

import { Result } from '@/interface'
import requests from '@/utils/request'

interface LoginForm {
	username: string
	password: string
}

interface LoginResponse {
	/** 头像 */
	avatar?: string
	/** 邮箱 */
	email?: string
	id?: number
	/** 登录IP */
	ipAddress?: string
	/** 登录地址 */
	ipSource?: string
	/** 上次登录时间 */
	lastLoginTime?: string
	/** 登录状态 */
	loginType?: number
	/** 昵称 */
	nickname?: string
	token?: string
	userInfoId?: string
	/** 用户名 */
	username?: string
}

/**
 * 用户登录
 */
export const login: (params: LoginForm) => Promise<Result<LoginResponse>> = (params) => requests.post('/users/login', params)

/**
 * 用户退出
 */
export const logout: () => Promise<Result<null>> = () => {
	return requests({
		url: '/logout',
		method: 'get',
	})
}
