/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-25 15:58:21
 */

import { logout } from '@/api/login'
import { UserInfo } from '@/api/user'
import { clone } from 'lodash'
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

		setUserInfo(data: UserInfo) {
			this.userInfo = clone(data)
		}
	},
})

export default useUserStore
