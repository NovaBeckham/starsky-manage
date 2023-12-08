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
import { Menu, MenuItem } from 'ant-design-vue'
import $styles from './index.module.scss'

export default defineComponent({
	setup() {
		const $route = useRoute()
		const $router = useRouter()
		function alwaysShow(data: RouteRecordRaw) {
			if (data.meta?.alwaysShow) {
				if (data.children) {
					return (
						<MenuItem key={data.path}>
							<span>{data.children[0].meta?.title}</span>
						</MenuItem>
					)
				}
			}
			return null
		}
		const handleMenuClick = (menuProp: any) => {
			$router.push(menuProp.key)
		}
		const selectedKeys = computed(() => {
			return map($route.matched, (item) => item.name)
		})
		const defaultOpenKeys = map($route.matched, (item) => item.name)
		return () => (
			<Menu
				mode="inline"
				selectedKeys={selectedKeys.value as any}
				openKeys={defaultOpenKeys as any}
				class={$styles.sideNavBar}
				onClick={handleMenuClick}
			>
				{map(constantRoutes, (item) =>
					item.children && !isNil(item.meta?.title) ? <SidebarItem key={item.name} menuInfo={item} /> : alwaysShow(item)
				)}
			</Menu>
		)
	},
})
