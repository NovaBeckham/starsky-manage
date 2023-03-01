/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */
import { createApp } from 'vue'
import router from '@/router'
import App from './App'
import { createPinia } from 'pinia'
import { useAnt } from '@/plugin/ant-design'
import './styles/index.scss'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')

useAnt(app)
