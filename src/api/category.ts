/*
 * @Description: 分类接口
 * @Author: hyx
 * @Date: 2023-06-26 16:38:19
 */

import { PageQuery, PageResult, Result } from '@/interface'
import requests from '@/utils/request'

export interface Category {
	/** 分类id */
	id?: number
	/** 分类名 */
	name?: string
	/** 点击量 */
	clickVolume?: number
	/** 排序 */
	sort?: number
	/** 图标 */
	icon?: string
	/** 文章量 */
	articleCount?: number
	/** 创建时间 */
	createTime?: string
	/** 更新时间 */
	updateTime?: string
}

/**
 * 查看分类页
 * @param params 查询条件
 * @returns 分类页
 */
export const getPage: (params: PageQuery) => Promise<Result<PageResult<Category[]>>> = (params) => {
	return requests({
		url: 'category/system/list',
		method: 'get',
		params,
	})
}

/**
 * 删除分类
 * @param id 分类id
 */
export function deleteCategory(id: number): Promise<Result<null>> {
	return requests({
		url: '/category/delete',
		method: 'delete',
		params: { id },
	})
}

/**
 * 添加分类
 * @param data 分类信息
 */
export function addCategoryRequest(data: Category): Promise<Result<null>> {
	return requests({
		url: '/category/system/add',
		method: 'post',
		data,
	})
}

/**
 * 修改分类
 * @param data 分类信息
 */
export function updateCategoryRequest(data: Category): Promise<Result<null>> {
	return requests({
		url: '/system/category/update',
		method: 'post',
		data,
	})
}
