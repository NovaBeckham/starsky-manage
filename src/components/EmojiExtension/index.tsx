import { defineComponent, ref } from 'vue'
import { InsertContentGenerator, DropdownToolbar } from 'md-editor-v3'
import { emojis } from './data'
import $styles from './index.module.scss'

const EmojiExtension = defineComponent({
	name: 'EmojiExtension',
	emits: ['insert'],
	setup(props, { emit }) {
		const visible = ref(false)
		const emojiHandler = (emoji: string) => {
			const generator: InsertContentGenerator = () => {
				return {
					targetValue: emoji,
					select: true,
					deviationStart: 0,
					deviationEnd: 0,
				}
			}
      emit('insert', generator)
		}
		return () => (
			<DropdownToolbar
				title="emoji"
				visible={visible.value}
				onChange={(changeVisible) => (visible.value = changeVisible)}
				v-slots={{
					overlay: () => (
						<div class={$styles.container}>
							<ol class={$styles.emojis}>
								{emojis.map((item, index) => (
									<li key={`emoji-${index}`} v-text={item} onClick={() => emojiHandler(item)} />
								))}
							</ol>
						</div>
					),
          trigger: () => (
            <svg class="md-editor-icon" aria-hidden="true" style="width:1.3rem;">
                <use xlinkHref="#icon-emoji"></use>
            </svg>
          )
				}}
			/>
		)
	},
})

export default EmojiExtension