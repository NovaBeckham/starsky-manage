<template>
	<div>
		<span>后台</span>
		<div>
			<el-dropdown @command="handleCommand">
				<span>
					<el-avatar :src="userStore.userInfo.avatar" />
					{{ userStore.userInfo.nickname }}
					<el-icon><ArrowDown /></el-icon>
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
import { ArrowDown } from '@element-plus/icons-vue'

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
