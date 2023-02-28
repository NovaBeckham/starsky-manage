/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-08 17:29:49
 */

import 'element-plus/dist/index.css'
import { App } from 'vue'
import {
	ElButton,
	ElForm,
	ElIcon,
	ElInput,
	ElAvatar,
	ElDropdown,
	ElMenu,
	ElTable,
	ElCard,
	ElSelect,
	ElDialog,
	ElPopover,
	ElTag,
	ElOption,
	ElPagination,
} from 'element-plus'

export function useAnt(app: App) {
	app.use(ElButton)
	app.use(ElForm)
	app.use(ElIcon)
	app.use(ElInput)
	app.use(ElAvatar)
	app.use(ElDropdown)
	app.use(ElMenu)
	app.use(ElTable)
	app.use(ElCard)
	app.use(ElSelect)
	app.use(ElDialog)
	app.use(ElPopover)
	app.use(ElTag)
	app.use(ElOption)
	app.use(ElPagination)
}
