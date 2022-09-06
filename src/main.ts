/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */
import { createApp } from 'vue'
import router from '@/router'
import './styles/main.scss'
import App from './App'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
