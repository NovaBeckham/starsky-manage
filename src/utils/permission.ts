/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-11-27 11:18:41
 */

import { Router } from 'vue-router'

export default function (router: Router) {
	router.beforeEach(async (to, form, next) => {
		document.title = (to.meta.title ? to.meta.title : '') + '~'
		const token = localStorage.getItem('xingToken')
		if (!token) {
			if (to.path === '/login') {
				next()
			} else {
				next({ path: '/login' })
			}
		} else {
			if (to.path === '/login') {
				next({ path: '/' })
			} else {
				next()
			}
		}
	})
}
