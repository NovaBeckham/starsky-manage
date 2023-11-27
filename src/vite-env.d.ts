/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.min.js'
interface ZhCN {
	[key: string]: any
}
declare module 'element-plus/dist/locale/zh-cn.mjs' {
	import zh from 'element-plus/dist/locale/zh-cn.mjs'
	const zh_CN: ZhCN

	export default zh_CN
}
