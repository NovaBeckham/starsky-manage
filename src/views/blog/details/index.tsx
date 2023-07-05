import { Article, getInfo, uploadArticleCover } from '@/api/article'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ExposeParam, InsertContentGenerator, MdEditor } from 'md-editor-v3'
import EmojiExtension from '@/components/EmojiExtension'
import $styles from './index.module.scss'
import { toolbars } from '@/components/EmojiExtension/staticConfig'
import { isNil } from 'lodash'

export default defineComponent({
	name: 'ArticleDetails',
	setup() {
		const $route = useRoute()
		const articleId = $route.params.id
		const editorRef = ref<ExposeParam>()
		const detailsForm = ref<Article>({})
		onMounted(() => {
			if (articleId) {
				getInfo(Number(articleId)).then(({ success, data }) => {
					if (success && !isNil(data)) {
						detailsForm.value = data
					}
				})
			}
		})
		const insert = (generator: InsertContentGenerator) => {
			editorRef.value?.insert(generator)
		}
		const uploadImg = async (files: Array<File>, callback: (urls: string[]) => void) => {
			const res = await Promise.all(
				files.map((file) => {
					return new Promise((rev, rej) => {
						const form = new FormData()
						form.append('file', file)
						uploadArticleCover(form)
							.then((res) => {
								if (res.success) {
									rev(res)
								}
							})
							.catch((error: any) => rej(error))
					})
				})
			)
			callback(res.map((item: any) => item.data))
		}
		return () => (
			<div class="app-container">
				<a-form model={detailsForm.value}>
					<a-form-item name="title" label="文章标题">
						<a-input v-model={[detailsForm.value.title, 'value']} />
					</a-form-item>
				</a-form>
				<div>
					<MdEditor
						ref={editorRef}
						v-model={[detailsForm.value.content, 'value']}
						theme="dark"
						toolbars={toolbars}
						v-slots={{ defToolbars: () => <EmojiExtension onInsert={insert} /> }}
						onUploadImg={uploadImg}
						class={$styles.mdContainer}
					/>
				</div>
			</div>
		)
	},
})
