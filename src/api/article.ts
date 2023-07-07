/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-07-04 15:58:55
 */

import { PageQuery, PageResult, Result } from '@/interface'
import requests from '@/utils/request'

/**
 * 文章
 */
export interface Article {
	/**
	 * 文章id
	 */
	id?: number
	/**
	 * 文章缩略图
	 */
	articleCover?: string
	/**
	 * 文章标题
	 */
	articleTitle?: string
	/**
	 * 文章内容
	 */
	articleContent?: string
	/**
	 * 文章分类
	 */
	categoryId?: number
	/**
	 * 是否删除 (0否 1是)
	 */
	isDelete?: number
	/**
	 * 状态 (1公开 2私密 3草稿)
	 */
	status?: number
	/**
	 * 发表时间
	 */
	createTime?: string
	/**
	 * 更新时间
	 */
	updateTime?: string
}

/**
 * 查看分类列表
 * @param params 查询条件
 * @returns 分类列表
 */
export const getArticleList: (params: PageQuery) => Promise<Result<PageResult<Article[]>>> = (params) => {
	return requests({
		url: '/admin/article/list',
		method: 'get',
		params,
	})
}

/**
 * 添加文章
 * @param data 文章信息
 */
export function addArticle(data: Article): Promise<Result<null>> {
	return requests({
		url: '/admin/article/add',
		method: 'post',
		data,
	})
}

/**
 * 修改文章
 * @param data 文章信息
 */
export function updateArticle(data: Article): Promise<Result<null>> {
	return requests({
		url: '/admin/article/update',
		method: 'put',
		data,
	})
}

/**
 * 文章详情
 * @param articleId 文章id
 */
export function getInfo(articleId: number): Promise<Result<Article>> {
	return requests({
		url: `/admin/article/getInfo/${articleId}`,
		method: 'get',
	})
}

/**
 * 上传文章图片
 * @returns 图片链接
 */
export const uploadArticleCover: (data: FormData) => Promise<Result<string>> = (data) => {
	return requests({
		url: '/admin/article/upload',
		headers: { 'content-type': 'multipart/form-data' },
		method: 'post',
		data,
	})
}
