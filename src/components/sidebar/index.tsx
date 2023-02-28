/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-09 15:22:08
 */

import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import $styles from './index.module.scss'

const MySidebar = defineComponent({
	name: 'my-sidebar',
	setup() {
		const $route = useRoute()
		const onRoutes = computed(() => {
			return $route.path
		})
		return () => (
			<div class={$styles.sidebar}>
				<el-menu
					class={$styles.menu}
					defaultActive={onRoutes.value}
					backgroundColor="#324157"
					textColor="#bfcbd9"
					activeTextColor="#20a0ff"
					uniqueOpened
					router
				>
					<el-menu-item index="/" key="/" v-slots={{ title: () => '首页' }} />
					<el-menu-item index="user" v-slots={{ title: () => '用户' }} />
					<el-menu-item index="article" v-slots={{ title: () => '文章' }} />
					<el-menu-item index="tags" v-slots={{ title: () => '标签' }} />
				</el-menu>
			</div>
		)
	},
})

export default MySidebar
