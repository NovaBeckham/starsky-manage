/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-25 15:58:21
 */

import { logout } from '@/api/login'
import { UserInfo, getInfo } from '@/api/user'
import { isNil } from 'lodash'
import { defineStore } from 'pinia'

interface UserState {
	hasGetInfo: boolean
	userInfo: UserInfo
}

const useUserStore = defineStore('useUserStore', {
	state: (): UserState => ({
		hasGetInfo: false,
		userInfo: {},
	}),
	actions: {
		async LogOut() {
			const { success } = await logout()
			if (success) {
				this.userInfo = {}
				localStorage.removeItem('xingToken')
				localStorage.removeItem('user')
			}
		},

		setGetInfo(hasGetInfo: boolean) {
			this.hasGetInfo = hasGetInfo
		},

		async getUserInfo() {
			const { success, data } = await getInfo()
			if (success && !isNil(data)) {
				this.userInfo = data
			}
		}
	},
})

export default useUserStore
