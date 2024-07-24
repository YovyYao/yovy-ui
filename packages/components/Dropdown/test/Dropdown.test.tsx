import { describe, it, test, expect, vi, beforeEach } from 'vitest';
import { YoDropdown, YoDropdownItem } from '../index';
import Dropdown from '../Dropdown.vue';
import DropdownItem from '../DropdownItem.vue';
import { withInstall } from '@yovy-ui/utils';
import type { DropdownItemProps } from '../types';
import { mount } from '@vue/test-utils';

describe('Downdrop/index.ts', () => {
	it('should be exported with withInstall()', () => {
		expect(YoDropdown.install).toBeDefined()
		expect(YoDropdownItem.install).toBeDefined()
	})

	it('should be exported Dropdown component', () => {
		expect(YoDropdown).toBe(Dropdown)
		expect(YoDropdownItem).toBe(DropdownItem)
	})

	test('should enhance Dropdown component', () => {
		const enhancedDropdown = withInstall(Dropdown)
		expect(enhancedDropdown).toBe(YoDropdown)
	})

	test('should apply specific enhancements', () => {
		const enhancedDropdown = withInstall(Dropdown)
		expect(enhancedDropdown).toHaveProperty('install')
	})
})

describe('Dropdown', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		vi.clearAllMocks()
	})

	it('should render slots correctly', () => {
		const items: DropdownItemProps[] = [
			{
				label: 'Item 1',
				command: 1,
			},
			{
				label: 'Item 2',
				command: 2,
			},
			{
				label: 'Item 3',
				command: 3,
				divided: true
			},
			{
				label: 'Item 4',
				command: 4
			},
		]
		const wrapper = mount(Dropdown, {
			props: {
				trigger: 'click',
			},
			slots: {
				deafult: () => <div>Default slot</div>,
				dropdown: () => items.map(item => <DropdownItem {...item} />)
			}
		})
		expect(wrapper.text()).toContain('Default slot')
		expect(wrapper.find('.yo-dropdown').exists()).toBeTruthy()
	})

	it('should emit command event when item is clicked', async () => {
		const items: DropdownItemProps[] = [
			{
				label: 'Item 1',
				disabled: true,
			},
			{
				label: 'Item 2',
				command: 'item2',
				divided: true,
			},
		]
		const onCommand = vi.fn()
		const wrapper = mount(Dropdown, {
			props: {
				trigger: 'click',
				onCommand,
			},
			slots: {
				default: () => <button id='trigger'>Default slot content</button>,
				dropdown: () => items.map(item => <DropdownItem {...item} />),
			},
		})

		// 下拉菜单的触发区域存在
		const triggerArea = wrapper.find('#trigger')
		expect(triggerArea.exists()).toBeTruthy()

		// 点击触发区域, 展示下拉菜单, 预期yo-dropdown__menu存在
		triggerArea.trigger('click')
		await vi.runAllTicks()
		expect(wrapper.find('.yo-dropdown__menu').exists()).toBeTruthy()

		// 找到下拉菜单的所有项目, 将第一个项目触发click, 预期该项目没有触发onCommand事件
		await wrapper.findAll('li').at(0)?.trigger('click')
		expect(onCommand).toBeCalledTimes(0)

		// 找到下拉菜单的所有项目, 将第二个项目触发click, 预期onCommand事件被触发, 并且携带'item2'参数
		await wrapper.findAll('li').at(2)?.trigger('click')
		expect(onCommand).toBeCalled()
		expect(onCommand).toBeCalledWith('item2')
	})

	// 测试Dropdown使用分割按钮时, 点击按钮是否符合预期
	it("should toggle visibility when split btn is clicked", async () => {
		const items: DropdownItemProps[] = [
			{
				label: "item1",
			},
			{
				label: "item2",
				command: "item2",
			},
		]
		const onClick = vi.fn()
		const wrapper = mount(Dropdown, {
			props: {
				trigger: "click",
				splitButton: true,
				items,
				onClick,
			},
			slots: {
				default: () => <div id='trigger'>Default slot content</div>
			},
		})

		// Dropdown的触发空间. 预期触发空间存在, 对其点击且等待动画完毕后, 预期.yo-dropdown__menu(所有DropdownItem)没有展示, 且Dropdown触发了onClick函数
		const triggerArea = wrapper.find('#trigger')
		expect(triggerArea.exists()).toBeTruthy()
		triggerArea.trigger('click')
		await vi.runAllTimers()
		expect(wrapper.find('.yo-dropdown__menu').exists()).toBeFalsy()
		expect(onClick).toBeCalled()
	})
})
