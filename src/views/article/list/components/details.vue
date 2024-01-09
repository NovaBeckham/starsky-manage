<template>
	<a-modal
		:open="Props.visible"
		title="文章详情"
		destroyOnClose
		width="80%"
		@cancel="onCancel"
		@ok="onSubmit"
		:confirmLoading="loading"
	>
		<a-form :model="searchForm" ref="formRef" :rules="rules" :wrapperCol="{ span: 14 }">
			<a-row>
				<a-col :span="14">
					<a-form-item label="文章名称" name="title">
						<a-input v-model:value="searchForm.title" />
					</a-form-item>
					<a-form-item label="文章简介" name="summary">
						<a-input v-model:value="searchForm.summary" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="缩略图">
						<a-row>
							<a-col :span="2">
								<a-popover title="随机获取一张图片" v-model:open="popoverVisible" trigger="hover">
									<template #content>
										<a-button type="link" :loading="loading" @click="popoverVisible = false">取消</a-button>
										<a-button type="primary" :loading="loading" @click="randomImg">确定</a-button>
									</template>
									<QuestionCircleOutlined />
								</a-popover>
							</a-col>
							<a-col :span="2">
								<a-upload
									:action="uploadPictureHost"
									:show-upload-list="false"
									:customRequest="uploadSectionFile"
									style="width: 80px; height: 80px"
									class="avatar-uploader"
								>
									<img v-if="searchForm.avatar" :src="searchForm.avatar" class="imgAvatar" />
									<div v-else :style="{ lineHeight: '110px' }">
										<LoadingOutlined v-if="loading" />
										<PlusOutlined v-else />
									</div>
								</a-upload>
							</a-col>
						</a-row>
					</a-form-item>
				</a-col>
			</a-row>
			<div class="grid grid-template-columns3">
				<a-form-item label="标签" name="tags">
					<FormTags v-model:value="searchForm.tags" mode="multiple" />
				</a-form-item>
				<a-form-item label="分类" name="categoryId">
					<FormCategory v-model:value="searchForm.categoryId" />
				</a-form-item>
				<a-form-item label="是否置顶" name="isStick">
					<a-radio-group v-model:value="searchForm.isStick" name="isStick">
						<a-radio :value="0">否</a-radio>
						<a-radio :value="1">是</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item label="是否发布" name="isPublish">
					<a-radio-group v-model:value="searchForm.isPublish" :options="publishList" />
				</a-form-item>
				<a-form-item label="阅读方式" name="readType">
					<a-select v-model:value="searchForm.readType" :options="readTypeList" />
				</a-form-item>
				<a-form-item label="创作类型" name="isOriginal">
					<a-radio-group v-model:value="searchForm.isOriginal" name="isOriginal">
						<a-radio :value="0">转载</a-radio>
						<a-radio :value="1">原创</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item label="原文链接" name="originalUrl" v-if="searchForm.isOriginal === 0">
					<a-input v-model="searchForm.originalUrl" />
				</a-form-item>
				<a-form-item label="是否推荐" name="isRecommend">
					<a-radio-group v-model:value="searchForm.isRecommend" name="isRecommend">
						<a-radio :value="0">否</a-radio>
						<a-radio :value="1">是</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item label="是否首页轮播" name="isCarousel">
					<a-radio-group v-model:value="searchForm.isCarousel" name="isCarousel">
						<a-radio :value="0">否</a-radio>
						<a-radio :value="1">是</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item label="SEO关键词" name="keywords">
					<a-input v-model:value="searchForm.keywords" />
				</a-form-item>
			</div>
		</a-form>
		<mavon-editor ref="mavon" v-model="searchForm.contentMd" />
	</a-modal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { PlusOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
import { ArticleDto, getRandomImg, uploadImage, getArticleInfo } from '@/api/article'
import { isEmpty, isNil } from 'lodash'
import { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import { FormTags, FormCategory } from '@/components'
import { publishList, readTypeList, rules } from '../utils'
import { infoTips } from '@/utils'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const Props = defineProps({
	visible: {
		type: Boolean,
		required: true,
	},
	id: {
		type: Number,
	},
})
const emits = defineEmits(['close'])

const loading = ref(false)
const popoverVisible = ref(false)
const searchForm = ref<ArticleDto>({
	// avatar: 'https://starsky-blog.oss-cn-guangzhou.aliyuncs.com/article/cc830ac85c406dc7586edf1eb7838316.jpg',
})
const mavon = ref()
const formRef = ref()
const uploadPictureHost = baseUrl + '/article/system/images'

watch(
	() => Props.visible,
	async () => {
		if (Props.visible && !isNil(Props.id)) {
			loading.value = true
			const { flag, data } = await getArticleInfo(Props.id)
			loading.value = false
			if (flag && !isNil(data)) {
				searchForm.value = data
			}
		}
	}
)

async function uploadSectionFile(param: UploadRequestOption) {
	console.log('param', param)
	const formData = new FormData()
	formData.append('file', param.file)
	loading.value = true
	const { flag, data } = await uploadImage(formData)
	loading.value = false
	if (flag && !isNil(data)) {
		searchForm.value.avatar = data
	}
}

async function randomImg() {
	loading.value = true
	const { flag, data } = await getRandomImg()
	loading.value = false
	if (flag && !isNil(data)) {
		searchForm.value.avatar = data
		popoverVisible.value = false
	}
}

const onCancel = () => {
	console.log('onCancel')
	searchForm.value = {}
	mavon.value = null
	emits('close')
}
const onSubmit = () => {
	formRef.value.validate().then(() => {
		if (isNil(searchForm.value.avatar) || isEmpty(searchForm.value.avatar)) {
			infoTips('请上传缩略图')
			return false
		}
		if (isNil(searchForm.value.contentMd) || isEmpty(searchForm.value.contentMd)) {
			infoTips('请输入文章内容')
			return false
		}
	})
}
</script>
<style lang="scss">
.avatar-uploader {
	.ant-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		width: 200px;
		height: 110px;
		overflow: hidden;
		display: inline-block;
		text-align: center;
	}
}
.avatar-uploader {
	.ant-upload:hover {
		border-color: #409eff;
	}
}
.imgAvatar {
	width: 200px;
	height: 110px;
	display: block;
}
</style>
