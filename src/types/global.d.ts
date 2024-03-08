import type { VNode } from 'vue'

declare global {
	namespace JSX {
		// tslint:disable no-empty-interface
		type Element = VNode
		// tslint:disable no-empty-interface
		interface ElementAttributesProperty {
			$props: any
		}
		interface IntrinsicElements {
			[elem: string]: any
		}
		interface IntrinsicAttributes {
			[elem: string]: any
		}
	}
}
