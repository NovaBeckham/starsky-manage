/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-08-18 11:51:14
 */

import { PageResult, Result } from '@/interface'
import requests from '@/utils/request'

export interface Tags {
	id?: number
	name?: string
	avatar?: string
	sort?: number
	clickVolume?: number
	articleCount?: number
	createTime?: string
	updateTime?: string
}

/**
 * 标签列表
 */
export function getList(params: {
	current?: number
	size?: number
	name?: string
}): Promise<Result<PageResult<Tags[]>>> {
	return requests({
		url: '/tags/system/list',
		method: 'get',
		params,
	})
}

/**
 * 添加标签
 * @param data 标签信息
 */
export function addTagRequest(data: Tags): Promise<Result<null>> {
	return requests({
		url: '/tags/system/add',
		method: 'post',
		data,
	})
}

/**
 * 修改标签
 * @param data 标签信息
 */
export function updateTagRequest(data: Tags): Promise<Result<null>> {
	return requests({
		url: '/tags/system/update',
		method: 'post',
		data,
	})
}

/**
 * 删除标签
 * @param data 标签id集合
 */
export function deleteTag(data: number[]): Promise<Result<null>> {
	return requests({
		url: '/admin/tag/delete',
		method: 'delete',
		data,
	})
}
