<template>
	<a-config-provider :locale="zh_CN" :theme="{ algorithm: theme.darkAlgorithm }">
		<router-view> </router-view>
	</a-config-provider>
</template>
<script lang="ts" setup>
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import { theme } from 'ant-design-vue'
</script>
