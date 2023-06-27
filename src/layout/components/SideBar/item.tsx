import { isNil } from 'ramda'
import { PropType, defineComponent, toRefs } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const Props = {
	menuInfo: {
		type: Object as PropType<RouteRecordRaw>,
		required: true,
	},
} as const

const SidebarItem = defineComponent({
	props: Props,
	name: 'SideBarItem',
	setup(props) {
		const { menuInfo } = toRefs(props)

		return () => {
			if (isNil(menuInfo)) {
				return null
			}
			return menuInfo.value.meta?.alwaysShow ? null : (
				<a-sub-menu key={menuInfo.value.name} v-slots={{ title: () => <>{menuInfo.value.meta?.title}</> }}>
					{isNil(menuInfo.value?.children)
						? null
						: menuInfo.value.children.map((item) => {
								return item.children ? (
									<SidebarItem key={item.name as string} menuInfo={item as any} />
								) : item.meta?.alwaysShow ? null : (
									<a-menu-item key={item.name}>
										<router-link to={item.path}>
											<span>{item.meta?.title}</span>
										</router-link>
									</a-menu-item>
								)
						  })}
				</a-sub-menu>
			)
		}
	},
})

export default SidebarItem
