import { Article, ArticleRequest, getArticleList } from '@/api/articles'
import { ATableColumnProp } from '@/interface'
import { timeFormat } from '@/utils'
import { isNil } from 'ramda'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const columns = [
	{
		title: '标题',
		dataIndex: 'title',
		key: 'title',
		align: 'center',
	},
	{
		title: '描述',
		dataIndex: 'desc',
		key: 'desc',
		align: 'center',
	},
	{
		title: '分类',
		key: 'category',
		customRender: ({ record }: ATableColumnProp<Article>) => record.category.name,
		align: 'center',
	},
	{
		title: '创建时间',
		dataIndex: 'createdAt',
		key: 'createdAt',
		customRender: ({ text }: ATableColumnProp<Article>) => timeFormat(text as string),
		align: 'center',
	},
	{
		title: '更新时间',
		dataIndex: 'updatedAt',
		key: 'updatedAt',
		customRender: ({ text }: ATableColumnProp<Article>) => timeFormat(text as string),
		align: 'center',
	},
	{
		title: '操作',
		key: 'action',
		align: 'center',
	},
]

interface State {
	searchForm: ArticleRequest
	tableData: Article[]
}

export default defineComponent({
	name: 'Article',
	setup() {
		const total = ref(0)
		const loading = ref(false)
		const state = reactive<State>({
			searchForm: { pageNum: 1, pageSize: 10 },
			tableData: [],
		})
		const search = async () => {
			loading.value = true
			const { status, data, total: pageTotal } = await getArticleList(state.searchForm)
			loading.value = false
			if (status === 200 && !isNil(data)) {
				state.tableData = data
			}
			total.value = pageTotal
		}
		onMounted(() => {
			search()
		})
		const $router = useRouter()
		const add = () => {
			$router.push({
				name: 'ArticleDetails',
			})
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
		const onChange = (pag: { pageSize: number; current: number }) => {
			state.searchForm.pageNum = pag.current
			state.searchForm.pageSize = pag.pageSize
			search()
		}
		return () => (
			<a-card>
				<a-button type="primary" onClick={add} style={{ marginBottom: '10px' }}>
					添加
				</a-button>
				<a-table
					dataSource={state.tableData}
					columns={columns}
					rowKey="id"
					bordered
					scroll={{ x: 'max-content' }}
					v-slots={{
						bodyCell: ({ column, record }: ATableColumnProp<Article>) => {
							if (column.key === 'action') {
								return (
									<a-space>
										<a-button type="primary">编辑</a-button>
										<a-button type="primary" danger>
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
			</a-card>
		)
	},
})
