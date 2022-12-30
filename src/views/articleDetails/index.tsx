/*
 * @Description: Article
 * @Author: hyx
 * @Date: 2022-09-09 15:59:22
 */

import { defineComponent, reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import $styles from './index.module.scss'
import { createArticle } from '@/api/articles'

interface ArticleData {
	id?: number
	title?: string
	content?: string
	cover?: string
	categoryName?: string
	tagNames?: string[]
	isTop?: number
	type?: number
	status?: number
}

export default defineComponent({
	name: 'ArticleDetails',
	setup() {
		const visible = ref(false)
		const searchForm = reactive<ArticleData>({})
		const categorys = reactive<string[]>([])

		const openModel = () => {
			console.log('title', searchForm.title)
			console.log('content', searchForm.content)
		}
		const removeCategory = () => {
			searchForm.categoryName = undefined
		}
		return () => (
			<el-card>
				<div class={$styles.title}>
					<el-input v-model={searchForm.title} size="large" placeholder="输入文章标题" />
					<el-button type="danger" size="large" onClick={openModel} style="margin-left: 10px">
						发布文章
					</el-button>
				</div>
				<MdEditor v-model={searchForm.content} />
				<el-dialog v-model={visible.value}>
					<el-form model={searchForm}>
						<el-form-item label="文章分类">
							<el-tag type="success" v-show={searchForm.categoryName} closable={true} onClose={removeCategory}>
								{searchForm.categoryName}
							</el-tag>
							<el-popover placement="bottom-start" width="460" trigger="click" v-if="!article.categoryName">
								<div class="popover-title">分类</div>
								<div class="popover-container">{categorys.map((item) => item)}</div>
								<el-button type="success" plain slot="reference" size="small">
									添加分类
								</el-button>
							</el-popover>
						</el-form-item>
					</el-form>
				</el-dialog>
			</el-card>
		)
	},
})
