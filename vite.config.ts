/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { resolve } from 'path'
import { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default (): UserConfigExport => {
	return {
		server: {
			// hostname: '0.0.0.0',
			// host: "localhost",
			// port: 8080,
			// // 是否自动在浏览器打开
			open: true,
			// // 是否开启 https
			// https: false,
			// // 服务端渲染
			// ssr: false,
			proxy: {
				'/api': {
					target: 'http://localhost:3000',
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/api/, ''),
				},
			},
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true
				},
				scss: {
					javascriptEnabled: true,
				},
			}
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
			},
		},
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
		],
	}
}
