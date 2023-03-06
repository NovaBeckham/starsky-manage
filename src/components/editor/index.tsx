import tinymce from 'tinymce/tinymce'
import 'tinymce/models/dom'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/plugins/advlist/plugin.min.js'
import 'tinymce/plugins/anchor/plugin.min.js'
import 'tinymce/plugins/autolink/plugin.min.js'
import 'tinymce/plugins/autosave/plugin.min.js'
import 'tinymce/plugins/code/plugin.min.js'
import 'tinymce/plugins/codesample/plugin.min.js'
import 'tinymce/plugins/directionality/plugin.min.js'
import 'tinymce/plugins/fullscreen/plugin.min.js'
import 'tinymce/plugins/insertdatetime/plugin.min.js'
import 'tinymce/plugins/image/plugin.min.js'
import 'tinymce/plugins/link/plugin.min.js'
import 'tinymce/plugins/lists/plugin.min.js'
import 'tinymce/plugins/media/plugin.min.js'
import 'tinymce/plugins/nonbreaking/plugin.min.js'
import 'tinymce/plugins/pagebreak/plugin.min.js'
import 'tinymce/plugins/preview/plugin.min.js'
import 'tinymce/plugins/save/plugin.min.js'
import 'tinymce/plugins/searchreplace/plugin.min.js'
import 'tinymce/plugins/template/plugin.min.js'
import 'tinymce/plugins/visualblocks/plugin.min.js'
import 'tinymce/plugins/visualchars/plugin.min.js'
import 'tinymce/plugins/wordcount/plugin.min.js'
import { defineComponent, ref, onMounted, PropType, watch, onUnmounted } from 'vue'
import axios from 'axios'
import { clone } from 'ramda'

const Props = {
	content: {
		type: String as PropType<string>,
		default: '',
	},
} as const

export default defineComponent({
	props: Props,
	emits: ['search'],
	name: 'my-editor',
	setup(props, { emit }) {
		const tinymceHtml = ref(clone(props.content))
		const init = {
			language_url: '/tinymce/langs/zh-Hans.js',
			language: 'zh-Hans',
			skin_url: '/tinymce/skins/ui/oxide',
			plugins:
				'advlist anchor autolink autosave code codesample directionality fullscreen insertdatetime image link lists media nonbreaking pagebreak preview save searchreplace template visualblocks visualchars wordcount',
			toolbar:
				'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
			branding: false, // //是否禁用“Powered by TinyMCE”
			menubar: true, //顶部菜单栏显示
			content_css: '/tinymce/skins/content/default/content.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
			images_upload_handler: (blobInfo: any) =>
				new Promise((resolve, reject) => {
					// console.log(blobInfo.blob());
					// 上传图片需要，FormData 格式的文件；
					const formDataUp = new FormData()
					// img  是接口需要的上传的属性名，一般属性名是 file
					formDataUp.append('file', blobInfo.blob())
					// // console.log(formDataUp);
					axios
						.post('http://localhost:3000/api/v1/upload', formDataUp, {
							headers: {
								Authorization: `Bearer ${localStorage.getItem('starToken')}`,
								'AccessKey-ID': 'LTAI5tFXJ2bpdLmRvXpHZxu2',
								'AccessKey-Secret': 'wsQ1ph4ymSkQXcA3nI883GP9wYQRsd',
							},
						})
						.then(({ status, data }) => {
							if (status === 200) {
								resolve(data.url)
							} else {
								reject('上传失败')
							}
						})
				}),
		}
		onMounted(() => {
			tinymce.init({}) // 初始化富文本

		})
		onUnmounted(() => {
			tinymce.remove()
		})
		watch(
			() => tinymceHtml.value,
			() => {
				emit('search', tinymceHtml.value)
			}
		)

		return () => <Editor id="tinymce" v-model={[tinymceHtml.value, 'value']} init={init} />
	},
})
