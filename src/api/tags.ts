/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-05 17:10:34
 */

import https from '@/utils/https'

export const getTagList = () => https.get('/api/tags/getList')
