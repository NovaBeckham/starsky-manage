/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-16 17:36:34
 */

import { MyResponse, request } from '@/utils/https'
import { Category } from './category'

export interface Article {
	id?: number
	category?: Category
	desc?: string
	content?: string
	title?: string
	createdAt?: string
	img?: string
}

export interface ArticleRequest {
	id?: number
	title?: string
	desc?: string
	content?: string
	category?: number
	createdAt?: string
	img?: string
	pageSize?: number
	pageNum?: number
}

export const getArticleList: (params: ArticleRequest) => Promise<MyResponse<Article[]>> = (params) => request.get('/article', { params })

export const createArticle: (data: Article) => Promise<MyResponse<null>> = (data) => request.post('/article/add', data)

export const getArticleInfo: (id: number) => Promise<MyResponse<Article>> = (id) => request.get(`/article/info/${id}`)

export const updateArticle: (id: number, data: Article) => Promise<MyResponse<null>> = (id, data) => request.put(`/article/${id}`, data)
