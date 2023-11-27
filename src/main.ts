/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { createApp } from 'vue'
import { router } from '@/router'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useAnt } from '@/plugin/element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/index.scss'
import func from '@/utils/permission'

const app = createApp(App)

func(router)
app.use(router).use(createPinia()).mount('#app')

useAnt(app)
