/*
 * @Description: 防抖函数
 * @Author: hyx
 * @Date: 2024-01-09 11:18:21
 */

export interface DebouncedFunc<T extends (...args: any[]) => any> {
	(...args: Parameters<T>): ReturnType<T> | undefined
}

/**
 * 函数防抖
 * @param func 要防抖的函数
 * @param wait 防抖时间 默认500ms
 */
export default function debounce<T extends (...args: any) => any>(func: T, wait = 500): DebouncedFunc<T> {
	let timeoutId: ReturnType<typeof setTimeout> | undefined
	return function (this: void, ...args: Array<any>) {
		if (timeoutId) {
			clearTimeout(timeoutId)
			return {}
		}
		timeoutId = setTimeout(() => {
			func.apply(this, args)
		}, wait)
		return func.apply(this, args)
	}
}
