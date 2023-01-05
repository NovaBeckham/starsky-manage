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
import { getTagList } from '@/api/tags'

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

		const openModel = async () => {
			if (isNil(tagsList.value) || isEmpty(tagsList.value)) {
				const { data } = await getTagList()
				console.log('data', data)
				if (!isNil(data)) {
					tagsList.value = data
				}
			}
			visible.value = true
		}
		const removeCategory = (item: string) => {
			if (searchForm.tags) {
				const index = findIndex((val) => val === item, searchForm.tags)
				if (index > -1) {
					searchForm.tags.splice(index, 1)
				}
			}
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
						<el-form-item label="文章标签" prop="tag">
							{!isNil(searchForm.tags) &&
								!isEmpty(searchForm.tags) &&
								map((item) => {
									return (
										<el-tag type="success" style="margin: 0 1rem 0 0" closable onClose={() => removeCategory(item)}>
											{item}
										</el-tag>
									)
								}, searchForm.tags)}
							{or(isNil(searchForm.tags), searchForm.tags && searchForm.tags.length < 3) && (
								<el-popover
									placement="bottom-start"
									width="460"
									trigger="click"
									v-slots={{
										reference: () => {
											return (
												<el-button type="success" plain size="small">
													添加标签
												</el-button>
											)
										},
									}}
								>
									<div class="popover-container">
										<el-select v-model={searchForm.tags} multiple>
											{map((item) => {
												return <el-option key={item.id} label={item.name} value={item.name} />
											}, tagsList.value)}
										</el-select>
									</div>
								</el-popover>
							)}
						</el-form-item>
					</el-form>
				</el-dialog>
			</el-card>
		)
	},
})
