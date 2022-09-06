/*
 * @Description: Login
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */

import { login } from '@/api/login'
import { Lock, User } from '@element-plus/icons-vue'
import { ElButton, ElForm, ElFormItem, ElIcon, ElInput, FormInstance, FormRules } from 'element-plus'
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
			<div class={$styles.wrap}>
				<div class={$styles.login}>
					<div class={$styles.title}>后台管理系统</div>
					<ElForm model={ruleForm} rules={rules} ref={loginRef} labelWidth="0px" class={$styles.content}>
						<ElFormItem prop="username">
							<ElInput
								v-model={ruleForm.username}
								placeholder="username"
								v-slots={{
									prepend: () => (
										<ElButton
											icon={
												<ElIcon>
													<User />
												</ElIcon>
											}
										></ElButton>
									),
								}}
							/>
						</ElFormItem>
						<ElFormItem prop="password">
							<ElInput
								type="password"
								placeholder="password"
								v-model={ruleForm.password}
								v-slots={{
									prepend: () => (
										<ElButton
											icon={
												<ElIcon>
													<Lock />
												</ElIcon>
											}
										></ElButton>
									),
								}}
							/>
						</ElFormItem>
						<div class={$styles.btn}>
							<ElButton type="primary" loading={loading.value} onClick={loginIn}>
								登录
							</ElButton>
						</div>
						<p class={$styles.tips}>Tips : 用户名和密码随便填。</p>
					</ElForm>
				</div>
			</div>
		)
	},
})
