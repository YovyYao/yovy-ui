import { isFunction } from 'lodash-es';
import { defineComponent } from 'vue';

export const RenderVnode = defineComponent({
	props: {
		vNode: {
			type: [String, Object, Function],
			required: true,
		}
	},
	setup(props) {
		return () => (isFunction(props.vNode) ? props.vNode() : props.vNode)
	}
})