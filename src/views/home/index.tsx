/*
 * @Description: Home
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { defineComponent } from 'vue'
import $styles from './index.module.scss'

export default defineComponent({
	name: 'Home',
	setup() {
		return () => (
			<div class={$styles.home}></div>
		)
	},
})
