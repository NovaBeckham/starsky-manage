/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-09 17:38:39
 */
import MyHeader from '@/components/header'
import MySidebar from '@/components/sidebar'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
	name: 'Layout',
	setup() {
		return () => (
			<div>
				<MyHeader />
				<MySidebar />
				<div class="content-box">
					<div class="content">
						<RouterView />
					</div>
				</div>
			</div>
		)
	},
})
