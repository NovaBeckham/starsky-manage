/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-27 15:39:54
 */

export const asyncRoutes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home/index'),
		meta: {
			keepAlive: true,
			title: 'home',
		},
	},
	{
		path: '/user/userList',
		name: 'user',
		component: () => import('@/views/User/index.vue'),
		meta: {
			keepAlive: true,
			title: '用户列表',
		},
	},
]
