<template>
	<div>
		<el-card class="box-card">
			<template #header>
				<div>
					<span>文章列表</span>
				</div>
			</template>
			<div>
				<el-table :data="tableData" row-key="id">
					<el-table-column type="selection" width="55" />
					<el-table-column label="头像" width="100" align="center">
						<template #default="{ row }">
							<img class="img" :src="row.avatar" alt="" />
						</template>
					</el-table-column>
					<el-table-column label="昵称" prop="nickname" align="center"> </el-table-column>
					<el-table-column label="发布时间" align="center">
						<template #default="{ row }">
							{{ formatDateTime(row.createTime).substring(0, 10) }}
						</template>
					</el-table-column>
					<el-table-column label="是否禁用" align="center">
						<template #default="{ row }">
							<el-switch
								v-model="row.isDisable"
								:active-value="1"
								:inactive-value="0"
								class="ml-2"
								style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
								@click="updateStatus(row.id, row.isDisable)"
								:loading="loading"
							/>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { getPage, UserInfo } from '@/api/user'
import { isNil } from 'lodash'
import { onMounted, ref } from 'vue'
import { formatDateTime } from '@/utils/date'

const loading = ref(false)
const tableData = ref<UserInfo[]>([])
const getUserList = async () => {
	loading.value = true
	const { success, data } = await getPage({})
	loading.value = false
	if (success && !isNil(data) && !isNil(data.records)) {
		tableData.value = data.records
	}
}
onMounted(() => getUserList())
const updateStatus = async (id: number, isDisable: number) => {
	loading.value = true
	const res = await reqIsDisAbleUser(id, Number(isDisable))
	if (res.status == 200) {
		notification('修改成功')
		loading.value = false
	}
}
</script>

<style scoped lang="scss">
.img {
	width: 100%;
	height: 70px;
}
</style>
