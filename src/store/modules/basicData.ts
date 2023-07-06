import { defineStore } from 'pinia'
import { isNil, map, throttle } from 'lodash'
import { getList } from '@/api/category'

const getCategoryListThrottled = throttle(getList, 500)

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
}

const useBasicDataStore = defineStore('basicDataStore', {
	state: () => {
		return {
			categoryList: [],
		} as BasicDataState
	},
	actions: {
		async getCategoryList() {
			const result = await getCategoryListThrottled()
			if (result) {
				const { success, data } = result
				if (success && !isNil(data)) {
					this.categoryList = map(data, (item) => {
						return {
							value: item.id,
							label: item.name,
						}
					})
				}
			}
		},
	},
})

export default useBasicDataStore
