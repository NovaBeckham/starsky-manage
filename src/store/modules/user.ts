import { logout } from '@/api/login'
import { defineStore } from 'pinia'

interface UserState {
	id?: number
}

const useUserStore = defineStore('useUserStore', {
	state: (): UserState => ({
		id: undefined,
	}),
	actions: {
		async LogOut() {
			const { success } = await logout()
			if (success) {
				this.id = undefined
				localStorage.removeItem('starskyToken')
			}
		},
	},
})

export default useUserStore
