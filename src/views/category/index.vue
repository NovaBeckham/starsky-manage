<template>
	<a-card title="分类列表" :loading="loading">
		<a-button type="primary" :loading="loading" style="margin: 8px 0" @click="addCategory">添加</a-button>
		<a-table rowKey="id" bordered :dataSource="tableData" :columns="columns" :pagination="false">
			<template #bodyCell="{ column, record }: ATableColumnProp<Category>">
				<template v-if="column.key === 'action'">
					<a-space size="middle">
						<a-button type="primary" :loading="loading" @click="() => editCategory(record)">编辑</a-button>
						<a-button type="primary" danger :loading="loading">删除</a-button>
					</a-space>
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
		<a-modal
			:open="visible"
			:title="isNil(editCategoryId) ? '新增' : '修改'"
			destroyOnClose
			width="30%"
			@cancel="onCancel"
			@ok="submit"
			:confirmLoading="loading"
		>
			<a-form :wrapperCol="{ span: 14 }">
				<a-form-item label="分类名">
					<a-input v-model:value="editCategoryName" />
				</a-form-item>
			</a-form>
		</a-modal>
	</a-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { isEmpty, isNil } from 'lodash'
import { columns } from './utils'
import { ATableColumnProp } from '@/interface'
import { infoTips, successTips } from '@/utils'
import { Category, getPage, saveCategoryRequest } from '@/api/category'

const loading = ref(false)
const current = ref(1)
const pageSize = ref(4)
const total = ref(0)
const tableData = ref<Category[]>()
const visible = ref(false)
const editCategoryId = ref<number>()
const editCategoryName = ref<string>()

const search = async () => {
	loading.value = true
	const { flag, data } = await getPage({ current: current.value, size: pageSize.value })
	loading.value = false
	if (flag && !isNil(data)) {
		tableData.value = data.records
		current.value = data.current ?? 1
		total.value = data.total ?? 0
	}
}

const addCategory = () => {
	visible.value = true
}

const editCategory = (record: Category) => {
	editCategoryId.value = record.id
	editCategoryName.value = record.categoryName
	visible.value = true
}

const handleCurrentChange = (pageNo: number, size: number) => {
	current.value = pageNo
	pageSize.value = size
	search()
}

const onCancel = () => {
	editCategoryId.value = undefined
	editCategoryName.value = undefined
	visible.value = false
}

const submit = async () => {
	if (isNil(editCategoryName.value) || isEmpty(editCategoryName.value)) {
		infoTips('请输入分类名')
		return
	}
	loading.value = true
	const { flag } = await saveCategoryRequest({ id: editCategoryId.value, categoryName: editCategoryName.value })
	loading.value = false
	if (flag) {
		successTips('操作成功')
		search()
		onCancel()
	}
}

onMounted(() => {
	search()
})
</script>
