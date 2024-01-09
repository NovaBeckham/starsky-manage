/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-07-04 15:58:55
 */

import { PageQuery, PageResult, Result } from '@/interface'
import requests from '@/utils/request'

/** 文章 */
export interface Article {
	/** 文章id */
	id?: number
	/** userId */
	userId?: string
	/** 文章标题 */
	title?: string
	/** 文章作者 */
	nickname?: string
	/** 文章缩略图 */
	avatar?: string
	/** 阅读方式 */
	readType?: number
	/** 是否置顶 */
	isStick?: number
	/** 类型 */
	isOriginal?: number
	/** 文章阅读量 */
	quantity?: number
	/** 创建时间 */
	createTime?: string
	/** 发布状态 */
	isPublish?: number
	/** 分类名称 */
	categoryId?: number
	/** 标签名称 */
	tagIds?: string
	/** 文章简介 */
	summary?: string
	/** 文章内容 */
	contentMd?: string
}

export interface ArticleDto {
	/** 文章id */
	id?: number
	/** userId */
	userId?: string
	/** 文章标题 */
	title?: string
	/** 文章作者 */
	nickname?: string
	/** 文章缩略图 */
	avatar?: string
	/** 阅读方式 */
	readType?: number
	/** 是否置顶 */
	isStick?: number
	/** 类型 */
	isOriginal?: number
	/** 文章阅读量 */
	quantity?: number
	/** 创建时间 */
	createTime?: string
	/** 发布状态 */
	isPublish?: number
	/** 分类 */
	categoryId?: number
	/** 标签 */
	tags?: number[]
	/** 文章简介 */
	summary?: string
	/** 文章内容 */
	contentMd?: string
	/** 原文链接 */
	originalUrl?: string
	/** 是否推荐 */
	isRecommend?: number
	/** 是否首页轮播 */
	isCarousel?: number
	/** SEO关键词 */
	keywords?: string
	/** 文章内容 */
	content?: string
}

/** 文章列表 */
export const getArticleList: (data: PageQuery) => Promise<Result<PageResult<Article[]>>> = (data) => {
	return requests({
		url: '/article/system/list',
		method: 'post',
		data,
	})
}

/**
 * 上传图片
 */
export const uploadImage: (data: FormData) => Promise<Result<string>> = (data) => {
	return requests({
		url: '/article/system/images',
		method: 'post',
		headers: { 'Content-Type': 'multipart/form-data' },
		data,
	})
}

/**
 * 随机获取一张图片
 */
export const getRandomImg: () => Promise<Result<string>> = () => {
	return requests({
		url: '/article/system/randomImg',
		method: 'get',
	})
}

/** 文章详情 */
export const getArticleInfo: (id: number) => Promise<Result<ArticleDto>> = (id) => {
	return requests({
		url: '/article/system/info',
		method: 'get',
		params: { id },
	})
}

/** 保存文章 */
export const saveArticle: (data: ArticleDto) => Promise<Result<null>> = (data) => {
	return requests({
		url: '/article/system/add',
		method: 'post',
		data,
	})
}

/** 更新文章 */
export const updateArticle: (data: ArticleDto) => Promise<Result<null>> = (data) => {
	return requests({
		url: '/article/system/update',
		method: 'post',
		data,
	})
}
