/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-10 15:42:45
 */

import { ElNotification } from 'element-plus'
import { curry } from 'lodash'

type TipsStatus = 'success' | 'error' | 'warning' | 'info'

const tipsMap = {
	success: '成功',
	error: '错误',
	warning: '警告',
	info: '提示'
}

/** 提示信息优化 */
const notificationTips = (type: TipsStatus, message: string) => {
	ElNotification({ title: tipsMap[type], message, type })
}
const curryTips = curry(notificationTips)
export const successTips = curryTips('success')
export const errorTips = curryTips('error')
export const warningTips = curryTips('warning')
export const infoTips = curryTips('info')