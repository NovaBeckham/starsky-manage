/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-16 17:36:34
 */
import https from '@/utils/https'

export const getArticleList = () => https.get('/api/articles/getList')
