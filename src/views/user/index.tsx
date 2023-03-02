/*
 * @Description: 用户列表
 * @Author: hyx
 * @Date: 2023-02-28 17:25:22
 */

import { deleteUser, getUserList, User, UserRequest } from '@/api/user'
import { ATableColumnProp } from '@/interface'
import { timeFormat } from '@/utils'
import { notification } from 'ant-design-vue'
import { isNil } from 'ramda'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import UserDetails from './components/details'

const columns = [
	{
		title: '用户名',
		dataIndex: 'username',
		key: 'username',
		align: 'center',
	},
	{
		title: '角色',
		dataIndex: 'role',
		key: 'role',
		customRender: ({ text }: ATableColumnProp<User>) => (
			<a-tag color={text === 1 ? 'error' : 'success'}>{text === 1 ? '管理员' : '游客'}</a-tag>
		),
		align: 'center',
	},
	{
		title: '创建时间',
		dataIndex: 'createdAt',
		key: 'createdAt',
		customRender: ({ text }: ATableColumnProp<User>) => timeFormat(text as string),
		align: 'center',
	},
	{
		title: '操作',
		key: 'action',
		align: 'center',
	},
]

interface State {
	searchForm: UserRequest
	tableData: User[]
	detailsUser: { id?: number; visible: boolean }
}

export default defineComponent({
	name: 'User',
	setup() {
		const total = ref(0)
		const loading = ref(false)
		const state = reactive<State>({
			searchForm: { pageNum: 1, pageSize: 10 },
			tableData: [],
			detailsUser: { visible: false },
		})
		const search = async () => {
			loading.value = true
			const res = await getUserList(state.searchForm)
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
			state.detailsUser = { visible: true }
		}
		const edit = (row: User) => {
			state.detailsUser = { id: row.id, visible: true }
		}
		const deleteUserById = async (id: number) => {
			loading.value = true
			const data = await deleteUser(id)
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
		return () => (
			<a-card>
				<a-form layout="inline" model={state.searchForm} style={{ marginBottom: '10px' }}>
					<a-form-item label="用户名">
						<a-input v-model={[state.searchForm.username, 'value']} />
					</a-form-item>
					{/* <a-form-item label="角色">
						<a-select
							v-model={[state.searchForm.role, 'value']}
							options={[
								{ value: 1, label: '管理员' },
								{ value: 2, label: '订阅者' },
							]}
							style={{ width: '200px' }}
						/>
					</a-form-item> */}
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
					v-slots={{
						bodyCell: ({ column, record }: ATableColumnProp<User>) => {
							if (column.key === 'action') {
								return (
									<>
										<a-button type="link" onClick={() => edit(record)}>
											编辑
										</a-button>
										<a-button type="link" danger onClick={() => deleteUserById(record.id)}>
											删除
										</a-button>
									</>
								)
							}
						},
					}}
					pagination={pagination.value}
					onChange={onChange}
				/>
				<UserDetails
					visible={state.detailsUser.visible}
					id={state.detailsUser.id}
					onCancel={() => {
						state.detailsUser = { visible: false }
					}}
					onSearch={search}
				/>
			</a-card>
		)
	},
})
