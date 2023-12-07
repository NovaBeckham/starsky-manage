/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-10 15:42:45
 */

import { notification } from 'ant-design-vue'
import { curry } from 'lodash'

type TipsStatus = 'success' | 'error' | 'warning' | 'info'

const tipsMap = {
	success: '成功',
	error: '错误',
	warning: '警告',
	info: '提示'
}

/** 提示信息优化 */
const notificationTips = (status: TipsStatus, description: string) => {
	notification[status]({
		message: tipsMap[status],
		description,
	})
}
const curryTips = curry(notificationTips)
export const successTips = curryTips('success')
export const errorTips = curryTips('error')
export const warningTips = curryTips('warning')
export const infoTips = curryTips('info')