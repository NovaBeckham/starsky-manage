/*
 * @Description: Home
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import imageUrl from '../../assets/image/img.jpg'
import $styles from './index.module.scss'

const username = localStorage.getItem('user')

const MyHeader = defineComponent({
	name: 'my-header',
	setup() {
		const $router = useRouter()
		const handleCommand = (command: 'user' | 'loginout') => {
			if (command === 'loginout') {
				localStorage.clear()
				$router.push('/login')
			}
		}
		return () => (
			<div class={$styles.header}>
				<div class={$styles.logo}>后台管理系统</div>
				<div class={$styles.headerRight}>
					<el-avatar class={$styles.avator} size={30} src={imageUrl} />
					<el-dropdown
						class={$styles.userName}
						onCommand={handleCommand}
						v-slots={{
							dropdown: () => (
								<el-dropdown-menu>
									<el-dropdown-item command="user">个人中心</el-dropdown-item>
									<el-dropdown-item divided command="loginout">
										退出登录
									</el-dropdown-item>
								</el-dropdown-menu>
							),
						}}
					>
						<span class={$styles.link}>{username}</span>
					</el-dropdown>
				</div>
			</div>
		)
	},
})

export default MyHeader
