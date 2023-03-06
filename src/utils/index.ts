/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-10 15:42:45
 */

import { format } from 'date-fns'

export const timeFormat = (utcTime: string) => {
	return format(new Date(utcTime), 'yyyy-MM-dd HH:mm:ss')
}

export function buildShortUUID (prefix = '') {
	const time = Date.now()
	let unique = 0
	const random = Math.floor(Math.random() * 1000000000)
	unique++
	return prefix + '_' + random + unique + String(time)
}
