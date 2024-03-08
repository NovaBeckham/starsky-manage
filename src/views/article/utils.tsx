/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-12 11:18:52
 */

import { Article } from '@/api/article'
import { categoryFilter, tagFilter } from '@/filter'
import { ATableColumnProp } from '@/interface'
import { isEmpty, isNil, map, subtract } from 'lodash'

const articleType = [
	{ tagType: 'error', name: '原创' },
	{ tagType: 'success', name: '转载' },
	{ tagType: 'processing', name: '翻译' },
]

export const columns = [
	{
		title: '文章封面',
		key: 'articleCover',
		align: 'center',
	},
	{
		title: '标题',
		dataIndex: 'articleTitle',
		key: 'articleTitle',
		align: 'center',
	},
	{
		title: '分类',
		key: 'categoryId',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			return <a-tag color="warning">{categoryFilter(record.categoryId as number)}</a-tag>
		},
		align: 'center',
	},
	{
		title: '标签',
		key: 'tagIds',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			if (isNil(record.tagIds) || isEmpty(record.tagIds)) {
				return null
			}
			return (
				<div>
					{map(record.tagIds, (item) => {
						return <a-tag color="processing">{tagFilter(Number(item))}</a-tag>
					})}
				</div>
			)
		},
		align: 'center',
	},
	{
		title: '浏览量',
		key: 'viewsCount',
		customRender: ({ record }: ATableColumnProp<Article>) => record.viewsCount ?? 0,
		align: 'center',
	},
	{
		title: '类型',
		key: 'type',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			return (
				<a-tag color={articleType[subtract(record.type ?? 1, 1)].tagType}>
					{articleType[subtract(record.type ?? 1, 1)].name}
				</a-tag>
			)
		},
		align: 'center',
	},
	{
		title: '发表时间',
		key: 'createTime',
		dataIndex: 'createTime',
		align: 'center',
	},
	{
		title: '置顶',
		key: 'isTop',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			return (
				<a-switch
					v-model={[record.isTop, 'checked']}
					checkedValue={1}
					unCheckedValue={0}
					disabled={record.isDelete === 1}
				/>
			)
		},
		align: 'center',
	},
	{
		title: '推荐',
		key: 'isFeatured',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			return (
				<a-switch
					v-model={[record.isFeatured, 'checked']}
					checkedValue={1}
					unCheckedValue={0}
					disabled={record.isDelete === 1}
				/>
			)
		},
		align: 'center',
	},
	{
		title: '操作',
		key: 'action',
		align: 'center',
	},
]

export const rules = {
	articleTitle: [{ required: true, message: '必填字段不能为空', trigger: 'blur' }],
	tagIds: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	categoryId: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	isTop: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	status: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	isFeatured: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
}
