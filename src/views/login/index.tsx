/*
 * @Description: Login
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { login } from '@/api/login'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { FormInstance } from 'ant-design-vue'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import $styles from './index.module.scss'

const rules = {
	username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

export default defineComponent({
	name: 'Login',
	setup() {
		const $router = useRouter()
		const loginIn = async () => {
			await loginRef.value?.validate()
			login({ username: ruleForm.username, password: ruleForm.password }).then((res) => {
				localStorage.setItem('starToken', res.data)
				localStorage.setItem('user', ruleForm.username)
				$router.push('/')
			})
		}
		const loading = ref(false)
		const loginRef = ref<FormInstance>()
		const ruleForm = reactive({
			username: '',
			password: '',
		})
		return () => (
			<div class={$styles.loginWrap}>
				<div class={$styles.login}>
					<div class={$styles.title}>后台管理系统</div>
					<a-form model={ruleForm} rules={rules} ref={loginRef} class={$styles.loginContent}>
						<a-form-item name="username">
							<a-input
								v-model={[ruleForm.username, 'value']}
								placeholder="账号"
								v-slots={{
									prefix: () => <UserOutlined />
								}}
							/>
						</a-form-item>
						<a-form-item name="password">
							<a-input
								type="password"
								placeholder="密码"
								v-model={[ruleForm.password, 'value']}
								v-slots={{
									prefix: () => <LockOutlined />,
								}}
							/>
						</a-form-item>
						<div class={$styles.loginBtn}>
							<a-button type="primary" loading={loading.value} onClick={loginIn}>
								登录
							</a-button>
						</div>
					</a-form>
				</div>
			</div>
		)
	},
})
