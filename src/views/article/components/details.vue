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
					<a-form-item label="文章标题" name="articleTitle">
						<a-input v-model:value="searchForm.articleTitle" />
					</a-form-item>
					<a-form-item label="文章摘要" name="articleAbstract">
						<a-input v-model:value="searchForm.articleAbstract" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="上传封面">
						<a-upload
							:show-upload-list="false"
							:beforeUpload="beforeUpload"
							:customRequest="uploadSectionFile"
							style="width: 80px; height: 80px"
							class="avatar-uploader"
						>
							<img v-if="searchForm.articleCover" :src="searchForm.articleCover" class="imgAvatar" />
							<div v-else :style="{ lineHeight: '110px' }">
								<LoadingOutlined v-if="loading" />
								<PlusOutlined v-else />
							</div>
						</a-upload>
					</a-form-item>
				</a-col>
			</a-row>
			<div class="grid grid-template-columns3">
				<a-form-item label="标签" name="tagIds">
					<FormTags v-model:value="searchForm.tagIds" mode="multiple" />
				</a-form-item>
				<a-form-item label="分类" name="categoryId">
					<FormCategory v-model:value="searchForm.categoryId" />
				</a-form-item>
				<a-form-item label="是否置顶" name="isTop">
					<a-radio-group v-model:value="searchForm.isTop" name="isTop">
						<a-radio :value="0">否</a-radio>
						<a-radio :value="1">是</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item label="发布形式" name="status">
					<a-radio-group v-model:value="searchForm.status" name="status">
						<a-radio :value="1">公开</a-radio>
						<a-radio :value="2">密码</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item label="访问密码" name="password" v-if="searchForm.status === 2">
					<a-input v-model:value="searchForm.password" />
				</a-form-item>
				<a-form-item label="是否推荐" name="isFeatured">
					<a-radio-group v-model:value="searchForm.isFeatured" name="isFeatured">
						<a-radio :value="0">否</a-radio>
						<a-radio :value="1">是</a-radio>
					</a-radio-group>
				</a-form-item>
			</div>
		</a-form>
		<mavon-editor ref="md" style="height: 500px" v-model="searchForm.articleContent" @imgAdd="uploadImg" />
	</a-modal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { Article, uploadImage, saveArticle, getArticleInfo } from '@/api/article'
import { isEmpty, isNil } from 'lodash'
import { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import { FormTags, FormCategory } from '@/components'
import { rules } from '../utils'
import { infoTips, successTips } from '@/utils'
import * as imageConversion from 'image-conversion'
import markdownToHtml from '@/utils/markdown'

const Props = defineProps({
	visible: {
		type: Boolean,
		required: true,
	},
	id: {
		type: Number,
	},
})
const emits = defineEmits(['close', 'search'])

const loading = ref(false)
const searchForm = ref<Article>({})
const mavon = ref()
const formRef = ref()

watch(
	() => Props.visible,
	async () => {
		if (Props.visible && !isNil(Props.id)) {
			loading.value = true
			const { flag, data } = await getArticleInfo(Props.id)
			loading.value = false
			if (flag && !isNil(data)) {
				searchForm.value = { ...data, articleContent: markdownToHtml(data.articleContent ?? '') }
			}
		}
	}
)

function beforeUpload(file: File) {
	return new Promise((resolve) => {
		if (file.size / 1024 < 200) {
			resolve(file)
		}
		imageConversion.compressAccurately(file, 200).then((res) => {
			resolve(res)
		})
	})
}

async function uploadSectionFile(param: UploadRequestOption) {
	const formData = new FormData()
	formData.append('file', param.file)
	loading.value = true
	const { flag, data } = await uploadImage(formData)
	loading.value = false
	if (flag && !isNil(data)) {
		searchForm.value.articleCover = data
	}
}

async function uploadImg(pos: number, file: File) {
	const formData = new FormData()
	if (file.size / 1024 < 200) {
		formData.append('file', file)
		uploadImage(formData).then(({ data }) => {
			mavon.value.md.$img2Url(pos, data)
		})
	} else {
		imageConversion.compressAccurately(file, 200).then((res) => {
			formData.append('file', new window.File([res], file.name, { type: file.type }))
			uploadImage(formData).then(({ data }) => {
				mavon.value.md.$img2Url(pos, data)
			})
		})
	}
}

const onCancel = () => {
	searchForm.value = {}
	mavon.value = null
	emits('close')
}
const onSubmit = async () => {
	await formRef.value.validate()
	if (isNil(searchForm.value.articleCover) || isEmpty(searchForm.value.articleCover)) {
		infoTips('请上传封面')
		return false
	}
	if (isNil(searchForm.value.articleContent) || isEmpty(searchForm.value.articleContent)) {
		infoTips('请输入文章内容')
		return false
	}
	loading.value = true
	const { flag } = await saveArticle(searchForm.value)
	loading.value = false
	if (flag) {
		successTips('操作成功')
		emits('search')
		onCancel()
	}
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
