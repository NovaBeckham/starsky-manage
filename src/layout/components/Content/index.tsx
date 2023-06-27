import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
	name: 'Content',
	setup() {
		return () => (
			<a-layout-content>
				<RouterView></RouterView>
			</a-layout-content>
		)
	},
})
