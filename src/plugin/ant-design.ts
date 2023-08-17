/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-09-08 17:29:49
 */

import 'ant-design-vue/dist/reset.css'
import { App } from 'vue'
import {
	Button,
	Form,
	Input,
	Avatar,
	Dropdown,
	Menu,
	Table,
	Card,
	Select,
	Modal,
	Popover,
	Tag,
	Pagination,
	ConfigProvider,
	Layout,
	Space,
	Upload,
	Popconfirm,
	Image,
	Row,
	Col,
} from 'ant-design-vue'

export function useAnt(app: App) {
	app.use(Button)
	app.use(Form)
	app.use(Input)
	app.use(Avatar)
	app.use(Dropdown)
	app.use(Menu)
	app.use(Table)
	app.use(Card)
	app.use(Select)
	app.use(Modal)
	app.use(Popover)
	app.use(Tag)
	app.use(Pagination)
	app.use(ConfigProvider)
	app.use(Layout)
	app.use(Space)
	app.use(Upload)
	app.use(Popconfirm)
	app.use(Image)
	app.use(Row)
	app.use(Col)
}
