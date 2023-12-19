<template>
	<a-modal
		:open="Props.visible"
		title="文章详情"
		destroyOnClose
		width="80%"
		@cancel="onCancel"
		@ok="submit"
		:confirmLoading="loading"
	>
		<a-form :model="searchForm" :wrapperCol="{ span: 14 }">
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
		</a-form>
		<mavon-editor ref="mavon" v-model="searchForm.contentMd" />
	</a-modal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { PlusOutlined, LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
import { Article, getRandomImg, uploadImage } from '@/api/article'
import { isNil } from 'lodash'
import { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const Props = defineProps({
	visible: {
		type: Boolean,
		required: true,
	},
})
const emits = defineEmits(['close'])

const loading = ref(false)
const popoverVisible = ref(false)
const searchForm = ref<Article>({
	// avatar: 'https://starsky-blog.oss-cn-guangzhou.aliyuncs.com/article/cc830ac85c406dc7586edf1eb7838316.jpg',
})
const mavon = ref()
const uploadPictureHost = baseUrl + '/article/system/images'

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
const submit = () => {
	console.log('submit', searchForm.value)
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
