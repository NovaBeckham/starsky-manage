/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-07-04 15:58:55
 */

import { PageQuery, PageResult, Result } from '@/interface'
import requests from '@/utils/request'

export interface Article {
	/**
   * 文章id
   */
  id: number;
  /**
   * 文章缩略图
   */
  cover: string;
  /**
   * 文章标题
   */
  title: string;
  /**
   * 文章分类
   */
  cid: number;
  /**
   * 发表时间
   */
  createTime: string;
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
