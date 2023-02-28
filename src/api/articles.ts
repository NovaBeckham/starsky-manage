/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-16 17:36:34
 */

interface CreateParams {
	title: string
	content: string
	author: string
  category: string
}

import { request } from '@/utils/https'

export const getArticleList = () => request.get('/article')

export const createArticle = (params: CreateParams) => request.post('/article/add', params)
