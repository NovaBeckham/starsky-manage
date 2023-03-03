import { addCategory, Category, CategoryRequest, deleteCategory, getCategoryList, updateCategory } from '@/api/category'
import { ATableColumnProp } from '@/interface'
import { notification } from 'ant-design-vue'
import { isEmpty, isNil } from 'ramda'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'

const columns = [
	{
		title: '分类名',
		dataIndex: 'name',
		key: 'name',
		align: 'center',
	},
	{
		title: '操作',
		key: 'action',
		align: 'center',
	},
]

interface State {
	searchForm: CategoryRequest
	tableData: Category[]
}

export default defineComponent({
	name: 'Category',
	setup() {
		const total = ref(0)
		const loading = ref(false)
		const visible = ref(false)
		const id = ref<number>()
		const name = ref<string>('')
		const state = reactive<State>({
			searchForm: { pageNum: 1, pageSize: 10 },
			tableData: [],
		})
		const search = async () => {
			loading.value = true
			const res = await getCategoryList(state.searchForm)
			loading.value = false
			if (res.status === 200 && !isNil(res.data)) {
				state.tableData = res.data
			}
			total.value = res.total
		}
		onMounted(() => {
			search()
		})
		const add = () => {
			visible.value = true
		}
		const edit = (row: Category) => {
			id.value = row.id
			name.value = row.name
			visible.value = true
		}
		const deleteUserById = async (id: number) => {
			loading.value = true
			const data = await deleteCategory(id)
			loading.value = false
			if (data.status === 200) {
				notification.success({
					message: '成功',
					description: '删除成功',
				})
				search()
			}
		}
		const pagination = computed(() => ({
			total: total.value,
			current: state.searchForm.pageNum,
			pageSize: state.searchForm.pageSize,
			defaultPageSize: 2,
			pageSizeOptions: ['2', '5', '10'],
			showSizeChanger: true,
			showTotal: (total: number) => `共 ${total} 条`,
		}))
		const clear = () => {
			state.searchForm = { pageNum: 1, pageSize: 10 }
			search()
		}
		const onChange = (pag: { pageSize: number; current: number }) => {
			state.searchForm.pageNum = pag.current
			state.searchForm.pageSize = pag.pageSize
			search()
		}
		const onCancel = () => {
			id.value = undefined
			name.value = ''
			visible.value = false
		}
		return () => (
			<a-card>
				<a-form layout="inline" model={state.searchForm} style={{ marginBottom: '10px' }}>
					<a-form-item label="分类名">
						<a-input v-model={[state.searchForm.name, 'value']} />
					</a-form-item>
					<a-form-item>
						<a-button type="primary" onClick={search}>
							查询
						</a-button>
						<a-button type="primary" onClick={clear} style="margin-left: 10px">
							清除
						</a-button>
					</a-form-item>
				</a-form>
				<a-button type="primary" onClick={add} loading={loading.value} style={{ marginBottom: '10px' }}>
					添加
				</a-button>
				<a-table
					dataSource={state.tableData}
					columns={columns}
					rowKey="id"
					bordered
					v-slots={{
						bodyCell: ({ column, record }: ATableColumnProp<Category>) => {
							if (column.key === 'action') {
								return (
									<a-space>
										<a-button type="primary" onClick={() => edit(record)}>
											编辑
										</a-button>
										<a-button type="primary" danger onClick={() => deleteUserById(record.id)}>
											删除
										</a-button>
									</a-space>
								)
							}
						},
					}}
					pagination={pagination.value}
					onChange={onChange}
				/>
				<a-modal
					visible={visible.value}
					title={isNil(id.value) ? '添加用户' : '编辑用户'}
					confirmLoading={loading.value}
					destroyOnClose
					onOk={async () => {
						if (isNil(name.value) || isEmpty(name.value)) {
							notification.error({
								message: '错误',
								description: '请输入分类名',
							})
							return
						}
						if (isNil(id.value)) {
							loading.value = true
							const { status } = await addCategory({ name: name.value })
							loading.value = false
							if (status === 200) {
								notification.success({
									message: '成功',
									description: '创建成功',
								})
								onCancel()
								search()
							}
						} else {
							loading.value = true
							const { status } = await updateCategory(id.value, { name: name.value })
							loading.value = false
							if (status === 200) {
								notification.success({
									message: '成功',
									description: '修改成功',
								})
								onCancel()
								search()
							}
						}
					}}
					onCancel={onCancel}
				>
					<a-input v-model={[name.value, 'value']} style={{ width: '200px' }} />
				</a-modal>
			</a-card>
		)
	},
})
