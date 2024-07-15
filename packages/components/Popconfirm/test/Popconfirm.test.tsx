import { describe, it, expect, test, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Popconfirm from '../Popconfirm.vue';
import type { PopconfirmProps } from '../types';
import { each, get } from 'lodash-es';
import { YoPopconfirm } from '..';
import { withInstall } from '@yovy-ui/utils';

const onConfirm = vi.fn()
const onCancel = vi.fn()

describe('Popconfirm/index.ts', () => {
	// 测试YoPopconfirm上是否存在install()
	it('should be exported with withInstall()', () => {
		expect(YoPopconfirm.install).toBeDefined()
	})

	// 测试YoPopconfirm是否与未添加install函数前得Popconfirm组件一致
	it('should be exported Popconfirm component', () => {
		expect(YoPopconfirm).toBe(Popconfirm)
	})

	it('should enhance Popconfirm component', () => {
		const enhancedPopconfirm = withInstall(Popconfirm)
		expect(enhancedPopconfirm).toBe(YoPopconfirm)
	})
	
	test('should apply specific enhancements', () => {
		const enhancedPopconfirm = withInstall(Popconfirm)
		expect(enhancedPopconfirm).toHaveProperty('install')
	})
})

describe("Popconfirm", () => {
	const props = {
		title: "Popconfirm test",
		confirmButtonText: "Confirm",
		cancelButtonText: "Cancel",
		confirmButtonType: "primary",
		cancelButtonType: "info",
		icon: "check-circle",
		iconColor: "#f90",
		hideIcon: false,
		hideAfter: 500,
		width: 300,
	} as PopconfirmProps

	beforeEach(() => {
		vi.useFakeTimers()
		vi.clearAllMocks()
	})

	it('should accept all props', () => {
		const wrapper = mount(Popconfirm, {
			props,
		})

		each(props, (value, key) => {
			expect(get(wrapper.props(), key)).toBe(value)
		})
	})

	it('should render slot content correctly', () => {
		const slotContent = "Slot Content"
		const wrapper = mount(Popconfirm, {
			props,
			slots: {
				default: slotContent,
			}
		})
		expect(wrapper.text()).toContain(slotContent)
	})

	// 测试Popconfirm组件的按钮所触发的事件
	test('Popconfirm emits', async() => {
		const wrapper = mount(() => (
			<div>
				<div id='outside'></div>
				<Popconfirm
					title='Popconfirm Test'
					hideIcon={true}
					onConfirm={onConfirm}
					onCancel={onCancel}
				>
					<button id='trigger'>show Popconfirm</button>
				</Popconfirm>
			</div>
		))

		// trigger存在
		const triggerNode = wrapper.find('#trigger')
		expect(triggerNode.exists()).toBeTruthy()

		// 验证confirm按钮
		// 点击了trigger按钮后, popconfirm弹出
		triggerNode.trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find('.yo-popconfirm').exists()).toBeTruthy()

		// popconfim弹出后, confirm按钮和cancel按钮存在
		const confirmButton = wrapper.find('.yo-popconfirm__action__confirm')
		expect(confirmButton.exists()).toBeTruthy()

		// 点击了confirm按钮后, popconfirm消失, 动画完毕后, popconfirm也会消失, 并且此过程中, onConfirm被调用了一次
		confirmButton.trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find('.yo-popconfirm').exists()).toBeFalsy()
		expect(onConfirm).toBeCalled()

		// 验证cancel按钮
		// 点击trigger按钮后, popconfirm弹出
		triggerNode.trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find('.yo-popconfirm').exists()).toBeTruthy()

		// popconfim弹出后, confirm按钮和cancel按钮存在
		const cancelButton = wrapper.find('.yo-popconfirm__action__cancel')
		expect(cancelButton.exists()).toBeTruthy()

		// 点击了cancel按钮后, popconfirm消失, 动画完毕后, popconfirm也会消失, 并且此过程中, onCancel被调用了一次
		cancelButton.trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find('.yo-popconfirm').exists()).toBeFalsy()
		expect(onCancel).toBeCalled()
	})
})