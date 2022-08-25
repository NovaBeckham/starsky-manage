/*
 * @Description:
 * @Author: hyx
 * @Date: 2022-08-25 16:42:05
 */
import { defineComponent, PropType, ref } from "vue"

const props = {
  msg: {
    type: String as PropType<string>,
    required: true,
  },
} as const

export default defineComponent({
  props,
  name: "HelloWorld",
  setup(props) {
    const count = ref(0)
    return () => (
      <div>
        <h1>{props.msg}</h1>

        <div class="card">
          <button type="button" onClick={() => count.value++}>
            count is {count.value}
          </button>
          <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
          </p>
        </div>

        <p>
          Check out
          <a
            href="https://vuejs.org/guide/quick-start.html#local"
            target="_blank"
          >
            create-vue
          </a>
          , the official Vue + Vite starter
        </p>
        <p>
          Install
          <a href="https://github.com/johnsoncodehk/volar" target="_blank">
            Volar
          </a>
          in your IDE for a better DX
        </p>
        <p style={{ color: "#888" }}>
          Click on the Vite and Vue logos to learn more
        </p>
      </div>
    )
  },
})
