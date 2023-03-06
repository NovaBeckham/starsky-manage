import { addUser, getUserById, updateUser, UserRequest } from '@/api/user'
import { notification } from 'ant-design-vue'
import { isNil } from 'ramda'
import { computed, defineComponent, PropType, ref, watch } from 'vue'

const rules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	role: [{ required: true, type: 'number', message: '请选择角色', trigger: 'change' }],
}

const Props = {
	id: Number as PropType<number>,
	visible: {
		type: Boolean as PropType<boolean>,
		required: true,
	},
} as const

export default defineComponent({
	props: Props,
	emits: ['cancel', 'search'],
	name: 'UserDetails',
	setup(props, { emit }) {
		watch(
			() => props.id,
			async () => {
				if (!isNil(props.id)) {
					const { status, data } = await getUserById(props.id)
					if (status === 200 && !isNil(data)) {
						searchForm.value = data
					}
				}
			}
		)
		const searchForm = ref<UserRequest>({ role: 2 })
		const isAdd = computed(() => isNil(props.id))
		const loading = ref(false)
		const onOk = async () => {
			if (isAdd.value) {
				loading.value = true
				const data = await addUser(searchForm.value)
				loading.value = false
				if (data.status === 200) {
					notification.success({
						message: '成功',
						description: '添加成功',
					})
					emit('search')
					onCancel()
				}
			} else {
				loading.value = true
				const data = await updateUser(props.id as number, searchForm.value)
				loading.value = false
				if (data.status === 200) {
					notification.success({
						message: '成功',
						description: '编辑成功',
					})
					emit('search')
					onCancel()
				}
			}
		}
		const onCancel = () => {
			searchForm.value = {}
			emit('cancel')
		}
		return () => (
			<a-modal
				visible={props.visible}
				title={isAdd.value ? '添加用户' : '编辑用户'}
				okButtonProps={{ htmlType: 'submit', form: 'searchFormRef' }}
				confirmLoading={loading.value}
				destroyOnClose
				onCancel={onCancel}
			>
				<a-form
					id="searchFormRef"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 12 }}
					model={searchForm.value}
					rules={rules}
					onFinish={onOk}
					name="details"
				>
					<a-form-item name="username" label="用户名">
						<a-input v-model={[searchForm.value.username, 'value']} style={{ width: '200px' }} />
					</a-form-item>
					{isAdd.value && (
						<a-form-item name="password" label="密码">
							<a-input-password v-model={[searchForm.value.password, 'value']} style={{ width: '200px' }} />
						</a-form-item>
					)}
					<a-form-item name="role" label="角色">
						<a-select
							v-model={[searchForm.value.role, 'value']}
							options={[
								{ value: 1, label: '管理员' },
								{ value: 2, label: '订阅者' },
							]}
							style={{ width: '200px' }}
							allowClear
						/>
					</a-form-item>
				</a-form>
			</a-modal>
		)
	},
})
