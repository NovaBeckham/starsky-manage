/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-07 17:53:54
 */

import { PropType, defineComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isNil } from 'lodash'
import { MenuItem, SubMenu } from 'ant-design-vue'

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
				<SubMenu key={props.menuInfo.name} v-slots={{ title: () => <span>{props.menuInfo?.meta?.title}</span> } }>
					{isNil(props.menuInfo.children)
						? null
						: props.menuInfo.children.map((item) => {
								return item.children ? (
									<SidebarItem key={item.name as string} menuInfo={item as any} />
								) : item.meta?.alwaysShow ? (
									<MenuItem key={item.name}>
										<span>{item.meta.title}</span>
									</MenuItem>
								) : null
						  })}
				</SubMenu>
			) : null
		}
	},
})

export default SidebarItem
