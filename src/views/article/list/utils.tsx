/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-12 11:18:52
 */

import { Article } from '@/api/article'
import { ATableColumnProp } from '@/interface'
import { isEmpty, isNil, map, split } from 'lodash'

const readTypeStyle = ['processing', 'default', 'warning', 'success']

const readTypeList = ['无需验证', '评论阅读', '点赞阅读', '扫码阅读']

const publishList = [
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
				<a-tag color={record.isOriginal === 1 ? 'success' : 'warning'}>{record.isOriginal === 1 ? '原创' : '转载'}</a-tag>
			)
		},
		align: 'center',
	},
	{
		title: '分类',
		key: 'categoryName',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			return <a-tag color="warning">{record.categoryName}</a-tag>
		},
		align: 'center',
	},
	{
		title: '标签',
		key: 'tagNames',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			if (isNil(record.tagNames) || isEmpty(record.tagNames)) {
				return null
			}
			const tagList = split(record.tagNames, ',')
			return map(tagList, (item) => {
				return <a-tag color="processing">{item}</a-tag>
			})
		},
		align: 'center',
	},
	{
		title: '阅读方式',
		key: 'readType',
		customRender: ({ record }: ATableColumnProp<Article>) => {
			return <a-tag color={readTypeStyle[record.readType ?? 0]}>{readTypeList[record.readType ?? 0]}</a-tag>
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
