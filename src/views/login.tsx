/*
 * @Description: Login
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import service from '@/utils/https'
import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Login',
	setup() {
		const login = () => {
			service.post('/api/login', {
				username: 'heyuxin',
				password: 'admin5698',
			}).then((res) => {
				console.log(res)
			})
		}
		return () => (
			<div>
				<h1>Login</h1>
				<ElButton type="primary" onClick={login}>
					Login
				</ElButton>
			</div>
		)
	},
})
