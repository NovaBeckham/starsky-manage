/*
 * @Description: Article
 * @Author: hyx
 * @Date: 2022-09-09 15:59:22
 */

import { getArticleList } from '@/api/articles'
import { ElTableColumnProp } from '@/interface'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Category {
	id: number
	name: string
}

interface ArticleList {
	title: string
	content: string
	desc?: string
	author?: string
	tags?: string
	category: Category
	love?: number
	watch?: number
	createdAt: string
}

export default defineComponent({
	name: 'Article',
	setup() {
		onMounted(() => {
			getArticleList().then((res) => {
				if (res.data) {
					tableData.value = res.data
				}
			})
		})
		const $router = useRouter()
		const add = () => {
			$router.push({
				name: 'ArticleDetails',
			})
		}
		const tableData = ref<ArticleList[]>([])
		return () => (
			<div>
				<el-button type="primary" onClick={add}>
					添加
				</el-button>
				<el-table data={tableData.value} style={{ width: '100%' }}>
					<el-table-column prop="title" label="标题" align="center" />
					<el-table-column prop="createdAt" label="发布日期" align="center" />
					<el-table-column
						prop="category"
						label="分类"
						align="center"
						v-slots={{
							default: ({ row }: ElTableColumnProp<ArticleList>) => row.category.name,
						}}
					/>
				</el-table>
			</div>
		)
	},
})
