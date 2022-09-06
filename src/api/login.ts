/*
 * @Description: login
 * @Author: hyx
 * @Date: 2022-09-06 10:55:36
 */

import https from '@/utils/https'

export const login = (params: { username: string; password: string }) => https.post('/api/login', params)
