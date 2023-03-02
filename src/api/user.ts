/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-02-28 17:27:22
 */

import { MyResponse, request } from '@/utils/https'

export interface User {
	id: number
	username: string
	role: number
	createdAt: string
}

export interface UserRequest {
	id?: number
	username?: string
	role?: number
	password?: string
	createdAt?: string
	pageSize?: number
	pageNum?: number
}

export const getUserList: (params: UserRequest) => Promise<MyResponse<User[]>> = (params) => request.get('/users', { params })

export const getUserById: (id: number) => Promise<MyResponse<User>> = (id) => request.get(`/user/${id}`)

export const deleteUser: (id: number) => Promise<MyResponse<null>> = (id) => request.delete(`/user/${id}`)

export const addUser: (data: UserRequest) => Promise<MyResponse<null>> = (data) => request.post('/user/add', data)

export const updateUser: (id: number, data: UserRequest) => Promise<MyResponse<null>> = (id, data) => request.put(`/user/${id}`, data)
