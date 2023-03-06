/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 18:03:31
 */

import Layout from '@/layout'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由配置 和以前一样
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Layout,
		name: 'index',
		redirect: '/home',
		children: [
			{
				path: '/home',
				component: () => import('@/views/home'),
				meta: { title: '首页', alwaysShow: true },
				name: 'Home',
			},
			{
				path: '/user',
				component: () => import('@/views/user'),
				meta: { title: '用户', alwaysShow: true },
				name: 'User',
			},
			{
				path: '/article',
				component: () => import('@/views/article'),
				meta: { title: '文章', alwaysShow: true },
				name: 'Article',
			},
			{
				path: '/category',
				component: () => import('@/views/category'),
				meta: { title: '分类', alwaysShow: true },
				name: 'Category',
			},
			{
				path: '/details/',
				component: () => import('@/views/articleDetails'),
				meta: { title: '添加文章', alwaysShow: true },
				name: 'ArticleDetails',
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		meta: {
			title: 'login',
		},
		component: () => import('@/views/login'),
	},
	{
		path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
		name: 'NotFind',
		component: () => import('@/views/404'),
	},
]

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
const router = createRouter({
	history: createWebHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
	routes,
})

router.beforeEach((to, from, next) => {
	const starToken = localStorage.getItem('starToken')
	if (!starToken && to.path !== '/login') {
		next('/login')
	} else {
		next()
	}
})

export default router
