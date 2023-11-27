<template>
	<el-config-provider :locale="zh_CN">
		<router-view> </router-view>
	</el-config-provider>
</template>
<script lang="ts" setup>
import zh_CN from 'element-plus/dist/locale/zh-cn.mjs'
</script>
