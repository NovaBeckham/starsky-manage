/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './styles/main.scss'
import './styles/dark.scss'

export default defineComponent({
	name: 'App',
	render() {
		return <RouterView />
	},
})
