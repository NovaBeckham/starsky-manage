import { constantRoutes } from '@/router'
import { map } from 'ramda'
import { computed, defineComponent } from 'vue'
import { RouteRecordRaw, RouterLink, useRoute } from 'vue-router'
import SideBarItem from './item'

export default defineComponent({
	name: 'SideBar',
	setup() {
		const route = useRoute()
		function alwaysShow(data: RouteRecordRaw) {
			if (data.meta?.alwaysShow) {
				return null
			}
			return (
				<a-menu-item key={data.name}>
					<span>{data.meta?.title}</span>
				</a-menu-item>
			)
		}
		const selectedKeys = computed(() => {
			return map((item) => item.name, route.matched)
		})
		return () => (
			<div>
				<div class="sidebar-title">
					<h1>博客后台管理系统</h1>
				</div>
				<a-menu mode="inline" selectedKeys={selectedKeys.value}>
					{map(
						(item) => (item.children ? <SideBarItem key={item.name} menuInfo={item} /> : alwaysShow(item)),
						constantRoutes
					)}
				</a-menu>
			</div>
		)
	},
})
