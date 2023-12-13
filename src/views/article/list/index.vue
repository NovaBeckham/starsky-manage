<template>
	<div>
		<el-table border :data="tableData">
			<el-table-column align="center" label="文章封面">
				<template #default="scope: { row: Article }">
					<el-image lazy :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]" />
				</template>
			</el-table-column>
			<el-table-column prop="title" align="center" label="文章名称" />
			<el-table-column prop="nickname" align="center" label="文章作者" />
			<el-table-column align="center" label="类型">
				<template #default="scope: { row: Article }">
					<el-tag :type="scope.row.isOriginal === 1 ? 'success' : 'warning'">{{
						scope.row.isOriginal === 1 ? '原创' : '转载'
					}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" label="分类">
				<template #default="scope: { row: Article }">
					<el-tag type="warning">{{ scope.row.categoryName }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" label="标签">
				<template #default="scope: { row: Article }">
					<el-tag
						v-if="!isNil(scope.row.tagNames) && !isEmpty(scope.row.tagNames)"
						v-for="item in split(scope.row.tagNames)"
						>{{ item }}</el-tag
					>
				</template>
			</el-table-column>
			<el-table-column align="center" label="阅读方式">
				<template #default="scope: { row: Article }">
					<el-tag :type="readTypeStyle[scope.row.readType ?? 0]">{{ readTypeList[scope.row.readType ?? 0] }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" label="状态">
				<template #default="scope: { row: Article }">
					<el-tag :type="publishList[scope.row.isPublish ?? 3].type">{{
						publishList[scope.row.isPublish ?? 3].label
					}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" align="center" label="创建时间" />
			<el-table-column fixed="right" align="center" label="操作" width="220">
				<template #default="scope: { row: Article }">
					<el-button :loading="loading" type="info" v-if="scope.row.isPublish === 1" size="small">下架</el-button>
					<el-button :loading="loading" type="success" v-if="scope.row.isPublish === 0" size="small">发布</el-button>
					<el-button :loading="loading" type="primary" size="small">编辑</el-button>
					<el-button :loading="loading" type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts" setup>
import { Article, getArticleList } from '@/api/article'
import { isEmpty, isNil, split } from 'lodash'
import { onMounted, ref } from 'vue'
import { readTypeStyle, readTypeList, publishList } from './utils'

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