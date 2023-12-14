<template>
	<ConfigProvider :locale="zhCn">
		<router-view> </router-view>
	</ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
import zhCn from 'ant-design-vue/es/locale/zh_CN'
</script>
