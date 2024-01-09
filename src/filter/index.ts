/*
 * @Description: 
 * @Author: hyx
 * @Date: 2023-07-04 17:10:14
 */

import { ATableColumnProp } from "@/interface"
import { useBasicDataStore } from "@/store"
import { isEmpty, isObject } from "lodash"

function isATableColumnProp(arg: any): arg is ATableColumnProp {
	return isObject(arg)
}

type Key = string | number | ATableColumnProp

export const categoryFilter = function (key: Key) {
	const basicDataStore = useBasicDataStore()
	if (isATableColumnProp(key)) {
		key = key.text
	}
	if (isEmpty(basicDataStore.categoryList)) {
		basicDataStore.getCategoryList()
		return key
	}
	const data = basicDataStore.categoryList.find((item) => item.value === key)
	if (data) {
		return data.label
	}
	return key
}

export const tagFilter = function (key: Key) {
	const basicDataStore = useBasicDataStore()
	if (isATableColumnProp(key)) {
		key = key.text
	}
	if (isEmpty(basicDataStore.tagList)) {
		basicDataStore.getTagList()
		return key
	}
	const data = basicDataStore.tagList.find((item) => item.value === key)
	if (data) {
		return data.label
	}
	return key
}