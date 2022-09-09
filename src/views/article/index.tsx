/*
 * @Description: Article
 * @Author: hyx
 * @Date: 2022-09-09 15:59:22
 */

import MyHeader from '@/components/header'
import MySidebar from '@/components/sidebar'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Article',
	setup() {
		return () => (
			<div>
				<MyHeader />
				<MySidebar />
				<h1>Article</h1>
			</div>
		)
	},
})
