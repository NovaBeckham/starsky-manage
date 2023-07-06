/*
 * @Description: 
 * @Author: hyx
 * @Date: 2023-07-06 11:22:54
 */

import { computed, defineComponent, onMounted, PropType } from 'vue'
import { useBasicDataStore } from '@/store'
import { isEmpty } from 'lodash'
import { Options } from '@/store/modules/basicData'

const Props = {
	value: [String, Number] as PropType<string | number>,
	label: [String, Number] as PropType<string | number>,
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	mode: String as PropType<'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'>,
	placeholder: String as PropType<string>,
	allowClear: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	updateEbsId: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	filter: Function as PropType<(data: Options, index: number, array: Options[]) => boolean>,
}
const FormCategory = defineComponent({
	name: 'form-category',
	props: Props,
	emits: ['update:value', 'update:label', 'search'],
	setup(porps, { emit }) {
		const basicDataStore = useBasicDataStore()
		const computeCount = computed(() => {
			return basicDataStore.categoryList
		})
		function onChange(value: number, option?: any) {
			if (option) {
				emit('update:value', option.value)
				emit('update:label', option.label)
			} else {
				emit('update:value', undefined)
				emit('update:label', undefined)
			}
			emit('search', value)
		}
		onMounted(() => {
			if (isEmpty(basicDataStore.categoryList)) {
				basicDataStore.getCategoryList()
			}
		})
		return () => (
			<a-select
				onChange={onChange}
				mode={porps.mode}
				disabled={porps.disabled}
				allowClear={porps.allowClear}
				value={porps.value}
				placeholder={porps.placeholder}
				options={computeCount.value}
			/>
		)
	},
})

export default FormCategory
