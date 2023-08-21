import { constantRoutes } from '@/router'
import { map } from 'lodash'
import { computed, defineComponent } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
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
			return map(route.matched, (item) => item.name)
		})
		return () => (
			<a-layout-sider width={200}>
				<div>
					<div class="sidebar-title">
						<div>博客后台管理系统</div>
					</div>
					<a-menu mode="inline" selectedKeys={selectedKeys.value}>
						{map(constantRoutes, (item) =>
							item.children ? <SideBarItem key={item.name} menuInfo={item} /> : alwaysShow(item)
						)}
					</a-menu>
				</div>
			</a-layout-sider>
		)
	},
})
