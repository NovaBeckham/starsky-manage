/*
 * @Description: Login
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { login } from '@/api/login'
import { Lock, User } from '@element-plus/icons-vue'
import { FormInstance, FormRules } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import $styles from './index.module.scss'

const rules: FormRules = {
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
					<el-form model={ruleForm} rules={rules} ref={loginRef} labelWidth="0px" class={$styles.loginContent}>
						<el-form-item prop="username">
							<el-input
								v-model={ruleForm.username}
								placeholder="账号"
								v-slots={{
									prepend: () => (
										<el-button
											icon={
												<el-icon>
													<User />
												</el-icon>
											}
										></el-button>
									),
								}}
							/>
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								type="password"
								placeholder="密码"
								v-model={ruleForm.password}
								v-slots={{
									prepend: () => (
										<el-button
											icon={
												<el-icon>
													<Lock />
												</el-icon>
											}
										></el-button>
									),
								}}
							/>
						</el-form-item>
						<div class={$styles.loginBtn}>
							<el-button type="primary" loading={loading.value} onClick={loginIn}>
								登录
							</el-button>
						</div>
						<p class={$styles.loginTips}>Tips : 用户名和密码随便填。</p>
					</el-form>
				</div>
			</div>
		)
	},
})
