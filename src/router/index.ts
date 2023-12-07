/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 18:03:31
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home/index.vue'),
		meta: {
			alwaysShow: true,
			title: '首页',
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			alwaysShow: true,
			title: '登录',
		},
	},
	{
		path: '/article',
		name: 'Article',
		component: Layout,
		meta: {
			title: '文章管理',
		},
		children: [
			{
				path: '/article/list',
				name: 'ArticleList',
				component: () => import('@/views/article/list/index.vue'),
				meta: {
					title: '文章列表',
				},
			},
		],
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes: constantRoutes,
})
