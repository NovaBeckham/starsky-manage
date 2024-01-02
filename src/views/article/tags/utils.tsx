/*
 * @Description: 
 * @Author: hyx
 * @Date: 2023-12-22 11:20:00
 */

import { Tags } from "@/api/tag"
import { ATableColumnProp } from "@/interface"

export const columns = [
	{
		title: '标签名',
		dataIndex: 'name',
		key: 'name',
		align: 'center',
	},
	{
		title: '文章量',
		dataIndex: 'articleCount',
		key: 'articleCount',
		align: 'center',
	},
	{
		title: '排序',
		key: 'sort',
		customRender: ({ record }: ATableColumnProp<Tags>) => {
			return (
				<a-tag color="warning">{record.sort}</a-tag>
			)
		},
		align: 'center',
	},
	{
		title: '点击量',
		key: 'clickVolume',
		customRender: ({ record }: ATableColumnProp<Tags>) => {
			return (
				<a-tag color="warning">{record.clickVolume}</a-tag>
			)
		},
		align: 'center',
	},
	{
		title: '添加时间',
		key: 'createTime',
		dataIndex: 'createTime',
		align: 'center',
	},
	{
		title: '操作',
		key: 'action',
		align: 'center',
	},
]