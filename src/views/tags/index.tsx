/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-09 16:23:54
 */

import { createTag, getTagList, TagList, updateTag } from '@/api/tags'
import { ElTableColumnProp } from '@/interface'
import { timeFormat } from '@/utils'
import { ElNotification } from 'element-plus'
import { isEmpty, isNil } from 'ramda'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
	name: 'Tags',
	setup() {
		const tableData = ref<TagList[]>([])
		const visible = ref(false)
		const tag = ref('')
		const id = ref<number>()
		onMounted(() => {
			getTagList().then(({ data, code }) => {
				if (code === 200) {
					tableData.value = data
				}
			})
		})
		const saveTag = async () => {
			if (isNil(tag.value) || isEmpty(tag.value)) {
				ElNotification({
					title: '错误',
					message: '请输入标签名',
					type: 'error',
				})
				return
			}
			if (isNil(id.value)) {
				const { code } = await createTag({ name: tag.value })
				if (code === 200) {
					ElNotification({
						title: '成功',
						message: '创建成功',
						type: 'success',
					})
					visible.value = false
				}
			} else {
				const { code } = await updateTag({ name: tag.value, id: id.value })
				if (code === 200) {
					ElNotification({
						title: '成功',
						message: '更新成功',
						type: 'success',
					})
					id.value = undefined
					visible.value = false
				}
			}
		}

		return () => (
			<el-card>
				<el-button type="primary" onClick={() => (visible.value = true)} style={{ marginBottom: '15px' }}>
					新增
				</el-button>
				<el-table data={tableData.value} rowKey="id" border style={{ width: '100%' }}>
					<el-table-column prop="name" label="标签名" align="center" />
					<el-table-column
						prop="createdAt"
						label="创建时间"
						align="center"
						formatter={(row: TagList) => timeFormat(row.createdAt)}
					/>
					<el-table-column
						prop="updatedAt"
						label="更新时间"
						align="center"
						formatter={(row: TagList) => timeFormat(row.updatedAt)}
					/>
					<el-table-column
						prop="action"
						label="操作"
						v-slots={{
							default: ({ row }: ElTableColumnProp<TagList>) => (
								<>
									<el-button
										type="primary"
										onClick={() => {
											id.value = row.id
											tag.value = row.name
											visible.value = true
										}}
									>
										编辑
									</el-button>
									<el-button type="danger" onClick={() => console.log('row', row)}>
										删除
									</el-button>
								</>
							),
						}}
						align="center"
					/>
				</el-table>
				<el-dialog
					v-model={visible.value}
					title="添加标签"
					width="30%"
					v-slots={{
						footer: () => (
							<>
								<el-button type="primary" onClick={saveTag}>
									确定
								</el-button>
								<el-button type="danger" onClick={() => (visible.value = false)}>
									取消
								</el-button>
							</>
						),
					}}
				>
					<div>
						<label>标签名：</label>
						<el-input v-model={tag.value} style="width: 220px" />
					</div>
				</el-dialog>
			</el-card>
		)
	},
})
