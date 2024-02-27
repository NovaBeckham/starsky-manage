/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-29 11:17:02
 */

import { Category } from '@/api/category'
import { ATableColumnProp } from '@/interface'
import dayjs from 'dayjs'

export const columns = [
	{
		title: '分类名',
		dataIndex: 'categoryName',
		key: 'categoryName',
		align: 'center',
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
		customRender: ({ record }: ATableColumnProp<Category>) => dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
		align: 'center',
	},
	{
		title: '操作',
		key: 'action',
		align: 'center',
	},
]
