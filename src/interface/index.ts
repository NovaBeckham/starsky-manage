/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-05 17:07:24
 */

export interface Options {
	value: string | number
	label: string | number
}

export interface ElTableColumnProp<T extends any> {
	row: T
	columns: any
	$index: number
}
