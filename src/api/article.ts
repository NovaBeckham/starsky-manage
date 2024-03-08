/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-07-04 15:58:55
 */

import { PageQuery, PageResult, Result } from '@/interface'
import requests from '@/utils/request'

export interface Article {
	articleCover?: string
	articleTitle?: string
	articleAbstract?: string
	categoryId?: number
	createTime?: string
	id?: number
	isDelete?: number
	isFeatured?: number
	isTop?: number
	status?: number
	tagIds?: number[]
	type?: number
	viewsCount?: number
	password?: string
	articleContent?: string
}

/** 文章列表 */
export const getArticleList: (params: PageQuery) => Promise<Result<PageResult<Article[]>>> = (params) => {
	return requests({
		url: '/admin/articles',
		method: 'get',
		params,
	})
}

/** 保存和修改文章 */
export const saveArticle: (data: Article) => Promise<Result<null>> = (data) => {
	return requests({
		url: '/admin/articles',
		method: 'post',
		data,
	})
}

/** 文章列表 */
export const getArticleInfo: (articleId: number) => Promise<Result<Article>> = (articleId) => {
	return requests({
		url: `/admin/articles/${articleId}`,
		method: 'get',
	})
}

/**
 * 上传图片
 */
export const uploadImage: (data: FormData) => Promise<Result<string>> = (data) => {
	return requests({
		url: '/admin/articles/images',
		method: 'post',
		headers: { 'Content-Type': 'multipart/form-data' },
		data,
	})
}
