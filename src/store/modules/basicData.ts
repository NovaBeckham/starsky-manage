/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-13 16:00:17
 */

import { defineStore } from 'pinia'
import { isNil, map, throttle } from 'lodash'
import { getPage as categoryListRequest } from '@/api/category'
import { getList as tagListRequest } from '@/api/tag'

const getCategoryListThrottled = throttle(categoryListRequest, 100)
const getTagListThrottled = throttle(tagListRequest, 100)

export interface Options {
	value: string | number
	label: string
	type?: number
	title?: string
	[index: string]: any
	children?: Array<this>
	isLeaf?: boolean
	loading?: boolean
}

export interface BasicDataState {
	categoryList: Array<Options>
	tagList: Array<Options>
}

const useBasicDataStore = defineStore('basicDataStore', {
	state: () => {
		return {
			categoryList: [],
			tagList: [],
		} as BasicDataState
	},
	actions: {
		async getCategoryList() {
			const result = await getCategoryListThrottled({ current: 1, size: 9999 })
			if (result) {
				const { flag, data } = result
				if (flag && !isNil(data) && !isNil(data.records)) {
					this.categoryList = map(data.records, (item) => {
						return {
							value: item.id as number,
							label: item.name ?? '',
						}
					})
				}
			}
		},
		async getTagList() {
			const result = await getTagListThrottled({ current: 1, size: 9999 })
			if (result) {
				const { flag, data } = result
				if (flag && !isNil(data) && !isNil(data.records)) {
					this.tagList = map(data.records, (item) => {
						return {
							value: item.id as number,
							label: item.name ?? '',
						}
					})
				}
			}
		}
	},
})

export default useBasicDataStore
