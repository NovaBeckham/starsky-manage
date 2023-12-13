<template>
	<el-container>
		<el-aside style="backgroundColor: #304156;">
			<Aside></Aside>
		</el-aside>
		<el-container class="main-container">
			<el-header height="64px" style="padding: 0">
        <Header :key="$route.fullPath"></Header>
      </el-header>
			<el-main>
				<div class="fade-transform-box">
					<router-view v-slot="{ Component }">
						<transition name="fade-transform" mode="out-in">
							<keep-alive :max="10" v-if="$route.meta.keepAlive">
								<component :key="$route.name" :is="Component"></component>
							</keep-alive>
							<component :key="$route.name" :is="Component" v-else></component>
						</transition>
					</router-view>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import Header from './components/Header/index.vue'
import Aside from './components/Aside/index'
import { useRoute } from 'vue-router'

const $route = useRoute()
</script>

<style>
.main-container {
  min-height: 100vh;
}
.fade-transform-enter-active,
.fade-transform-leave-active {
	transition: all 0.5s ease 0s;
}
.fade-transform-enter {
	opacity: 0;
	transform: translateX(-30px) !important;
}
.fade-transform-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
.fade-transform-box {
  width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
