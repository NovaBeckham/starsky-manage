<template>
	<div class="login-wrap">
		<div class="login">
			<div class="title">后台管理系统</div>
			<a-form ref="loginRef" :model="ruleForm" :rules="rules" class="login-content">
				<a-form-item name="username">
					<a-input v-model:value="ruleForm.username">
						<template #prefix><UserOutlined /></template>
					</a-input>
				</a-form-item>
				<a-form-item name="password">
					<a-input-password v-model:value="ruleForm.password">
						<template #prefix><LockOutlined /></template>
					</a-input-password>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" style="width: 100%" :loading="loading" @click="loginIn">登录</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import { login } from '@/api/login'
import { isNil } from 'lodash'
import { useRouter } from 'vue-router'

const rules = {
	username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const $router = useRouter()
const loading = ref(false)
const loginRef = ref()
const ruleForm = reactive({
	username: '',
	password: '',
	rememberMe: false
})
const loginIn = async () => {
	await loginRef.value?.validate()
	loading.value = true
	const { flag, data } = await login(ruleForm)
	loading.value = false
	if (flag && !isNil(data)) {
		localStorage.setItem('xingToken', data)
		localStorage.setItem('user', ruleForm.username)
		// userStore.setUserInfo(data)
		$router.push('/')
	}
}
</script>
<style lang="scss" scoped>
.login-wrap {
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

		.title {
			text-align: center;
			margin-top: 20px;
		}

		.login-content {
			padding: 30px 30px;
		}
	}
}
</style>
