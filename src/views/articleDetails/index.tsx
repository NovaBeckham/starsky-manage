/*
 * @Description: Article
 * @Author: hyx
 * @Date: 2022-09-09 15:59:22
 */

import { defineComponent, reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import $styles from './index.module.scss'
import { and, findIndex, isEmpty, isNil, map, or } from 'ramda'

interface ArticleData {
	id?: number
	title?: string
	content?: string
	cover?: string
	tags?: string[]
	isTop?: number
	type?: number
	status?: number
}

export default defineComponent({
	name: 'ArticleDetails',
	setup() {
		const visible = ref(false)
		const searchForm = reactive<ArticleData>({})
		const tagsList = ref<{ name: string; id: number }[]>([])

		// const openModel = async () => {
		// 	if (isNil(tagsList.value) || isEmpty(tagsList.value)) {
		// 		const { data } = await getTagList()
		// 		console.log('data', data)
		// 		if (!isNil(data)) {
		// 			tagsList.value = data
		// 		}
		// 	}
		// 	visible.value = true
		// }
		const removeCategory = (item: string) => {
			if (searchForm.tags) {
				const index = findIndex((val) => val === item, searchForm.tags)
				if (index > -1) {
					searchForm.tags.splice(index, 1)
				}
			}
		}
		return () => (
			<a-card>
				<div class={$styles.title}>
					<a-input v-model={searchForm.title} size="large" placeholder="输入文章标题" />
					{/* <a-button type="danger" size="large" onClick={openModel} style="margin-left: 10px">
						发布文章
					</a-button> */}
				</div>
				<MdEditor v-model={searchForm.content} />
				<a-dialog v-model={visible.value}>
					<a-form model={searchForm}>
						<a-form-item label="文章标签" prop="tag">
							{!isNil(searchForm.tags) &&
								!isEmpty(searchForm.tags) &&
								map((item) => {
									return (
										<a-tag type="success" style="margin: 0 1rem 0 0" closable onClose={() => removeCategory(item)}>
											{item}
										</a-tag>
									)
								}, searchForm.tags)}
							{or(isNil(searchForm.tags), searchForm.tags && searchForm.tags.length < 3) && (
								<a-popover
									placement="bottom-start"
									width="460"
									trigger="click"
									v-slots={{
										reference: () => {
											return (
												<a-button type="success" plain size="small">
													添加标签
												</a-button>
											)
										},
									}}
								>
									<div class="popover-container">
										<a-select v-model={searchForm.tags} multiple>
											{map((item) => {
												return <a-option key={item.id} label={item.name} value={item.name} />
											}, tagsList.value)}
										</a-select>
									</div>
								</a-popover>
							)}
						</a-form-item>
					</a-form>
				</a-dialog>
			</a-card>
		)
	},
})
