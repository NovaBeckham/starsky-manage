/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-13 16:00:17
 */

import { defineStore } from 'pinia'
// import { isNil, map, throttle } from 'lodash'
// import { getList as categoryListRequest } from '@/api/category'
// import { getList as tagListRequest } from '@/api/tag'

// const getCategoryListThrottled = throttle(categoryListRequest, 1000)
// const getTagListThrottled = throttle(tagListRequest, 100)

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
		// async getCategoryList() {
		// 	const result = await getCategoryListThrottled()
		// 	if (result) {
		// 		const { success, data } = result
		// 		if (success && !isNil(data)) {
		// 			this.categoryList = map(data, (item) => {
		// 				return {
		// 					value: item.id,
		// 					label: item.categoryName,
		// 				}
		// 			})
		// 		}
		// 	}
		// },
		// async getTagList() {
		// 	const result = await getTagListThrottled()
		// 	if (result) {
		// 		const { success, data } = result
		// 		if (success && !isNil(data)) {
		// 			this.tagList = map(data, (item) => {
		// 				return {
		// 					value: item.id as number,
		// 					label: item.tagName ?? '',
		// 				}
		// 			})
		// 		}
		// 	}
		// }
	},
})

export default useBasicDataStore
