<template>
	<div class="lagin-wrap">
		<div class="login">
			<div class="title">后台管理系统</div>
			<el-form ref="loginRef" :model="ruleForm" :rules="rules" class="login-content">
				<el-form-item prop="nickname">
					<el-input v-model="ruleForm.nickname" :prefix-icon="UserFilled" />
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="ruleForm.password" :prefix-icon="Lock" />
				</el-form-item>
				<el-form-item prop="password">
					<el-button type="primary" :loading="loading" @click="loginIn(loginRef)" />
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { FormInstance } from 'element-plus'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { login } from '@/api/login'
import { isNil } from 'lodash'
import { useRouter } from 'vue-router'

const rules = {
	nickname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const $router = useRouter()
const loading = ref(false)
const loginRef = ref<FormInstance>()
const ruleForm = reactive({
	nickname: '',
	password: '',
})
const loginIn = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	const valid = await formEl.validate()
	if (valid) {
		loading.value = true
		const { success, data } = await login({ nickname: ruleForm.nickname, password: ruleForm.password })
		loading.value = false
		if (success && !isNil(data)) {
			localStorage.setItem('xingToken', data)
			localStorage.setItem('user', ruleForm.nickname)
			$router.push('/')
		}
	}
}
</script>
<style lang="scss" scoped>
.lagin-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-image: url('https://hyx-1999.github.io/starsku-static/images/loginBj.jpg');
	background-size: cover;

	.login {
		position: absolute;
		top: 50%;
		left: 80%;
		transform: translate(-50%, -50%);
		width: 350px;
		border-radius: 5px;
		background: rgba(0, 0, 0, 0.3);

		.login-content {
			padding: 30px 30px;
		}
	}
}
</style>
