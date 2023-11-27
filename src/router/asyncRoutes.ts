/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-27 15:39:54
 */

export const asyncRoutes = [
	{
		path: '/',
		name: '首页',
		component: () => import('@/views/index.vue'),
		meta: {
			keepAlive: true,
			title: '首页',
		},
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/Home/index.vue'),
		meta: {
			keepAlive: true,
			title: 'home',
		},
	},
	{
		path: '/user/userList',
		name: 'userinfo',
		component: () => import('@/views/User/index.vue'),
		meta: {
			keepAlive: true,
			title: '用户列表',
		},
	},
]
