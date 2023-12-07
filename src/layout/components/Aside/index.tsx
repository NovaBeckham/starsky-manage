/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-07 19:08:24
 */

import { constantRoutes } from '@/router'
import { map } from 'lodash'
import { computed, defineComponent } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import SidebarItem from './item'
import { Menu, MenuItem } from 'ant-design-vue'
import $styles from './index.module.scss'

export default defineComponent({
	setup() {
		const $route = useRoute()
		function alwaysShow(data: RouteRecordRaw) {
			if (data.meta?.alwaysShow) {
				return (
					<MenuItem key={data.name}>
						<span>{data.meta?.title}</span>
					</MenuItem>
				)
			}
			return null
		}
		const selectedKeys = computed(() => {
			return map($route.matched, (item) => item.name)
		})
		const defaultOpenKeys = map($route.matched, (item) => item.name)
		return () => (
			<Menu mode="inline" selectedKeys={selectedKeys.value as any} openKeys={defaultOpenKeys as any} class={$styles.sideNavBar}>
				{map(constantRoutes, (item) =>
					item.children ? <SidebarItem key={item.name} menuInfo={item} /> : alwaysShow(item)
				)}
			</Menu>
		)
	},
})
