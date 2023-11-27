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
import { isNil } from 'lodash'

const rules = {
	nickname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

export default defineComponent({
	name: 'Login',
	setup() {
		const $router = useRouter()
		const loginIn = async () => {
			await loginRef.value?.validate()
			const { success, data } = await login({ nickname: ruleForm.nickname, password: ruleForm.password })
			if (success && !isNil(data)) {
				localStorage.setItem('xingToken', data)
				localStorage.setItem('user', ruleForm.nickname)
				$router.push('/')
			}
		}
		const loading = ref(false)
		const loginRef = ref<FormInstance>()
		const ruleForm = reactive({
			nickname: '',
			password: '',
		})
		return () => (
			<div class={$styles.loginWrap}>
				<div class={$styles.login}>
					<div class={$styles.title}>后台管理系统</div>
					<a-form model={ruleForm} rules={rules} ref={loginRef} class={$styles.loginContent}>
						<a-form-item name="nickname">
							<a-input
								v-model={[ruleForm.nickname, 'value']}
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
