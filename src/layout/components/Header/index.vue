<template>
	<div class="nav-bar">
		<div class="right-menu">
			<el-dropdown class="dropdown">
				<el-avatar :size="40" :src="userStore.userInfo.avatar" />
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
</script>

<style scoped lang="scss">
.nav-bar {
	display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 30px;
  height: 64px;
	border-bottom: 1px solid #e6e6e6;

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

.right-menu {
	margin-left: auto;
	display: flex;
	align-items: center;
}
</style>
