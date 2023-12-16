/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-25 15:58:21
 */

import { logout } from '@/api/login'
import { UserInfo, getUserInfo } from '@/api/user'
import { clone, isNil } from 'lodash'
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
			const { flag } = await logout()
			if (flag) {
				this.userInfo = {}
				localStorage.removeItem('xingToken')
				localStorage.removeItem('user')
			}
		},

		async getInfo() {
			const { flag, data } = await getUserInfo()
			if (flag && !isNil(data)) {
				this.userInfo = data
			}
		}
	},
})

export default useUserStore
