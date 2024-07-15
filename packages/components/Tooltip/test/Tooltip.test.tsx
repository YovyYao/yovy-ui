import { describe, test, expect, vi, it, beforeEach } from 'vitest';
import { withInstall } from '@yovy-ui/utils';
import { mount } from '@vue/test-utils';
import Tooltip from '../Tooltip.vue';
import { YoTooltip } from '../';

vi.mock('@popperjs/core')

const onVisibleChange = vi.fn()

describe('Tooptip/index', () => {
	// 导出的组件必须携带install()
	it('should be exported with withInstall()', () => {
		expect(YoTooltip.install).toBeDefined()
	})
	// index是否正确导出了Tooplip组件
	it('should be exported Tooltip component', () => {
		expect(YoTooltip).toBe(Tooltip)
	})
	// 测试Tooltip是否真的被增强, 期望Tooltip组件在拥有install()后, 根YoTooltip组件一样
	test('should enhance Tooltip component', () => {
		const enhanceTooptip = withInstall(Tooltip)
		expect(enhanceTooptip).toBe(YoTooltip)
	})
	// 测试Tooltip组件在调用withInstall()后, 是否拥有install()方法
	test('should apply specific enhancements', () => {
		const enhancedTooptip = withInstall(Tooltip)
		expect(enhancedTooptip).toHaveProperty('install')
	})
})

describe('Tooltip.vue', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		vi.clearAllMocks()
	})
	test('basic Tooltip', async () => {
		const wrapper = mount(
			() => (
				<div>
					<div id='outside'></div>
					<Tooltip
						content='this is a tooltip'
						trigger='hover'
						{...{onVisibleChange}}
					>
						<button id='trigger'>这是一个按钮</button>
					</Tooltip>
				</div>
			),
			{
				attachTo: document.body,
			},
		)
		
		// 获得模板中的DOM结构
		const triggerArea = wrapper.find('#trigger')
		// 触发Tooltip的区域存在
		expect(triggerArea.exists()).toBeTruthy()
		// 未点击时, yo-tooltip__popper(Tooltip组件)不存在
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()

		// 触发hover事件
		wrapper.find('.yo-tooltip__trigger').trigger('mouseenter')
		await vi.runAllTimers()
		// 预期tooltip组件将会存在
		expect(wrapper.find('.yo-tooltip__popper').exists()).toBeTruthy()

		// 如果触发方式是hover, 那么点击外层不会导致tooltip的消失
		wrapper.get('#outside').trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find('.yo-tooltip__popper').exists()).toBeTruthy()

		// // 触发click事件
		// triggerArea.trigger('click')
		// // 等待动画结束
		// await vi.runAllTimers()
		// // 预期Tooltip组件存在
		// expect(wrapper.find(".yo-tooltip__popper").exists()).toBeTruthy()
		// // 预期Tooltip组件的内容是'this is a tooltip'
		// expect(wrapper.get(".yo-tooltip__popper").text()).toBe('this is a tooltip')
		// // 预期onVisibleChange()函数会被调用
		// expect(onVisibleChange).toHaveBeenCalledWith(true)

		// // 再次点击触发区域
		// triggerArea.trigger('click')
		// // 等待动画结束
		// await vi.runAllTimers()
		// // 预期Tooltip组件不存在
		// expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
		// // 预期onVisibleChange()函数已经被调用了两次
		// expect(onVisibleChange).toHaveBeenCalledTimes(2)

		// await vi.runAllTimers()
		// // 再次点击触发区域
		// triggerArea.trigger('click')
		// await vi.runAllTimers()
		// // 预期Tooltip组件存在
		// expect(wrapper.find(".yo-tooltip__popper").exists()).toBeTruthy()

		// // 区域外点击, 预期关闭Tooltip
		// wrapper.get('#outside').trigger('click')
		// await vi.runAllTimers()
		// expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
		// expect(onVisibleChange).toHaveBeenCalledTimes(4)

		// 卸载模板的DOM结构
		wrapper.unmount()
	})

	// 测试Tooltip显示后, 鼠标悬停在Tooltip上的结果(预期Tooltip不会消失)
	// test('tooltip with hover trigger', async () => {
	// 	const wrapper = mount(Tooltip, {
	// 		props: {
	// 			trigger: "hover",
	// 			content: "test",
	// 		},
	// 	})
	// 	// 让Tooltip触发mouseenter事件
	// 	wrapper.find(".yo-tooltip__trigger").trigger("mouseenter")
	// 	// 等待动画加载完毕
	// 	await vi.runAllTimers()
	// 	// 预期Tooltip显示
	// 	expect(wrapper.find(".yo-tooltip__popper").exists()).toBeTruthy()
	// 	// Tooltip触发mouseleave事件后, 预期Tooltip消失
	// 	wrapper.find(".yo-tooltip__popper").trigger("mouseleave")
	// 	await vi.runAllTimers()
	// 	expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
	// })

	test('tooltip with contextmenu trigger', async () => {
		const wrapper = mount(Tooltip, {
			props: {
				manual: true,
				content: "test",
			},
		})
		wrapper.vm.show()
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeTruthy()
		wrapper.vm.hide()
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
	})

	test("tooltip with manual trigger", async () => {
		const wrapper = mount(Tooltip, {
			props: {
				manual: true,
				content: "test",
			}
		})
		wrapper.find('.yo-tooltip__trigger').trigger("click")
		await vi.runAllTimers()
		expect(wrapper.find('.yo-tooltip__popper').exists()).toBeFalsy()
	})

	test('disabled tooltip', async () => {
		const wrapper = mount(Tooltip, {
			props: {
				disabled: true,
				content: 'test',
			},
		})
		wrapper.find('.yo-tooltip__trigger').trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
	})

	// 虚拟节点触发
	test('tooltip with virtual trigger node', async () => {
		const virtualRef = document.createElement('div')
		const wrapper = mount(Tooltip, {
			props: {
				virtualRef,
				virtualTriggering: true,
			},
		})
		virtualRef.dispatchEvent(new Event('mouseenter'))
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
	})

	// 测试触发方式改变之后的情况
	// test("change trigger prop", async () => {
	// 	const wrapper = mount(Tooltip, {
	// 		props: {
	// 			trigger: "hover",
	// 			content: "test",
	// 		},
	// 	})
	// 	wrapper.setProps({ trigger: "click" })
		
	// 	await vi.runAllTimers()
	// 	wrapper.find('.yo-tooltip__trigger').trigger("click")

	// 	await vi.runAllTimers()
	// 	expect(wrapper.find(".yo-tooltip__popper").exists()).toBeTruthy()

	// 	wrapper.find(".yo-tooltip__trigger").trigger("hover")

	// 	await vi.runAllTimers()

	// 	wrapper.find(".yo-tooltip__trigger").trigger("hover")

	// 	await vi.runAllTimers()
	// 	expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
	// })

	// 测试手动模式
	// test("change manual prop", async () => {
	// 	const wrapper = mount(Tooltip, {
	// 		props: {
	// 			trigger: "hover",
	// 			content: "test",
	// 		},
	// 	})

	// 	wrapper.setProps({ manual: true })
	// 	await vi.runAllTimers()

	// 	wrapper.find(".yo-tooltip__trigger").trigger("hover")

	// 	await vi.runAllTimers()
	// 	expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()

	// 	wrapper.setProps({
	// 		manual: false,
	// 		trigger: "contextmenu",
	// 	})

	// 	await vi.runAllTimers()
	// 	expect(wrapper.find('.yo-tooltip__popper').exists()).toBeTruthy()
	// })
})