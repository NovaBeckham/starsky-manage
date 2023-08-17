/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider, theme } from 'ant-design-vue'

export default defineComponent({
	name: 'App',
	render() {
		return (
			<ConfigProvider locale={zhCN} theme={{ algorithm: theme.darkAlgorithm }}>
				<RouterView />
			</ConfigProvider>
		)
	},
})
