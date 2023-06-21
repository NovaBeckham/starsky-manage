/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-09 17:38:39
 */

import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
	name: 'Layout',
	setup() {
		return () => (
			<a-layout style={{ height: '100%' }}>
				{/* <MyHeader />
				<a-layout>
					<MySidebar />
					<a-layout-content>
						<RouterView />
					</a-layout-content>
				</a-layout> */}
				<RouterView />
			</a-layout>
		)
	},
})
