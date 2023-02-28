/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-02-28 17:27:22
 */

import { MyResponse, request } from '@/utils/https'

export interface User {
	username: string
	role: number
}

export const getUserList: () => Promise<MyResponse<User[]>> = () => request.get('/users')
