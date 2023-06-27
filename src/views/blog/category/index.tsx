/*
 * @Description: 分类列表
 * @Author: hyx
 * @Date: 2023-06-26 15:23:02
 */

import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'Category',
	setup() {
		const tableData = ref([])
		return () => (
			<div>
				<a-table />
			</div>
		)
	},
})
