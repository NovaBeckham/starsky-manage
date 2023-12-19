/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-14 16:46:00
 */

import 'ant-design-vue/dist/reset.css'
import {
	ConfigProvider,
	Button,
	Layout,
	Dropdown,
	Avatar,
	Menu,
	Table,
	Space,
	Tag,
	Image,
	Form,
	Input,
	Card,
	Pagination,
	Modal,
	Row,
	Col,
	Upload,
	Popover,
} from 'ant-design-vue'
import { App } from 'vue'

export function useAnt(app: App) {
	app.use(ConfigProvider)
	app.use(Button)
	app.use(Layout)
	app.use(Dropdown)
	app.use(Avatar)
	app.use(Menu)
	app.use(Table)
	app.use(Space)
	app.use(Tag)
	app.use(Image)
	app.use(Form)
	app.use(Input)
	app.use(Card)
	app.use(Pagination)
	app.use(Modal)
	app.use(Row)
	app.use(Col)
	app.use(Upload)
	app.use(Popover)
}
