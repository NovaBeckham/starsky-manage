/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-07 17:53:54
 */

import { PropType, defineComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isNil } from 'lodash'

const Props = {
	menuInfo: Object as PropType<RouteRecordRaw>,
} as const

const SidebarItem = defineComponent({
	props: Props,
	name: 'Aside',
	setup(props) {
		return () => {
			if (isNil(props.menuInfo)) {
				return null
			}
			return props.menuInfo.meta?.alwaysShow ? (
				<a-sub-menu key={props.menuInfo.path} v-slots={{ title: () => <span>{props.menuInfo?.meta?.title}</span> } }>
					{isNil(props.menuInfo.children)
						? null
						: props.menuInfo.children.map((item) => {
								return item.children ? (
									<SidebarItem key={item.path} menuInfo={item as any} />
								) : item.meta?.alwaysShow ? (
									<a-menu-item key={item.path}>
										<span>{item.meta.title}</span>
									</a-menu-item>
								) : null
						  })}
				</a-sub-menu>
			) : null
		}
	},
})

export default SidebarItem
