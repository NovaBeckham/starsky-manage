/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-08 17:29:49
 */

import { App } from 'vue'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/config-provider/style/css'
import 'element-plus/es/components/dropdown/style/css'
import 'element-plus/es/components/avatar/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/menu/style/css'
import 'element-plus/es/components/container/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/input/style/css'
import { ElButton, ElConfigProvider, ElDropdown, ElAvatar, ElIcon, ElMenu, ElContainer, ElForm, ElInput } from 'element-plus'

export function useAnt(app: App) {
	app.use(ElConfigProvider)
	app.use(ElButton)
	app.use(ElDropdown)
	app.use(ElAvatar)
	app.use(ElIcon)
	app.use(ElMenu)
	app.use(ElContainer)
	app.use(ElForm)
	app.use(ElInput)
}
