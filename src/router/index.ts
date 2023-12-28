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
		name: 'Index',
		component: Layout,
		// component: () => import('@/views/home/index.vue'),
		meta: {
			// title: '文章管理',
			alwaysShow: true,
		},
		children: [
			{
				path: '',
				name: 'Home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '首页',
					alwaysShow: true,
				},
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			alwaysShow: false,
			title: '登录',
		},
	},
	{
		path: '/article',
		name: 'Article',
		component: Layout,
		redirect: '/article/list',
		meta: {
			title: '文章管理',
			alwaysShow: true,
		},
		children: [
			{
				path: '/article/list',
				name: 'ArticleList',
				component: () => import('@/views/article/list/index.vue'),
				meta: {
					title: '文章列表',
					alwaysShow: true,
				},
			},
			{
				path: '/article/tags',
				name: 'TagsList',
				component: () => import('@/views/article/tags/index.vue'),
				meta: {
					title: '标签列表',
					alwaysShow: true,
				},
			},
		],
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes: constantRoutes,
})
