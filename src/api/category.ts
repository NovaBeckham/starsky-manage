/*
 * @Description: 分类接口
 * @Author: hyx
 * @Date: 2023-06-26 16:38:19
 */

import { PageQuery, PageResult, Result } from '@/interface'
import requests from '@/utils/request'

export interface Category {
	/**
	 * 分类id
	 */
	id: number
	/**
	 * 分类名
	 */
	categoryName: string
	/**
	 * 文章数量
	 */
	articleCount: number
	/**
	 * 创建时间
	 */
	createTime: string
}

/**
 * 分类表单
 */
interface CategoryForm {
	/**
	 * 分类id
	 */
	id?: number
	/**
	 * 分类名
	 */
	categoryName: string
}

/**
 * 查看分类页
 * @param params 查询条件
 * @returns 分类页
 */
export const getPage: (params: PageQuery) => Promise<Result<PageResult<Category[]>>> = (params) => {
	return requests({
		url: '/admin/category/page',
		method: 'get',
		params,
	})
}

/**
 * 删除分类
 * @param data 分类id集合
 */
export function deleteCategory(data: number[]): Promise<Result<null>> {
	return requests({
		url: '/admin/category/delete',
		method: 'delete',
		data,
	})
}

/**
 * 添加分类
 * @param data 分类信息
 */
export function addCategory(data: CategoryForm): Promise<Result<null>> {
	return requests({
		url: '/admin/category/add',
		method: 'post',
		data,
	})
}

/**
 * 修改分类
 * @param data 分类信息
 */
export function updateCategory(data: CategoryForm): Promise<Result<null>> {
	return requests({
		url: '/admin/category/update',
		method: 'put',
		data,
	})
}

/**
 * 查看分类页
 * @param params 查询条件
 * @returns 分类页
 */
export function getList(): Promise<Result<Category[]>> {
	return requests({
		url: '/category/list',
		method: 'get',
	})
}
