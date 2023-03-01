/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-09 15:22:08
 */

import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface MenuProp {
	key: string
}

const MySidebar = defineComponent({
	name: 'my-sidebar',
	setup() {
		const $route = useRoute()
		const $router = useRouter()
		const onRoutes = ref<string[]>([$route.path])
		const menuClick = (data: MenuProp) => {
			$router.push(data.key)
		}
		return () => (
			<a-layout-sider width="250">
				<a-menu mode="inline" v-model={[onRoutes.value, 'selectedKeys']} theme="dark" onClick={menuClick}>
					<a-menu-item key="/home">首页</a-menu-item>
					<a-menu-item key="/user">用户</a-menu-item>
					<a-menu-item key="/article">文章</a-menu-item>
				</a-menu>
			</a-layout-sider>
		)
	},
})

export default MySidebar
