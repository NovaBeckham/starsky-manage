<template>
	<a-config-provider :locale="zh_CN">
		<router-view> </router-view>
	</a-config-provider>
</template>
<script lang="ts" setup>
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
</script>
