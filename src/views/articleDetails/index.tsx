/*
 * @Description: Article
 * @Author: hyx
 * @Date: 2022-09-09 15:59:22
 */

import { defineComponent, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import $styles from './index.module.scss'
// import { createArticle } from '@/api/articles'

export default defineComponent({
	name: 'ArticleDetails',
	setup() {
		const text = ref('# Hello Editor')
		const title = ref('')

		const openModel = () => {
			console.log('title', title.value)
			console.log('text.value', text.value)
		}
		return () => (
			<el-card>
				<div class={$styles.title}>
					<el-input v-model={title.value} size="large" placeholder="输入文章标题" />
					<el-button type="danger" size="large" onClick={openModel} style="margin-left: 10px">
						发布文章
					</el-button>
				</div>
				<MdEditor v-model={text.value} />
			</el-card>
		)
	},
})
