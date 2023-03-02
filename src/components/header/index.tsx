/*
 * @Description: Home
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import imageUrl from '../../assets/image/img.jpg'
import $styles from './index.module.scss'

const MyHeader = defineComponent({
	name: 'my-header',
	setup() {
		const $router = useRouter()
		const username = localStorage.getItem('user')

		return () => (
			<a-layout-header class={$styles.header}>
				<div class={$styles.logo}>BLOG</div>
				<div class={$styles.headerRight}>
					<a-avatar class={$styles.avator} size={30} src={imageUrl} />
					<a-dropdown
						class={$styles.dropdown}
						v-slots={{
							overlay: () => (
								<a-menu>
									<a-menu-item key="user">
										个人中心
									</a-menu-item>
									<a-menu-item
										key="loginout"
										onClick={() => {
											localStorage.clear()
											$router.push('/login')
										}}
									>
										退出登录
									</a-menu-item>
								</a-menu>
							),
						}}
					>
						<a>{username}</a>
					</a-dropdown>
				</div>
			</a-layout-header>
		)
	},
})

export default MyHeader
