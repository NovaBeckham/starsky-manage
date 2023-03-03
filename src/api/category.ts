/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-02-28 17:27:22
 */

import { MyResponse, request } from '@/utils/https'

export interface Category {
	id: number
	name: string
}

export interface CategoryRequest {
	id?: number
	name?: string
	createdAt?: string
	pageSize?: number
	pageNum?: number
}

export const getCategoryList: (params: CategoryRequest) => Promise<MyResponse<Category[]>> = (params) => request.get('/category', { params })

export const deleteCategory: (id: number) => Promise<MyResponse<null>> = (id) => request.delete(`/category/${id}`)

export const addCategory: (data: CategoryRequest) => Promise<MyResponse<null>> = (data) => request.post('/category/add', data)

export const updateCategory: (id: number, data: CategoryRequest) => Promise<MyResponse<null>> = (id, data) => request.put(`/category/${id}`, data)
