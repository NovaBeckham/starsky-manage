import { ArticleRequest } from '@/api/articles'
import { getCategoryList } from '@/api/category'
import { Options } from '@/interface'
import { isNil, map } from 'ramda'
import { defineComponent, onMounted, ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message, UploadChangeParam } from 'ant-design-vue'

export default defineComponent({
	name: 'ArticleDetails',
	setup() {
		const loading = ref(false)
		const searchForm = ref<ArticleRequest>({})
		const categoryList = ref<Options[]>([])
		onMounted(async () => {
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
		return () => (
			<a-card>
				<h3>文章详情</h3>
				<a-form model={searchForm.value}>
					<a-form-item name="title" label="标题">
						<a-input v-model={[searchForm.value.title, 'value']} style={{ width: '200px' }} />
					</a-form-item>
					<a-form-item name="category" label="分类">
						<a-select
							v-model={[searchForm.value.category, 'value']}
							options={categoryList.value}
							style={{ width: '200px' }}
						/>
					</a-form-item>
					<a-form-item name="desc" label="描述">
						<a-textarea v-model={[searchForm.value.title, 'value']} />
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
					<a-form-item name="content" label="文章内容"></a-form-item>
				</a-form>
			</a-card>
		)
	},
})
