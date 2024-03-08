<template>
	<a-card title="文章列表" :loading="loading">
		<a-button type="primary" :loading="loading" style="margin: 8px 0" @click="showArticle()">添加</a-button>
		<a-table rowKey="id" bordered :dataSource="tableData" :columns="columns" :pagination="false">
			<template #bodyCell="{ column, record }: ATableColumnProp<Article>">
				<template v-if="column.key === 'action'">
					<a-space size="middle">
						<a-button
							type="primary"
							:style="{ backgroundColor: '#4e8e2f' }"
							:loading="loading"
							v-if="record.isDelete === 1"
							>恢复</a-button
						>
						<a-button type="primary" :loading="loading" @click="showArticle(record.id)" v-if="record.isDelete == 0"
							>编辑</a-button
						>
						<a-button type="primary" danger :loading="loading">删除</a-button>
					</a-space>
				</template>
				<template v-if="column.key === 'articleCover'">
					<a-image :width="100" :src="record.articleCover" />
				</template>
			</template>
		</a-table>
		<div class="fenye">
			<a-pagination
				:current="current"
				:total="total"
				:show-total="(total: number) => `共 ${total} 条`"
				@Change="handleCurrentChange"
				show-size-changer
				:showQuickJumper="total / pageSize > 5"
				:pageSize="pageSize"
			/>
		</div>
		<Details :visible="detailsVisible" :id="detailsId" @close="detailsClose" @search="search" />
	</a-card>
</template>

<script lang="ts" setup>
import { Article, getArticleList } from '@/api/article'
import { isNil } from 'lodash'
import { onMounted, ref } from 'vue'
import { columns } from './utils'
import { ATableColumnProp } from '@/interface'
import Details from './components/details.vue'

const loading = ref(false)
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)
const tableData = ref<Article[]>()
const detailsVisible = ref(false)
const detailsId = ref<number>()

const search = async () => {
	loading.value = true
	const { flag, data } = await getArticleList({ current: current.value, size: pageSize.value, isDelete: 0 })
	loading.value = false
	if (flag && !isNil(data)) {
		tableData.value = data.records
		current.value = data.current ?? 1
		total.value = data.total ?? 0
	}
}

const showArticle = (id?: number) => {
	detailsId.value = id
	detailsVisible.value = true
}

const detailsClose = () => {
	detailsVisible.value = false
	detailsId.value = undefined
}

const handleCurrentChange = (pageNo: number, size: number) => {
	current.value = pageNo
	pageSize.value = size
	search()
}

onMounted(() => {
	search()
})
</script>
