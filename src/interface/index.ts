/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-05 17:07:24
 */

export interface Options {
	value: string | number
	label: string | number
}

export interface ColumnProp {
	key: string
}

export interface ATableColumnProp<T extends any> {
	text: string | number
	record: T
	index: number
	column: ColumnProp
}
