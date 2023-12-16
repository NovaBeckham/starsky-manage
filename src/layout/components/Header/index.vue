<template>
	<div class="nav-bar">
		<div class="right-menu">
			<a-dropdown class="dropdown">
				<a-avatar :size="40" :src="userStore.userInfo.avatar" />
				<template #overlay>
					<a-menu @click="handleMenu">
						<a-menu-item key="rePassword">修改密码</a-menu-item>
						<a-menu-item key="logout">退出登录</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/index'

const userStore = useUserStore()
function handleMenu(data: any) {
	console.log('data', data)
}
</script>

<style scoped lang="scss">
.nav-bar {
	display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 30px;
  height: 64px;

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
