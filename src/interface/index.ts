/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-05 17:07:24
 */

export interface Options {
	value: string | number
	label: string | number
}

export interface Files {
	name: string
	url: string
}

export interface ColumnProp {
	key: string
}

export interface ATableColumnProp<T = any> {
	text: T
	record: T
	index: number
	column: ColumnProp
}

/**
 * 结果返回接口
 */
export interface Result<T> {
	/**
	 * 返回状态
	 */
	flag: boolean
	/**
	 * 状态码
	 */
	code: number
	/**
	 * 返回信息
	 */
	msg: string
	/**
	 * 返回数据
	 */
	data?: T
}

/**
 * 分页参数
 */
export interface PageQuery {
	/**
	 * 当前页
	 */
	current?: number
	/**
	 * 每页大小
	 */
	size?: number
	/** 是否删除状态 */
	isDelete?: number
}

/**
 * 分页返回接口
 */
export interface PageResult<T> {
	/**
	 * 分页结果
	 */
	records?: T
	/**
	 * 总数
	 */
	total?: number
	/**
	 * 当前页数
	 */
	current?: number
	/**
	 * 每页个数
	 */
	size?: number
}

export type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
	[key in Key]: Value
}
