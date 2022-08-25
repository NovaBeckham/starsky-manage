/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 18:03:31
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 路由配置 和以前一样
const routes: RouteRecordRaw[] = [
	{
		path: '/home',
		name: 'Home',
		meta: {
			title: 'home',
		},
		component: () => import('@/views/home'),
	},
	{
		path: '/',
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

export default router
