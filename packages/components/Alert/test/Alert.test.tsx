import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { AlertType } from '../types';
import Alert from '../Alert.vue';
import Icon from '../../Icon/Icon.vue';
import { YoAlert } from '../index';
import { withInstall } from '@yovy-ui/utils';

describe("Alert.vue", () => {
	const title = "Test Alert" as const
	const desc = "This is a test description" as const

	it("should render the alert with default props", () => {
		const wrapper = mount(Alert, {
			props: {
				title,
			},
			slots: {
				default: desc,
			},
			global: {
				stubs: ["YoIcon"],
			},
		})
		expect(wrapper.text()).toContain(title)
		expect(wrapper.text()).toContain(desc)

		// Icon component which in Alert component
		const iconElement = wrapper.findComponent(Icon)
		expect(iconElement.exists()).toBeTruthy()
		expect(iconElement.attributes("icon")).toBe("xmark")

		const wrapperDOM = mount(() => (
			<Alert title={title} description={desc}></Alert>
		))

		expect(wrapperDOM.text()).toContain(title)
		expect(wrapperDOM.text()).toContain(desc)
	})

	it.each([
		["info", "circle-info"],
		["success", "check-circle"],
		["warning", "circle-exclamation"],
		["error", "circle-xmark"],
		["danger", "circle-xmark"],
		["non-compliance", "circle-info"],
	])("should has the correct icon when props type is %s", (type, iconName) => {
		const wrapper = mount(Alert, {
			props: {
				title,
				closable: false,
				showIcon: true,
				type: type as AlertType,
			},
			slots: {
				default: desc,
			},
			global: {
				stubs: ["YoIcon"],
			},
		})

		// 对icon判断是否符合预期
		const iconElement = wrapper.findComponent(Icon)
		expect(iconElement.exists()).toBeTruthy()
		expect(iconElement.attributes("icon")).toBe(iconName)
	})

	it("should emit close event when close ico iis clicked", () => {
		const onClose = vi.fn()

		const wrapper = mount(Alert, {
			props: {
				title,
				closable: true,
				showIcon: false,
				onClose,
			},
			slots: {
				default: desc,
			},
			global: {
				stubs: ["YoIcon"],
			},
		})
		// 找到Icon并让其触发click事件
		wrapper.findComponent(Icon).trigger("click")
		// 期望onClose事件被调用
		expect(onClose).toHaveBeenCalled()
	})

	// 测试插槽的内容优先级(期望插槽的优先级最高)
	it("should allow custom content via slots", () => {
		const wrapper = mount(Alert, {
			props: {
				title: "test title",
			},
			slots: {
				default: desc,
				title,
			},
		})
		expect(wrapper.text()).toContain(desc)
		expect(wrapper.text()).toContain(title)
		// 插槽的优先级最高, 因此期望显示title变量而不是"test title"
		expect(wrapper.text()).not.toContain("test title")
	})

	it("should supprot centering text", () => {
		const wrapper = mount(Alert, {
			props: {
				title,
				description: desc,
				center: true,
			},
		})
		const rootNode = wrapper.find(".yo-alert")
		expect(rootNode.classes()).toContain("text-center")
	})

	it("should not render close icon when closable is false", () => {
		const wrapper = mount(Alert, {
			props: {
				closable: false,
			},
		})
		expect(wrapper.find(".yo-alert__close").exists()).toBe(false)
	})

	it("should toggle visibility when open and close methods are called", async () => {
		const wrapper = mount(Alert, {
			props: {
				title,
				closable: false,
			},
		})
		await wrapper.vm.close()
		expect(wrapper.find(".yo-alert").attributes().style).toBe("display: none;")
		await wrapper.vm.open()
		expect(wrapper.find(".yo-alert").attributes().style).toBe("")
	})
})

describe('Alert/index', () => {
	it('should be exported with withInstall()', () => {
		expect(YoAlert.install).toBeDefined()
	})
	it('should be exported', () => {
		expect(YoAlert).toBe(Alert)
	})
	it('should enhance Alert component', () => {
		const enhanceAlert = withInstall(Alert)
		expect(enhanceAlert).toBe(YoAlert)
	})
	it('should apply specific enhance', () => {
		const enhanceAlert = withInstall(Alert)
		expect(enhanceAlert).toHaveProperty('install')
	})
})