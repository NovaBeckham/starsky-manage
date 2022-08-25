/*
 * @Description: Login
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Login',
	setup() {
		return () => (
			<div>
				<h1>Login</h1>
				<ElButton type="primary" onClick={() => console.log('Login')}>
					Login
				</ElButton>
			</div>
		)
	},
})
