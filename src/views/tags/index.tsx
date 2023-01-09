/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-01-09 16:23:54
 */

import { getTagList } from '@/api/tags'
import { ElTableColumnProp } from '@/interface'
import { buttonEmits, ElNotification } from 'element-plus'
import { isEmpty, isNil } from 'ramda'
import { defineComponent, onMounted, ref } from 'vue'

interface TagList {
	name: string
	createdAt: string
}

export default defineComponent({
	name: 'Tags',
	setup() {
		const tableData = ref<TagList[]>([])
		const visible = ref(false)
		const tag = ref('')
		onMounted(() => {
			getTagList().then((res) => {
				if (res.data) {
					tableData.value = res.data
				}
			})
		})
		const saveTag = () => {
			if (isNil(tag.value) || isEmpty(tag.value)) {
				ElNotification({
					title: '错误',
					message: '请输入标签名',
					type: 'error',
				})
			}
		}
		return () => (
			<el-card>
				<el-button type="primary" onClick={() => (visible.value = true)}>
					新增
				</el-button>
				<el-table data={tableData.value} rowKey="id" border style={{ width: '100%' }}>
					<el-table-column prop="name" label="标签名" align="center" />
					<el-table-column prop="createdAt" label="创建时间" align="center" />
					<el-table-column
						prop="createdAt"
						label="操作"
						v-slots={{
							default: ({ row }: ElTableColumnProp<TagList>) => (
								<>
									<el-button type="primary" onClick={() => console.log('row', row)}>
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
					<el-input v-model={tag.value} style="width: 220px" />
				</el-dialog>
			</el-card>
		)
	},
})
