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

import https from '@/utils/https'

export const getArticleList = () => https.get('/api/articles/getList')

export const createArticle = (params: CreateParams) => https.post('/api/articles/create', params)
