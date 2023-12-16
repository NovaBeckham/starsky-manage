/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-27 11:44:24
 */

import { PageQuery, PageResult, Result } from '@/interface'
import requests from '@/utils/request'

interface UserParams extends PageQuery {
	nickname?: string
}

export interface UserInfo {
	/** id */
	id?: string
	/** 用户名 */
	username?: string
	/** 昵称 */
	nickname?: string
	/** 头像 */
	avatar?: string
	/** 状态 */
	status?: number
	/** 角色 */
	roleId?: number
}

/**
 * 用户详情
 */
export function getUserInfo(): Promise<Result<UserInfo>> {
	return requests({
		url: '/user/getCurrentUserInfo',
		method: 'post',
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
