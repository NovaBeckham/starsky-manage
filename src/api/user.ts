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
	createdAt?: string
	pageSize?: number
	pageNum?: number
}

export const getUserList: (params: UserRequest) => Promise<MyResponse<User[]>> = (params) => request.get('/users', { params })

export const deleteUser: (id: number) => Promise<MyResponse<null>> = (id) => request.delete(`/user/${id}`)
