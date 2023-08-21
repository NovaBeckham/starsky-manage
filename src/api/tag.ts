/*
 * @Description: 
 * @Author: hyx
 * @Date: 2023-08-18 11:51:14
 */

import { PageQuery, PageResult, Result } from "@/interface"
import requests from "@/utils/request"

export interface TagListOptions {
  id?: number
  tagName?: string
  articleCount?: number
	createTime?: string
}

/**
 * 标签列表
 */
export function getList(): Promise<Result<TagListOptions[]>> {
	return requests({
		url: '/tag/list',
		method: 'get',
	})
}

/**
 * 查看分类页
 * @param params 查询条件
 * @returns 分类页
 */
export const getPage: (params: PageQuery) => Promise<Result<PageResult<TagListOptions[]>>> = (params) => {
	return requests({
		url: '/admin/tag/list',
		method: 'get',
		params,
	})
}

/**
 * 添加标签
 * @param data 标签信息
 */
export function addTag(data: TagListOptions): Promise<Result<null>> {
	return requests({
		url: '/admin/tag/add',
		method: 'post',
		data,
	})
}

/**
 * 修改标签
 * @param data 标签信息
 */
export function updateTag(data: TagListOptions): Promise<Result<null>> {
	return requests({
		url: '/admin/tag/update',
		method: 'put',
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