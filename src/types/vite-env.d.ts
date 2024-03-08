/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.min.js'
declare module 'markdown-it'
declare module '@iktakahiro/markdown-it-katex'
interface ZhCN {
	[key: string]: any
}
