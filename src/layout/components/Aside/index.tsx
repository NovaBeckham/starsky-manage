/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-07 19:08:24
 */

import { constantRoutes } from '@/router'
import { isNil, map } from 'lodash'
import { computed, defineComponent } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import SidebarItem from './item'

export default defineComponent({
	setup() {
		const $route = useRoute()
		const $router = useRouter()
		function alwaysShow(data: RouteRecordRaw) {
			if (data.meta?.alwaysShow) {
				if (data.children) {
					return (
						<a-menu-item key={data.path}>
							<span>{data.children[0].meta?.title}</span>
						</a-menu-item>
					)
				}
			}
			return null
		}
		const handleMenuClick = (menuProp: any) => {
			$router.push(menuProp.key)
		}
		const selectedKeys = computed(() => {
			return map($route.matched, (item) => item.path)
		})
		const defaultOpenKeys = map($route.matched, (item) => item.path)
		return () => (
			<a-menu
				mode="inline"
				selectedKeys={selectedKeys.value}
				openKeys={defaultOpenKeys}
				onClick={handleMenuClick}
				theme="dark"
			>
				{map(constantRoutes, (item) =>
					item.children && !isNil(item.meta?.title) ? <SidebarItem key={item.path} menuInfo={item} /> : alwaysShow(item)
				)}
			</a-menu>
		)
	},
})
