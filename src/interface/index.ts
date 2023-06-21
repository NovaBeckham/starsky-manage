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

/**
 * 结果返回接口
 */
export interface Result<T> {
  /**
   * 返回状态
   */
  success: boolean;
  /**
   * 状态码
   */
  code: number;
  /**
   * 返回信息
   */
  msg: string;
  /**
   * 返回数据
   */
  data: T;
}
