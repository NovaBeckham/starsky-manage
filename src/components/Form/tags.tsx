/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-12-20 11:01:06
 */

import { ObjectMap } from '@/interface'
import { useBasicDataStore } from '@/store'
import { forEach, isArray, isEmpty } from 'lodash'
import { PropType, defineComponent, onMounted } from 'vue'

const Props = {
	value: [String, Number, Array] as PropType<string | number | Array<string | number>>,
	label: [String, Number, Array] as PropType<string | number | Array<string | number>>,
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	mode: String as PropType<'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'>,
	allowClear: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	showSearch: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
}

const FormTags = defineComponent({
	name: 'form-tags',
	props: Props,
	emits: ['update:value', 'update:label', 'search'],
	setup(props, { emit }) {
		const basicDataStore = useBasicDataStore()
		function onChange(value: string | string[], option?: any) {
			if (option) {
				if (isArray(option)) {
					if (option.length > 0) {
						const values: string[] = []
						const labels: string[] = []
						forEach(option, (item: ObjectMap) => {
							values.push(item.value)
							labels.push(item.label)
						})
						emit('update:value', values)
						emit('update:label', labels)
					} else {
						emit('update:value', undefined)
						emit('update:label', undefined)
					}
				} else {
					emit('update:value', option.value)
					emit('update:label', option.label)
				}
			} else {
				emit('update:value', undefined)
				emit('update:label', undefined)
			}
			emit('search', value)
		}
		onMounted(() => {
			if (isEmpty(basicDataStore.tagList)) {
				basicDataStore.getTagList()
			}
		})
		return () => (
			<a-select
				onChange={onChange}
				value={props.value}
				mode={props.mode}
				disabled={props.disabled}
				allowClear={props.allowClear}
				showSearch={props.showSearch}
				options={basicDataStore.tagList}
			/>
		)
	},
})

export default FormTags
