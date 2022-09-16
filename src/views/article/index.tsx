/*
 * @Description: Article
 * @Author: hyx
 * @Date: 2022-09-09 15:59:22
 */

import { getArticleList } from '@/api/articles'
import { defineComponent, onActivated, onMounted, ref } from 'vue'

interface ArticleList {
	title: string
	content: string
	desc?: string
	author?: string
	tags?: string
	category?: number
	love?: number
	watch?: number
	createdAt: string
}

export default defineComponent({
	name: 'Article',
	setup() {
		onMounted(() => {
			getArticleList().then((res) => {
				console.log(res)
			})
		})
		const tableData = ref<ArticleList[]>([])
		return () => (
			<div>
				<el-table data={tableData.value} style={{ width: '100%' }}>
					<el-table-column prop="title" label="标题" />
					<el-table-column prop="createdAt" label="发布日期" />
					<el-table-column prop="category" label="分类" />
					<el-table-column prop="tags" label="标签" />
				</el-table>
			</div>
		)
	},
})
