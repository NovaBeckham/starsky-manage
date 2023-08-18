/*
 * @Description: 
 * @Author: hyx
 * @Date: 2023-08-18 11:51:14
 */

import { Result } from "@/interface"
import requests from "@/utils/request"

export interface TagListOptions {
  id?: number
  tagName?: string
  articleCount?: number
}

/**
 * 标签列表
 */
export function getList(): Promise<Result<TagListOptions[]>> {
	return requests({
		url: '/tag/list',
		method: 'get',
	})
}