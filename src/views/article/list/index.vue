<template>
	<div>
		<a-table border :dataSource="tableData" :columns="columns">
			<template #bodyCell="{ column, record }: ATableColumnProp<Article>">
				<template v-if="column.key === 'action'">
					<a-space size="middle">
						<a-button :loading="loading" v-if="record.isPublish === 1">下架</a-button>
						<a-button type="primary" :loading="loading" v-if="record.isPublish === 0">发布</a-button>
						<a-button type="primary" :loading="loading">编辑</a-button>
						<a-button type="primary" danger :loading="loading">删除</a-button>
					</a-space>
				</template>
				<template v-if="column.key === 'avatar'">
					<a-image :width="100" :src="record.avatar" />
				</template>
			</template>
		</a-table>
	</div>
</template>

<script lang="ts" setup>
import { Article, getArticleList } from '@/api/article'
import { isNil } from 'lodash'
import { onMounted, ref } from 'vue'
import { columns } from './utils'
import { ATableColumnProp } from '@/interface';

const loading = ref(false)
// const searchForm = ref<{ current: number; size: number }>({ current: 1, size: 10 })
const tableData = ref<Article[]>()

const search = async (params?: { current: number; size: number }) => {
	loading.value = true
	const { flag, data } = await getArticleList(params ?? { current: 1, size: 10 })
	loading.value = false
	if (flag && !isNil(data)) {
		tableData.value = data.records
	}
}

onMounted(() => {
	search()
})
</script>