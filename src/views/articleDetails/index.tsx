/*
 * @Description: Article
 * @Author: hyx
 * @Date: 2022-09-09 15:59:22
 */

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { defineComponent, onBeforeUnmount, ref, shallowRef } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { IDomEditor } from '@wangeditor/editor'
import { createArticle } from '@/api/articles'

export default defineComponent({
	name: 'ArticleDetails',
	setup() {
		// onMounted(() => {
		// 	getArticleList().then((res) => {
		// 		console.log(res)
		// 	})
		// })
		const editorRef = shallowRef<IDomEditor>()
		const valueHtml = ref('<p>hello</p>')
		const toolbarConfig = {}
		const editorConfig = { placeholder: '请输入内容...' }
		const title = ref('')
		const category = ref('')
		onBeforeUnmount(() => {
			const editor = editorRef.value
			if (editor == null) return
			editor.destroy()
		})
		const save = async () => {
			createArticle({ title: title.value, content: valueHtml.value, category: category.value, author: 'admin' }).then(
				(res) => {
					console.log(res)
				}
			)
		}
		return () => (
			<div>
				<el-input v-model={title.value} />
				<el-input v-model={category.value} />
				<div>
					<Toolbar
						style="border-bottom: 1px solid #ccc"
						editor={editorRef.value}
						defaultConfig={toolbarConfig}
						mode="mode"
					/>
					<Editor
						style="height: 500px; overflow-y: hidden;"
						v-model={valueHtml.value}
						defaultConfig={editorConfig}
						mode="mode"
					/>
				</div>
				<div>
					<el-button type="primary" onClick={save}>
						保存
					</el-button>
				</div>
			</div>
		)
	},
})
