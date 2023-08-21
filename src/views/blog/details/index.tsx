/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-07-06 15:16:30
 */

import { Article, addArticle, getInfo, updateArticle, uploadArticleCover } from '@/api/article'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ExposeParam, InsertContentGenerator, MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import EmojiExtension from '@/components/EmojiExtension'
import $styles from './index.module.scss'
import { toolbars } from '@/components/EmojiExtension/staticConfig'
import { isEmpty, isNil } from 'lodash'
import * as imageConversion from 'image-conversion'
import { FormInstance, UploadChangeParam } from 'ant-design-vue'
import { FormCategroy, FormTag } from '@/components'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { errorTips, infoTips, successTips } from '@/utils'

const StatusOptions = [
	{ value: 1, label: '公开' },
	{ value: 2, label: '私密' },
	{ value: 3, label: '草稿' },
]

const Rules = {
	categoryId: [{ required: true, message: '文章分类不能为空', trigger: 'change' }],
	tagIdList: [{ required: true, message: '文章分类不能为空', trigger: 'change' }],
	status: [{ required: true, message: '发布形式不能为空', trigger: 'change' }],
}

export default defineComponent({
	name: 'ArticleDetails',
	setup() {
		const $route = useRoute()
		const $router = useRouter()
		const loading = ref(false)
		const modalOpen = ref(false)
		const { id } = $route.query
		const editorRef = ref<ExposeParam>()
		const articleFormRef = ref<FormInstance>()
		const detailsForm = ref<Article>({})
		const authorization = 'Bearer ' + localStorage.getItem('starskyToken')
		onMounted(() => {
			if (id) {
				loading.value = true
				getInfo(Number(id)).then(({ success, data }) => {
					loading.value = false
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
		const beforeUpload = (rawFile: File) => {
			return new Promise((resolve) => {
				if (rawFile.size / 1024 < 200) {
					resolve(rawFile)
				}
				// 压缩到200KB,这里的200就是要压缩的大小,可自定义
				imageConversion.compressAccurately(rawFile, 200).then((res) => {
					resolve(res)
				})
			})
		}
		const getImageRender = () => {
			if (!isNil(detailsForm.value.articleCover) && !isEmpty(detailsForm.value.articleCover)) {
				return <img src={detailsForm.value.articleCover} width={360} />
			} else {
				if (loading.value) {
					return <LoadingOutlined />
				} else {
					return (
						<div>
							<a>点击上传</a>
						</div>
					)
				}
			}
		}
		const handleChange = (info: UploadChangeParam) => {
			if (info.file.status === 'uploading') {
				loading.value = true
				return
			}
			if (info.file.status === 'done') {
				detailsForm.value.articleCover = info.file.response.data
				loading.value = false
			}
			if (info.file.status === 'error') {
				loading.value = false
				errorTips('上传失败')
			}
		}
		const save = async () => {
			await articleFormRef.value?.validate()
			if (isNil(detailsForm.value.articleCover) || isEmpty(detailsForm.value.articleCover)) {
				infoTips('请上传缩略图')
				return
			}
			const func = isNil(id) ? addArticle : updateArticle
			loading.value = true
			const { success } = await func(detailsForm.value)
			loading.value = false
			if (success) {
				successTips('保存成功')
				$router.push('/article')
			}
		}
		const openModal = () => {
			if (isNil(detailsForm.value.articleTitle) || isEmpty(detailsForm.value.articleTitle)) {
				infoTips('文章标题不能为空')
				return
			}
			if (isNil(detailsForm.value.articleContent) || isEmpty(detailsForm.value.articleContent)) {
				infoTips('文章内容不能为空')
				return
			}
			modalOpen.value = true
		}
		const onCancel = () => {
			detailsForm.value.categoryId = undefined
			detailsForm.value.status = undefined
			detailsForm.value.tagList = undefined
			detailsForm.value.articleCover = undefined
			modalOpen.value = false
		}
		return () => (
			<div class="app-container">
				<div class={$styles.headerContainer}>
					<a-input v-model={[detailsForm.value.articleTitle, 'value']} placeholder="请输入文章标题" />
					<a-button type="primary" style={{ marginLeft: '10px' }} onClick={openModal}>
						发布文章
					</a-button>
				</div>
				<div>
					<MdEditor
						ref={editorRef}
						v-model={detailsForm.value.articleContent}
						theme="dark"
						toolbars={toolbars}
						v-slots={{ defToolbars: () => <EmojiExtension onInsert={insert} /> }}
						onUploadImg={uploadImg}
						class={$styles.mdContainer}
					/>
				</div>
				<a-modal title="发布文章" open={modalOpen.value} destroyOnClose onOk={save} onCancel={onCancel} width="50%">
					<a-form
						ref={articleFormRef}
						model={detailsForm.value}
						rules={Rules}
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 16 }}
					>
						<a-form-item name="categoryId" label="文章分类">
							<FormCategroy v-model={[detailsForm.value.categoryId, 'value']} />
						</a-form-item>
						<a-form-item name="tagIdList" label="文章标签">
							<FormTag v-model={[detailsForm.value.tagIdList, 'value']} mode="tags" />
						</a-form-item>
						<a-form-item name="articleCover" label="缩略图">
							<a-upload
								accept="image/*"
								headers={{ Authorization: authorization }}
								action="/api/admin/article/upload"
								beforeUpload={beforeUpload}
								onChange={handleChange}
								onRemove={() => (detailsForm.value.articleCover = '')}
							>
								{getImageRender}
							</a-upload>
						</a-form-item>
						<a-form-item name="status" label="发布形式">
							<a-radio-group v-model={[detailsForm.value.status, 'value']} options={StatusOptions} />
						</a-form-item>
					</a-form>
				</a-modal>
			</div>
		)
	},
})
