/*
 * @Description: 
 * @Author: hyx
 * @Date: 2023-12-22 11:20:00
 */

import { Tags } from "@/api/tag"
import { ATableColumnProp } from "@/interface"
import dayjs from "dayjs"

export const columns = [
	{
		title: '标签名',
		key: 'tagName',
		align: 'center',
		customRender: ({ record }: ATableColumnProp<Tags>) => {
			return (
				<a-tag color="processing">{record.tagName}</a-tag>
			)
		},
	},
	{
		title: '文章量',
		dataIndex: 'articleCount',
		key: 'articleCount',
		align: 'center',
	},
	{
		title: '创建时间',
		key: 'createTime',
		customRender: ({ record }: ATableColumnProp<Tags>) => dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
		align: 'center',
	},
	{
		title: '操作',
		key: 'action',
		align: 'center',
	},
]