<template>
	<div class="admin-menu" style="width: 250px">
		<el-menu :default-active="defaultActive" class="el-menu-vertical-demo menu" router>
			<template v-for="menu in menus" :key="menu.id">
				<el-sub-menu :index="String(menu.id)" v-if="menu.children && menu.children.length > 0">
					<template #title>
						<el-icon>
							<component :is="menu.icon"></component>
						</el-icon>
						<span>{{ menu.name }}</span>
					</template>
					<el-menu-item v-for="son in menu.children" :key="son.id" :index="son.path">
						<el-icon>
							<component :is="son.icon"></component>
						</el-icon>
						<span>{{ son.name }}</span>
					</el-menu-item>
				</el-sub-menu>

				<el-menu-item v-else :index="menu.path">
					<el-icon>
						<component :is="menu.icon"></component>
					</el-icon>
					<span>{{ menu.name }}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store'
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const userStore = useUserStore()
const $route = useRoute()
const menus = userStore.userInfo.menus
const defaultActive = ref($route.path)

onBeforeRouteUpdate((to) => {
	defaultActive.value = to.path
})
</script>

<style scoped>
.admin-menu {
	transition: all 0.2s;
	top: 64px;
	position: fixed;
	bottom: 0;
	left: 0;
	overflow-y: auto;
	overflow-x: hidden;
}
.menu {
  height: 100%;
}
</style>
