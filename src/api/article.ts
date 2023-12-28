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
	 * userId
	 */
	userId?: string
	/**
	 * 文章标题
	 */
	title?: string
	/**
	 * 文章作者
	 */
	nickname?: string
	/**
	 * 文章缩略图
	 */
	avatar?: string
	/**
	 * 阅读方式
	 */
	readType?: number
	/**
	 * isStick
	 */
	isStick?: number
	/**
	 * 类型
	 */
	isOriginal?: number
	/**
	 * quantity
	 */
	quantity?: number
	/**
	 * 创建时间
	 */
	createTime?: string
	/**
	 * 发布状态
	 */
	isPublish?: number
	/**
	 * 分类名称
	 */
	categoryName?: string
	/**
	 * 标签名称
	 */
	tagNames?: string
	/**
	 * 文章简介
	 */
	summary?: string
	/**
	 * 文章内容
	 */
	contentMd?: string
}

/**
 * 查看分类列表
 * @param data 查询条件
 * @returns 分类列表
 */
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
