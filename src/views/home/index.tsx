/*
 * @Description: Home
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import MyHeader from '@/components/header'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Home',
	setup() {
		return () => (
			<div>
				<MyHeader />
				<h1>Home</h1>
			</div>
		)
	},
})
