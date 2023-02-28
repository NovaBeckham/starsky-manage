/*
 * @Description: 用户列表
 * @Author: hyx
 * @Date: 2023-02-28 17:25:22
 */

import { getUserList, User } from '@/api/user'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

interface UserKey {
  [key: number]: string
}

const UserFilter: UserKey = { 1: '管理员', 2: '游客' }

export default defineComponent({
	name: 'User',
	setup() {
		onMounted(() => {
			getUserList().then((res) => {
				if (res.data) {
					tableData.value = res.data
				}
        total.value = res.total
			})
		})
		const $router = useRouter()
    const total = ref(0)
		const add = () => {
			console.log('1')
		}
    const formatter = (row: User) => {
      return UserFilter[row.role]
    }
		const tableData = ref<User[]>([])
		return () => (
			<div>
				<el-button type="primary" onClick={add}>
					添加
				</el-button>
				<el-table data={tableData.value} style={{ width: '100%' }}>
					<el-table-column prop="username" label="用户名" align="center" />
					<el-table-column
						prop="role"
						label="角色"
						align="center"
            formatter={formatter}
					/>
				</el-table>
        <el-pagination layout="prev, pager, next" total={total.value} style={{ float: 'right' }} />
			</div>
		)
	},
})
