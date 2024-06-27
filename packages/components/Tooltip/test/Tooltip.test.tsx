import { describe, test, expect, vi, it, beforeEach, expectTypeOf } from 'vitest';
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
					<Tooptip
						content='this is a tooltip'
						trigger='click'
						{...{onVisibleChange}}
					>
						<button id='trigger'>这是一个按钮</button>
					</Tooptip>
				</div>
			),
			{
				attachTo: document.body,
			},
		)
		const triggerArea = wrapper.find('#trigger')
		expect(triggerArea.exists()).toBe(true)
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()

		triggerArea.trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeTruthy()
		expect(wrapper.get(".yo-tooltip__popper").text()).toBe('this is a tooltip')
		expect(onVisibleChange).toHaveBeenCalledWith(true)

		triggerArea.trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
		expect(onVisibleChange).toHaveBeenCalledTimes(2)

		await vi.runAllTimers()
		triggerArea.trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeTruthy()

		// 区域外点击, 则关闭Tooltip
		wrapper.get('#outside').trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
		expect(onVisibleChange).toHaveBeenCalledTimes(4)

		wrapper.unmount()
	})

	test('tooltip with hover trigger', async () => {
		const wrapper = mount(Tooltip, {
			props: {
				trigger: "hover",
				content: "tooltip test",
			},
		})
		wrapper.find(".yo-tooltip__trigger").trigger("mouseenter")
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeTruthy()
		// 鼠标离开后Tooltip隐藏
		wrapper.find(".yo-tooltip__popper").trigger("mouseleave")
		await vi.runAllTimers()
		expect(wrapper.find(".yo-tooltip__popper").exists()).toBeFalsy()
	})

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
})