<template>
	<div class="admin-header">
		<div class="right-content">
			<el-dropdown class="dropdown" @command="handleCommand">
				<span class="user">
					<el-avatar :size="40" :src="userStore.userInfo.avatar" />
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
						<el-dropdown-item command="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/index'

const userStore = useUserStore()

const handleCommand = (command: string) => {
	switch (command) {
		case 'logout':
			console.log('退出登录')
			break
		case 'rePassword':
			console.log('退出登录')
			break
	}
}
</script>

<style scoped lang="scss">
.admin-header {
	display: flex;
	align-items: center;
	background-color: rgb(67, 56, 202);
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
	height: 64px;
	z-index: 1000;

	.dropdown {
		height: 64px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 1.25rem;
		margin-right: 1.25rem;
	}
}
.logo {
	width: 250px;
	text-align: center;
	font-size: 1.25rem;
	line-height: 1.75rem;
	font-weight: 100;
}
.right-content {
	margin-left: auto;
	display: flex;
	align-items: center;

	.user {
		display: flex;
		align-items: center;
		color: rgb(253, 253, 253);
	}
}
</style>
