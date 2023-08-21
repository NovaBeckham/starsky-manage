/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-08-21 16:21:20
 */

import { UserOutlined } from '@ant-design/icons-vue'
import { map } from 'lodash'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

interface BreadcrumbProps {
	route: { breadcrumbName: string; path: string }
}

export default defineComponent({
	name: 'Header',
	setup() {
		const $route = useRoute()
		const computeCount = computed(() => {
			return {
				breadcrumbItem: map($route.matched, (item) => ({
					breadcrumbName: item.meta.title,
					path: item.redirect ? item.redirect : item.path,
				})),
			}
		})
		const handleMenu = ({ key }: { key: string }) => {
			switch (key) {
				case 'Home':
					location.href = '/'
					break
				case 'Center':
					console.log('个人中心')
					break
				case 'Logout':
					localStorage.clear()
					break
			}
		}
		return () => (
			<a-layout-header style={{ paddingInline: '0' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div>
						<a-page-header
							style={{ backgroundColor: 'rgb(0, 21, 41)' }}
							breadcrumb={{
								routes: computeCount.value.breadcrumbItem,
								itemRender: ({ route }: BreadcrumbProps) => <span>{route.breadcrumbName}</span>,
							}}
						/>
					</div>
					<a-dropdown
						v-slots={{
							overlay: () => (
								<a-menu onClick={handleMenu}>
									<a-menu-item key="Home">首页</a-menu-item>
									<a-menu-item key="Center">个人中心</a-menu-item>
									<a-menu-item key="Logout">退出登录</a-menu-item>
								</a-menu>
							),
						}}
					>
						<a class="admin-top-av" onClick={(e: MouseEvent) => e.preventDefault()}>
							<a-avatar size={32} v-slots={{ icon: () => <UserOutlined /> }} style={{ backgroundColor: '#1890ff' }} />
							管理员
						</a>
					</a-dropdown>
				</div>
			</a-layout-header>
		)
	},
})
