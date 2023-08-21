/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-09 17:38:39
 */

import { defineComponent } from 'vue'
import SideBar from './components/SideBar'
import Content from './components/Content'
import Header from './components/Header'

export default defineComponent({
	name: 'Layout',
	setup() {
		return () => (
			<a-layout class="app-wrapper">
				<SideBar />
				<a-layout>
					<Header />
					<Content />
				</a-layout>
			</a-layout>
		)
	},
})
