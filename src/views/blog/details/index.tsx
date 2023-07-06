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
import { FormInstance, UploadChangeParam, notification } from 'ant-design-vue'
import { FormCategroy } from '@/components'
import { LoadingOutlined } from '@ant-design/icons-vue'

export default defineComponent({
	name: 'ArticleDetails',
	setup() {
		const $route = useRoute()
		const $router = useRouter()
		const loading = ref(false)
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
			if (!isNil(detailsForm.value.cover) && !isEmpty(detailsForm.value.cover)) {
				return <img src={detailsForm.value.cover} width={360} />
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
				console.log('info', info)
				loading.value = false
			}
			if (info.file.status === 'error') {
				loading.value = false
				notification.error({
					message: '错误',
					description: '上传失败',
				})
			}
		}
		const save = async () => {
			if (isNil(detailsForm.value.title) || isEmpty(detailsForm.value.title)) {
				notification.info({
					message: '提示',
					description: '请输入文章标题',
				})
				return
			}
			if (isNil(detailsForm.value.cid)) {
				notification.info({
					message: '提示',
					description: '请选择文章分类',
				})
				return
			}
			if (isNil(detailsForm.value.cover) || isEmpty(detailsForm.value.cover)) {
				notification.info({
					message: '提示',
					description: '请上传缩略图',
				})
				return
			}
			if (isNil(detailsForm.value.content) || isEmpty(detailsForm.value.content)) {
				notification.info({
					message: '提示',
					description: '请输入文章内容',
				})
				return
			}
			const func = isNil(id) ? addArticle : updateArticle
			loading.value = true
			const { success } = await func(detailsForm.value)
			loading.value = false
			if (success) {
				notification.success({
					message: '成功',
					description: '保存成功',
				})
				$router.push('/article')
			}
		}
		return () => (
			<div class="app-container">
				<a-form model={detailsForm.value} ref={articleFormRef}>
					<a-form-item name="title" label="文章标题">
						<a-input v-model={[detailsForm.value.title, 'value']} />
					</a-form-item>
					<a-form-item name="cid" label="文章分类">
						<FormCategroy v-model={[detailsForm.value.cid, 'value']} />
					</a-form-item>
					<a-form-item name="cover" label="缩略图">
						<a-upload
							accept="image/*"
							headers={{ Authorization: authorization }}
							action="/api/admin/article/upload"
							beforeUpload={beforeUpload}
							onChange={handleChange}
							onRemove={() => (detailsForm.value.cover = '')}
						>
							{getImageRender}
						</a-upload>
					</a-form-item>
				</a-form>
				<div>
					<MdEditor
						ref={editorRef}
						v-model={detailsForm.value.content}
						theme="dark"
						toolbars={toolbars}
						v-slots={{ defToolbars: () => <EmojiExtension onInsert={insert} /> }}
						onUploadImg={uploadImg}
						class={$styles.mdContainer}
					/>
				</div>
				<div>
					<a-button type="primary" onClick={save}>
						保存
					</a-button>
				</div>
			</div>
		)
	},
})
