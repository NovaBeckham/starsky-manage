/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-05 17:10:34
 */

import { request, ResponseData } from '@/utils/https'

export interface TagList {
	id: number
	name: string
	createdAt: string
	updatedAt: string
}

export const getTagList = (): Promise<ResponseData<TagList[]>> => request.get('/api/tags/getList')

export const createTag = (params: { name: string }): Promise<ResponseData<string>> => request.post('/api/tags/create', params)

export const updateTag = (params: { name: string; id: number }): Promise<ResponseData<string>> => request.post('/api/tags/update', params)
