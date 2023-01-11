/*
 * @Description: login
 * @Author: hyx
 * @Date: 2022-09-06 10:55:36
 */

import { request } from '@/utils/https'

export const login = (params: { username: string; password: string }) => request.post('/api/login', params)
