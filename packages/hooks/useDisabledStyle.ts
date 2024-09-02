// 当组件被禁用时，使用此样式
import { each, isFunction, cloneDeep, assign } from 'lodash-es';
import { type VNode, watchEffect, useSlots, getCurrentInstance } from 'vue';

/**
 * 遍历真实dom树上的节点, 将text转换为相对应的语言的文字. _dfs将会是一个each函数, each函数对真实dom树进行了dfs式的遍历.
 * @param nodes 真实dom树上的节点
 * @param cb 回调函数
 * @returns lodash-es的each函数
 */
const _dfs = (nodes: VNode[], cb: (node: VNode) => void) => each(nodes, node => {
	// 判断cb 是否为函数, 若为函数, 则调用cb
	isFunction(cb) && cb(node)
	// 如果该节点仍有孩子节点, 则继续遍历以该节点为根节点的子树
	node.children && _dfs(node.children as VNode[], cb)
})

// 对disabled的值为true的节点, 将其样式设置为disabled
export function useDisabledStyle() {
	const nodePropsMap = new Map()

	const instance = getCurrentInstance()!
	const children = useSlots()?.default?.()

	// 利用watchEffect监听节点实例的disabled的变化
	watchEffect(() => {
		// 如果该节点实例的disabled的值为false或没有disabled, 则用_dfs遍历以该节点为根节点的子树.
		if (!instance?.props.disabled) {
			_dfs(children ?? [], node => {
				// 如果没有该节点, 则return
				if (!nodePropsMap.has(node)) return
				// 否则从map中获取该节点对应的值
				node.props = nodePropsMap.get(node)
			})
			return
		}
		// 如果该节点实例的disabled的值为true, 则用_dfs遍历以该节点为根节点的子树, 并将这些节点的props设置为disabled.
		_dfs(children ?? [], node => {
			// 如果该节点没有props, 则return
			if (!node?.props) return
			// 如果该节点有props, 则将该节点及其props收录进map中
			// key: node
			// value: node.props
			nodePropsMap.set(node, cloneDeep(node.props))
			// 将node.props和style结合(强制改变style)
			node.props = assign(node?.props, {
				style: {
					// 鼠标变为禁用
					cursor: 'not-allowed',
					// 颜色变为灰色
					color: 'var(--yo-text-color-placeholder)'
				}
			})
		})
	})
}

export default useDisabledStyle