/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-07 19:08:24
 */

import { constantRoutes } from '@/router'
import { isNil, map } from 'lodash'
import { defineComponent } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import SidebarItem from './item'
import $styles from './index.module.scss'
import 'element-plus/es/components/menu/style/css'
import 'element-plus/es/components/scrollbar/style/css'
import { ElMenu, ElMenuItem, ElScrollbar } from 'element-plus'

export default defineComponent({
	setup() {
		const $route = useRoute()
		// const $router = useRouter()
		function alwaysShow(data: RouteRecordRaw) {
			if (data.meta?.alwaysShow) {
				if (data.children) {
					return (
						<ElMenuItem index={data.path}>
							<span>{data.children[0].meta?.title}</span>
						</ElMenuItem>
					)
				}
			}
			return null
		}
		// const handleMenuClick = (menuProp: any) => {
		// 	$router.push(menuProp.key)
		// }
		return () => (
			<ElScrollbar class="theme-dark">
				<ElMenu
					defaultActive={$route.path}
					class={$styles.sideNavBar}
					backgroundColor="#304156"
					textColor="#bfcbd9"
					activeTextColor="#409EFF"
					router
				>
					{map(constantRoutes, (item) =>
						item.children && !isNil(item.meta?.title) ? (
							<SidebarItem key={item.name} menuInfo={item} />
						) : (
							alwaysShow(item)
						)
					)}
				</ElMenu>
			</ElScrollbar>
		)
	},
})
