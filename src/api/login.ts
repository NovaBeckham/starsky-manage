/*
 * @Description: login
 * @Author: hyx
 * @Date: 2022-09-06 10:55:36
 */

import { MyResponse, request } from '@/utils/https'

interface LoginRequest {
  username: string
  password: string
}

export const login: (params: LoginRequest) => Promise<MyResponse<null>> = (params) => request.post('/login', params)
