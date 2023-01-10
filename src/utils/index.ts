/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-10 15:42:45
 */

import { format } from 'date-fns'

export const timeFormat = (utcTime: string) => {
	return format(new Date(utcTime), 'yyyy-MM-dd HH:mm:ss')
}
