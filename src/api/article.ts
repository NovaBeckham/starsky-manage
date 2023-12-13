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
	avatar?: number
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
