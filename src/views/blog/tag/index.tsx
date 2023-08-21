/*
 * @Description: 标签列表
 * @Author: hyx
 * @Date: 2023-08-21 15:42:30
 */

import { addTag, deleteTag, getPage, updateTag, TagListOptions } from '@/api/tag'
import { ATableColumnProp } from '@/interface'
import { timeFormat } from '@/utils'
import { isEmpty, isNil } from 'lodash'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'

const columns = [
	{
		title: '标签名',
		dataIndex: 'tagName',
		key: 'tagName',
		align: 'center',
	},
	{
		title: '文章数量',
		dataIndex: 'articleCount',
		key: 'articleCount',
		align: 'center',
	},
	{
		title: '创建时间',
		key: 'createTime',
		align: 'center',
		customRender: ({ record }: ATableColumnProp<TagListOptions>) => timeFormat(record.createTime ?? ''),
	},
	{
		title: '操作',
		key: 'action',
		align: 'center',
	},
]

export default defineComponent({
	name: 'Tag',
	setup() {
		const tableData = ref<TagListOptions[]>([])
		const total = ref(0)
		const pageNum = ref(0)
		const pageSize = ref(0)
		const loading = ref(false)
		const title = ref('')
		const editName = ref('')
		const editId = ref<number>()
		const visible = computed(() => !isEmpty(title.value))
		const getList = async (current: number, size: number) => {
			loading.value = true
			const { success, data } = await getPage({ current, size })
			loading.value = false
			if (success && !isNil(data) && !isNil(data.records)) {
				tableData.value = data.records
				total.value = data.total
				pageNum.value = data.current
				pageSize.value = data.size
			}
		}
		const pagination = computed(() => ({
			total: total.value,
			current: pageNum.value,
			pageSize: pageSize.value,
			showTotal: (total: number) => `共 ${total} 条`,
		}))
		const handleChange = (page: { current: number; pageSize: number }) => {
			getList(page.current, page.pageSize)
		}
		onMounted(() => {
			getList(1, 10)
		})
		const handleDeleteCategory = async (id: number) => {
			loading.value = true
			const { success } = await deleteTag([id])
			loading.value = false
			if (success) {
				notification.success({
					message: '成功',
					description: '删除成功',
				})
			}
		}
		return () => (
			<div class="app-container">
				<a-button type="primary" onClick={() => (title.value = '添加')} style={{ marginBottom: '10px' }}>
					新增
				</a-button>
				<a-table
					dataSource={tableData.value}
					columns={columns}
					loading={loading.value}
					v-slots={{
						bodyCell: ({ column, record }: ATableColumnProp<TagListOptions>) => {
							if (column.key === 'action') {
								return (
									<>
										<a-button
											type="link"
											loading={loading.value}
											onClick={() => {
												title.value = '编辑'
												editId.value = record.id
												editName.value = record.tagName ?? ''
											}}
										>
											<FormOutlined />
											修改
										</a-button>
										<a-popconfirm
											title="确认删除吗？"
											onConfirm={() => {
												handleDeleteCategory(record.id as number)
											}}
										>
											<a-button type="link" disabled={loading.value} loading={loading.value} danger>
												<DeleteOutlined />
												删除
											</a-button>
										</a-popconfirm>
									</>
								)
							}
						},
					}}
					rowKey="id"
					bordered
					pagination={pagination.value}
					onChange={handleChange}
				/>
				<a-modal
					open={visible.value}
					title={`${title.value}标签`}
					onOk={async () => {
						if (isNil(editName.value) || isEmpty(editName.value)) {
							notification.info({
								message: '提示',
								description: '请填写标签名',
							})
							return
						}
						const func = title.value === '编辑' ? updateTag : addTag
						loading.value = true
						const { success } = await func({ id: editId.value, tagName: editName.value })
						loading.value = false
						if (success) {
							notification.success({
								message: '成功',
								description: '操作成功',
							})
							editName.value = ''
							editId.value = undefined
							title.value = ''
							getList(1, 10)
						}
					}}
					onCancel={() => {
						editName.value = ''
						editId.value = undefined
						title.value = ''
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<label>标签名：</label>
						<a-input v-model={[editName.value, 'value']} style={{ width: '60%' }} />
					</div>
				</a-modal>
			</div>
		)
	},
})