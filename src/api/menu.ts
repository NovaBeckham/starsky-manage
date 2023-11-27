/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-27 15:50:33
 */

export interface Menu {
	id?: number
	name: string
	path: string
	component: string
	icon: string
	createTime?: string
	updateTime?: string
	orderNum: number
	parentId?: number
	isHidden?: number
	children?: Menu[]
}
