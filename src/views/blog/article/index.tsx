/*
 * @Description: 文章列表
 * @Author: hyx
 * @Date: 2023-06-26 15:23:02
 */

import { Article, getArticleList } from '@/api/article'
import { categoryFilter } from '@/filter'
import { ATableColumnProp } from '@/interface'
import { timeFormat } from '@/utils'
import { isNil } from 'lodash'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { FormOutlined } from '@ant-design/icons-vue'

const columns = [
	{
		title: '标题',
		dataIndex: 'title',
		key: 'title',
		align: 'center',
	},
	{
		title: '分类',
		key: 'cid',
		align: 'center',
		dataIndex: 'cid',
		customRender: ({ text }: ATableColumnProp<number>) => <a-tag color="blue">{categoryFilter(text)}</a-tag>,
	},
	{
		title: '缩略图',
		key: 'cover',
		align: 'center',
		width: 180,
		customRender: ({ record }: ATableColumnProp<Article>) => <a-image src={record.cover} />,
	},
	{
		title: '创建时间',
		key: 'createTime',
		align: 'center',
		customRender: ({ record }: ATableColumnProp<Article>) => timeFormat(record.createTime ?? ''),
	},
	{
		title: '操作',
		key: 'action',
		align: 'center',
	},
]

export default defineComponent({
	name: 'Article',
	setup() {
		const tableData = ref<Article[]>([])
		const total = ref(0)
		const pageNum = ref(0)
		const pageSize = ref(0)
		const loading = ref(false)
		const getList = async (current: number, size: number) => {
			loading.value = true
			const { success, data } = await getArticleList({ current, size })
			loading.value = false
			if (success && !isNil(data) && !isNil(data.record)) {
				tableData.value = data.record
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
		return () => (
			<div class="app-container">
				<a-table
					dataSource={tableData.value}
					columns={columns}
					loading={loading.value}
					rowKey="id"
					bordered
					v-slots={{
						bodyCell: ({ column, record }: ATableColumnProp<Article>) => {
							if (column.key === 'action') {
								return (
									<>
										<a-button
											type="link"
											loading={loading.value}
											onClick={() => {
												console.log('title', record.title)
											}}
										>
											<FormOutlined />
											编辑
										</a-button>
									</>
								)
							}
						},
					}}
					pagination={pagination.value}
					onChange={handleChange}
				/>
			</div>
		)
	},
})
