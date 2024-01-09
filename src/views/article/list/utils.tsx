/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-12 11:18:52
 */

import { Article } from '@/api/article'
import { categoryFilter, tagFilter } from '@/filter'
import { ATableColumnProp } from '@/interface'
import { isEmpty, isNil, map, split } from 'lodash'

export const readTypeList = [
	{ value: 0, label: '无需验证', color: 'processing' },
	{ value: 1, label: '评论阅读', color: 'default' },
	{ value: 2, label: '点赞阅读', color: 'warning' },
	{ value: 3, label: '扫码阅读', color: 'success' },
]

export const publishList = [
	{ value: 0, label: '下架', color: 'error' },
	{ value: 1, label: '发布', color: 'success' },
	{ value: 2, label: '待审批', color: 'processing' },
	{ value: 3, label: '草稿', color: 'warning' },
]

export const columns = [
	{
		title: '文章封面',
		key: 'avatar',
		align: 'center',
	},
	{
		title: '文章名称',
		dataIndex: 'title',
		key: 'title',
		align: 'center',
	},
	{
		title: '文章作者',
		dataIndex: 'nickname',
		key: 'nickname',
		align: 'center',
	},
	{
		title: '类型',
		key: 'isOriginal',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			return (
				<a-tag color={record.isOriginal === 1 ? 'success' : 'warning'}>
					{record.isOriginal === 1 ? '原创' : '转载'}
				</a-tag>
			)
		},
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
			const tagList = split(record.tagIds, ',')
			return (
				<div>
					{map(tagList, (item) => {
						return <a-tag color="processing">{tagFilter(Number(item))}</a-tag>
					})}
				</div>
			)
		},
		align: 'center',
	},
	{
		title: '阅读方式',
		key: 'readType',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			return <a-tag color={readTypeList[record.readType ?? 0].color}>{readTypeList[record.readType ?? 0].label}</a-tag>
		},
		align: 'center',
	},
	{
		title: '状态',
		key: 'isPublish',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			return <a-tag color={publishList[record.isPublish ?? 3].color}>{publishList[record.isPublish ?? 3].label}</a-tag>
		},
		align: 'center',
	},
	{
		title: '创建时间',
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

export const rules = {
	title: [{ required: true, message: '必填字段不能为空', trigger: 'blur' }],
	summary: [{ required: true, message: '必填字段不能为空', trigger: 'blur' }],
	tags: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	categoryId: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	isStick: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	isPublish: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	readType: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	isOriginal: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	originalUrl: [{ required: true, message: '必填字段不能为空', trigger: 'blur' }],
	isRecommend: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
	isCarousel: [{ required: true, message: '必填字段不能为空', trigger: 'change' }],
}
