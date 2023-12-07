<template>
	<div>
		<el-menu :default-active="defaultActive" class="side-nav-bar" router>
			<template v-for="menu in constantRoutes" :key="menu.id">
				<el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0">
					<template #title>
						<span>{{ menu.name }}</span>
					</template>
					<el-menu-item v-for="son in menu.children" :index="son.path">
						<span>{{ son.name }}</span>
					</el-menu-item>
				</el-sub-menu>
				<el-menu-item v-else :index="menu.path">
					<span>{{ menu.name }}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { constantRoutes } from '@/router'

const $route = useRoute()
const defaultActive = ref($route.path)

onBeforeRouteUpdate((to) => {
	defaultActive.value = to.path
})
</script>

<style scoped>
.side-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
*::-webkit-scrollbar {
  width: 0.5rem;
  height: 1px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: rgba(144, 147, 153, 0.3);
}
</style>
