/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-09 17:38:39
 */

import { defineComponent } from 'vue'
import SideBar from './components/SideBar'
import Content from './components/Content'

export default defineComponent({
	name: 'Layout',
	setup() {
		return () => (
			<a-layout class="app-wrapper">
				<a-layout-sider width={200}>
					<SideBar />
				</a-layout-sider>
				<a-layout>
					<div>
						<Content />
					</div>
				</a-layout>
			</a-layout>
		)
	},
})
