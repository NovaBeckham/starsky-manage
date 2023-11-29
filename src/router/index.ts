/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 18:03:31
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from './asyncRoutes'
import { Menu } from '@/api/menu'

const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'admin',
		component: () => import('@/layout/index.vue'),
		meta: {
			keepAlive: false,
			title: '首页',
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login/index.vue'),
		meta: {
			keepAlive: false,
			title: '登录页',
		},
	},
	{
		path: '/:catchAll(.*)',
		name: '404',
		component: () => import('@/views/404/index'),
	},
]

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
export const router = createRouter({
	history: createWebHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
	routes: constantRoutes,
})

/** 定义动态添加路由方法 */
export const addRoutes = (menus?: Menu[]) => {
	/** 是否有新路由 */
	let hasNewRoutes = false
	const findAndAddRoutesByMenus = (arr?: Menu[]) => {
		arr?.forEach((val: Menu) => {
			const item = asyncRoutes.find((res: RouteRecordRaw) => val.path === res.path)
			if (item && !router.hasRoute(item.name)) {
				router.addRoute('admin', item)
				hasNewRoutes = true
			}
			if (val.children && val.children.length > 0) {
				findAndAddRoutesByMenus(val.children)
			}
		})
	}
	findAndAddRoutesByMenus(menus)
	return hasNewRoutes
}
