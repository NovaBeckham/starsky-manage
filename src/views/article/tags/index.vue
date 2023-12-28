<template>
	<a-card title="标签列表" :loading="loading">
		<a-button type="primary" :loading="loading" style="margin: 8px 0" @click="addTag">添加</a-button>
		<a-table rowKey="id" bordered :dataSource="tableData" :columns="columns" :pagination="false">
			<template #bodyCell="{ column, record }: ATableColumnProp<Tags>">
				<template v-if="column.key === 'action'">
					<a-space size="middle">
						<a-button type="primary" :loading="loading" @click="() => editTag(record)">编辑</a-button>
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
			:title="isNil(editTagId) ? '新增' : '修改'"
			destroyOnClose
			width="30%"
			@cancel="onCancel"
			@ok="submit"
			:confirmLoading="loading"
		>
			<a-form :wrapperCol="{ span: 14 }">
				<a-form-item label="标签名">
					<a-input v-model:value="editTagName" />
				</a-form-item>
				<a-form-item label="排序">
					<a-input-number v-model:value="editTagSort" />
				</a-form-item>
			</a-form>
		</a-modal>
	</a-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Tags, getList, addTagRequest, updateTagRequest } from '@/api/tag'
import { isEmpty, isNil } from 'lodash'
import { columns } from './utils'
import { ATableColumnProp } from '@/interface'
import { infoTips, successTips } from '@/utils'

const loading = ref(false)
const current = ref(0)
const pageSize = ref(10)
const total = ref(0)
const tableData = ref<Tags[]>()
const visible = ref(false)
const editTagId = ref<number>()
const editTagName = ref<string>()
const editTagSort = ref<number>()

const search = async () => {
	loading.value = true
	const { flag, data } = await getList({ current: current.value, size: pageSize.value })
	loading.value = false
	if (flag && !isNil(data)) {
		tableData.value = data.records
		current.value = data.current ?? 1
		total.value = data.total ?? 0
	}
}

const addTag = () => {
	visible.value = true
}

const editTag = (record: Tags) => {
	editTagId.value = record.id
	editTagName.value = record.name
	editTagSort.value = record.sort
	visible.value = true
}

const handleCurrentChange = (pageNo: number, size: number) => {
	current.value = pageNo
	pageSize.value = size
	search()
}

const onCancel = () => {
	editTagId.value = undefined
	editTagName.value = undefined
	editTagSort.value = undefined
	visible.value = false
}

const submit = async () => {
	if (isNil(editTagName.value) || isEmpty(editTagName.value)) {
		infoTips('请输入标签名')
		return
	}
	if (isNil(editTagSort.value)) {
		infoTips('请输入排序')
		return
	}
	const func = isNil(editTagId.value) ? addTagRequest : updateTagRequest
	loading.value = true
	const { flag } = await func({ id: editTagId.value, name: editTagName.value, sort: editTagSort.value })
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
