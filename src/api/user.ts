/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-27 11:44:24
 */

import { PageQuery, PageResult, Result } from '@/interface'
import requests from '@/utils/request'
import { Menu } from './menu'

interface UserRole {
	id: number
	roleName: string
}

interface UserParams extends PageQuery {
	nickname?: string
}

export interface UserInfo {
	/** 头像 */
	avatar?: string
	/** 邮箱 */
	email?: string
	/** id */
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
	/** token */
	token?: string
	/** userInfoId */
	userInfoId?: string
	/** 用户名 */
	username?: string
}

/**
 * 用户详情
 */
export function getInfo(): Promise<Result<UserInfo>> {
	return requests({
		url: '/user/getInfo',
		method: 'get',
	})
}

/**
 * 用户列表
 */
export function getPage(params: UserParams): Promise<Result<PageResult<UserInfo[]>>> {
	return requests({
		url: '/user/page',
		method: 'get',
		params,
	})
}

/**
 * 用户列表
 */
export function reqIsDisAbleUser(id: number, flag: number): Promise<Result<any>> {
	return requests({
		url: `/user/${id}/${flag}`,
		method: 'delete',
	})
}
