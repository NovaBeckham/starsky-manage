/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-27 11:44:24
 */

import { Result } from '@/interface'
import requests from '@/utils/request'
import { Menu } from './menu'

interface UserRole {
	id: number
	roleName: string
}

export interface UserInfo {
	id?: number
	email?: any
	nickname?: string
	avatar?: string
	intro?: any
	website?: any
	isSubscribe?: any
	isDisable?: number
	createTime?: string
	updateTime?: string
	userRole?: UserRole
	menus?: Menu[]
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
