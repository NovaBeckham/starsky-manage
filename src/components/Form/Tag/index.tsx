/*
 * @Description:
 * @Author: hyx
 * @Date: 2023-08-18 14:50:10
 */

import { computed, defineComponent, onMounted, PropType } from 'vue'
import { useBasicDataStore } from '@/store'
import { forEach, isArray, isEmpty } from 'lodash'
import { Options } from '@/store/modules/basicData'

const Props = {
	value: [Array, String, Number] as PropType<string | number>,
	label: [Array, String, Number] as PropType<string | number>,
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
const FormTag = defineComponent({
	name: 'form-tag',
	props: Props,
	emits: ['update:value', 'update:label', 'search'],
	setup(porps, { emit }) {
		const basicDataStore = useBasicDataStore()
		const computeCount = computed(() => {
			return basicDataStore.tagList
		})
		function onChange(value: number, option?: any) {
      console.log('value', value)
      console.log('option', option)
			if (option) {
        if (isArray(option)) {
          if (option.length > 0) {
						const values: string[] = []
						const labels: string[] = []
						forEach(option, (item) => {
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

export default FormTag
