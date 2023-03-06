import { ArticleRequest, createArticle, getArticleInfo, updateArticle } from '@/api/articles'
import { getCategoryList } from '@/api/category'
import { Options } from '@/interface'
import { isEmpty, isNil, map } from 'ramda'
import { defineComponent, onMounted, ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message, notification, UploadChangeParam } from 'ant-design-vue'
import MyEditor from '@/components/editor'
import { useRoute } from 'vue-router'

const rules = {
	title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
	cate: [{ required: true, type: 'number', message: '请选择文章分类', trigger: 'change' }],
	desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
}

interface AForm {
	validate: () => Promise<ArticleResponse>
}

interface ArticleResponse {
	id?: number
	cate?: number
	desc?: string
	content?: string
	title?: string
	createdAt?: string
	img?: string
}

export default defineComponent({
	name: 'ArticleDetails',
	setup() {
		const $route = useRoute()
		const { id } = $route.query
		const loading = ref(false)
		const searchForm = ref<ArticleResponse>({})
		const categoryList = ref<Options[]>([])
		const searchFormRef = ref<AForm>()
		const getArticleDetails = async (id: number) => {
			const { status, data } = await getArticleInfo(id)
			if (status === 200 && !isNil(data)) {
				searchForm.value = {
					...data,
					cate: data.category?.id,
				}
			}
		}
		onMounted(async () => {
			console.log('2', id)
			loading.value = true
			const { status, data } = await getCategoryList({})
			loading.value = false
			if (status === 200 && !isNil(data)) {
				categoryList.value = map((item) => {
					return {
						value: item.id,
						label: item.name,
					}
				}, data)
			}
			if (!isNil(id)) {
				loading.value = true
				getArticleDetails(Number(id))
				loading.value = false
			}
		})
		const upChange = (info: UploadChangeParam) => {
			if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList)
			}
			if (info.file.status === 'done') {
				message.success('图片上传成功')
				searchForm.value.img = info.file.response.url
			} else if (info.file.status === 'error') {
				message.error('图片上传失败')
				searchForm.value.img = ''
			}
		}
		const submit = async () => {
			await searchFormRef.value?.validate()
			if (isNil(searchForm.value.img) || isEmpty(searchForm.value.img)) {
				notification.error({
					message: '错误',
					description: '请上传图片',
				})
				return
			}
			if (isNil(searchForm.value.content) || isEmpty(searchForm.value.content)) {
				notification.error({
					message: '错误',
					description: '请输入文章内容',
				})
				return
			}
			if (isNil(id)) {
				loading.value = true
				const { status } = await createArticle({
					...searchForm.value,
					category: { id: searchForm.value.cate as number, name: '' },
				})
				loading.value = false
				if (status === 200) {
					notification.success({
						message: '成功',
						description: '创建成功',
					})
				}
			} else {
				loading.value = true
				const { status } = await updateArticle(Number(id), {
					...searchForm.value,
					category: { id: searchForm.value.cate as number, name: '' },
				})
				loading.value = false
				if (status === 200) {
					notification.success({
						message: '成功',
						description: '修改成功',
					})
				}
			}
		}
		return () => (
			<a-card>
				<h3>文章详情</h3>
				<a-form model={searchForm.value} rules={rules} ref={searchFormRef}>
					<a-form-item name="title" label="标题">
						<a-input v-model={[searchForm.value.title, 'value']} style={{ width: '200px' }} />
					</a-form-item>
					<a-form-item name="cate" label="分类">
						<a-select
							v-model={[searchForm.value.cate, 'value']}
							options={categoryList.value}
							style={{ width: '200px' }}
						/>
					</a-form-item>
					<a-form-item name="desc" label="描述">
						<a-textarea v-model={[searchForm.value.desc, 'value']} />
					</a-form-item>
					<a-form-item name="img" label="文章缩略图">
						<a-upload
							name="file"
							action="http://localhost:3000/api/v1/upload"
							headers={{
								Authorization: `Bearer ${localStorage.getItem('starToken')}`,
								'AccessKey-ID': 'LTAI5tFXJ2bpdLmRvXpHZxu2',
								'AccessKey-Secret': 'wsQ1ph4ymSkQXcA3nI883GP9wYQRsd',
							}}
							onChange={upChange}
							listType="picture"
						>
							<a-button>
								<UploadOutlined />
								点击上传
							</a-button>
						</a-upload>
					</a-form-item>
					<a-form-item name="content" label="文章内容">
						<MyEditor
							v-model={[searchForm.value.content, 'content']}
							onSearch={(content: string) => (searchForm.value.content = content)}
						/>
					</a-form-item>
					<a-form-item>
						<a-button type="primary" loading={loading.value} onClick={submit}>
							提交
						</a-button>
					</a-form-item>
				</a-form>
			</a-card>
		)
	},
})
