/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */
import { createApp } from 'vue'
import router from '@/router'
import './style.scss'
import App from './App'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

createApp(App).use(router).use(createPinia()).mount('#app')
