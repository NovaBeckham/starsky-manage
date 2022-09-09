/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-08 17:29:49
 */

import 'element-plus/dist/index.css'
import { App } from 'vue'
import { ElButton, ElForm, ElIcon, ElInput, ElAvatar, ElDropdown, ElMenu } from 'element-plus'

export function useAnt(app: App) {
	app.use(ElButton)
	app.use(ElForm)
	app.use(ElIcon)
	app.use(ElInput)
	app.use(ElAvatar)
	app.use(ElDropdown)
	app.use(ElMenu)
}
