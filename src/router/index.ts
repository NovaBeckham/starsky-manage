/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 18:03:31
 */

import Layout from '@/layout'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Layout,
		redirect: '/home',
		name: 'Blog',
		meta: {
			title: '博客信息',
		},
		children: [
			{
				path: '/home',
				component: () => import('@/views/home'),
				meta: { title: '首页' },
				name: 'Home',
			},
			{
				path: '/article',
				component: () => import('@/views/blog/article'),
				meta: { title: '文章列表' },
				name: 'Article',
			},
			{
				path: '/category',
				component: () => import('@/views/blog/category'),
				meta: { title: '分类列表' },
				name: 'Category',
			},
			{
				path: '/tag',
				component: () => import('@/views/blog/tag'),
				meta: { title: '标签列表' },
				name: 'Tag',
			},
			{
				path: '/details',
				component: () => import('@/views/blog/details'),
				meta: { title: '文章详情' },
				name: 'ArticleDetails',
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		meta: {
			title: '登录',
			alwaysShow: true,
		},
		component: () => import('@/views/login'),
	}
]

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
const router = createRouter({
	history: createWebHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
	routes: constantRoutes,
})

router.beforeEach((to, from, next) => {
	const starToken = localStorage.getItem('starskyToken')
	if (!starToken && to.path !== '/login') {
		next('/login')
	} else {
		next()
	}
})

export default router
