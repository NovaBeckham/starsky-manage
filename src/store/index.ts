/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 19:25:24
 */
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
	state: () => {
		return {
			counter: 0,
			name: 'william',
			isAdmin: true,
		}
	},
})
