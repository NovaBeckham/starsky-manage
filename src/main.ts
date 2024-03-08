/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { createApp } from 'vue'
import { router } from '@/router'
import App from './App.vue'
import { createPinia } from 'pinia'
// import 'element-plus/theme-chalk/index.css'
import '@/assets/styles/index.scss'
import func from '@/utils/permission'
import { useAnt } from '@/plugin/ant-design'
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import dayjs from 'dayjs'
dayjs.locale('zh-cn')

const app = createApp(App)

func(router)
app.use(router).use(createPinia()).use(mavonEditor).mount('#app')
useAnt(app)
