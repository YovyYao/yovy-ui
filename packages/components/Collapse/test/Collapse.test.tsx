import { beforeAll, describe, expect, test, vi } from 'vitest';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';

import Collapse from '../Collapse.vue';
import CollapseItem from '../CollapseItem.vue';
import transitionEvents from '../utils/transitionEvents'

const onChange = vi.fn()

let wrapper: VueWrapper,
	headers: DOMWrapper<Element>[],
	contents: DOMWrapper<Element>[];

let firstHeader: DOMWrapper<Element>,
	firstContent: DOMWrapper<Element>,
	secondHeader: DOMWrapper<Element>,
	secondContent: DOMWrapper<Element>,
	disabledHeader: DOMWrapper<Element>,
	disabledContent: DOMWrapper<Element>;

describe('Collapse.vue', () => {
	beforeAll(() => {
		wrapper = mount(
			() => (
				<Collapse modelValue={["a"]} {...{onChange}}>
					<CollapseItem title="title a" name="a">
						content a
					</CollapseItem>
					<CollapseItem title="title b" name="b">
						content b
					</CollapseItem>
					<CollapseItem title="title c" name="c" disabled>
						content c
					</CollapseItem>
				</Collapse>
			),
			{
				global: {
					stubs: ["YoIcon"]
				},
				attachTo: document.body
			}
		)

		headers = wrapper.findAll(".yo-collapse-item__header")
		contents = wrapper.findAll(".yo-collapse-item__wrapper")

		firstHeader = headers[0]
		secondHeader = headers[1]
		disabledHeader = headers[2]

		firstContent = contents[0]
		secondContent = contents[1]
		disabledContent = contents[2]
	})

	// 对默认功能的测试
	test("test default props and text which attaching", () => {
		// length
		expect(headers.length).toBe(3)
		expect(contents.length).toBe(3)

		// title
		expect(firstHeader.text()).toBe("title a")

		//content
		expect(firstHeader.classes()).toContain("is-active")
		expect(firstContent.isVisible()).toBeTruthy()
		expect(secondHeader.classes()).not.toContain("is-active")
		expect(secondContent.isVisible()).toBeFalsy()
		expect(firstContent.text()).toBe("content a")
		expect(secondContent.text()).toBe("content b")
	})

	test("click title to show/close content", async () => {
		// events
		await firstHeader.trigger("click")
		expect(firstContent.isVisible()).toBeFalsy()
		expect(firstHeader.classes()).not.toContain("is-active")
		expect(firstContent.isVisible()).toBeFalsy()

		await secondHeader.trigger("click")
		expect(secondHeader.classes()).toContain("is-active")
		expect(secondHeader.isVisible()).toBeTruthy()
	})

	test("correct event is to be send", () => {
		expect(onChange).toHaveBeenCalledTimes(2)
		expect(onChange).toHaveBeenCalledWith([])
		expect(onChange).toHaveBeenLastCalledWith(["b"])
	})

	test("diabled to show content", async () => {
		// disabled
		expect(disabledHeader.classes()).toContain("is-disabled")
		onChange.mockClear()
		await disabledHeader.trigger("click")
		expect(disabledContent.isVisible()).toBeFalsy()
		expect(onChange).not.toHaveBeenCalled()
	})

	test("'modelValue' have been change", async () => {
		wrapper.setValue(["b"], "modelValue")
		await wrapper.vm.$nextTick()
		expect(secondHeader.classes()).toContain("is-active")
		expect(firstHeader.classes()).not.toContain("is-active")
	})

	// 手风琴模式
	test("accordion mode", async () => {
		wrapper = mount(
			() => (
				<Collapse accordion modelValue={["a"]} {...{onChange}}>
					<CollapseItem title="title a" name="a">
						content a
					</CollapseItem>
					<CollapseItem title="title b" name="b">
						content b
					</CollapseItem>
				</Collapse>
			),
			{
				global: {
					stubs: ["YoIcon"],
				},
				attachTo: document.body
			}
		)

		headers = wrapper.findAll(".yo-collapse-item__header")
		contents = wrapper.findAll(".yo-collapse-item__wrapper")

		firstHeader = headers[0]
		firstContent = contents[0]
		secondHeader = headers[1]
		secondContent = contents[1]

		await firstHeader.trigger("click")
		await secondHeader.trigger("click")
		expect(onChange).toHaveBeenCalledTimes(2)
		expect(onChange).toHaveBeenCalledWith(["b"])
		expect(firstHeader.classes()).not.toContain("is-active")
		expect(secondHeader.classes()).toContain("is-active")
	})

	// 手风琴模式下报错
	test("accordion mode have something wrong/error", () => {
		wrapper = mount(
			() => (
				<Collapse accordion modelValue={["a", "b"]} {...{ onChange }}>
					<CollapseItem name='a' title='title a'>
						content a
					</CollapseItem>
					<CollapseItem name='b' title='title b'>
						content b
					</CollapseItem>
					<CollapseItem name='c' title='title c' disabled>
						content c
					</CollapseItem>
				</Collapse>
			),
			{
				global: {
					stubs: ["YoCollapse"]
				}
			}
		)
	})

	expect(() => wrapper.vm.$nextTick()).toThrow()
});

describe("Collapse/utils/transitionEvents.ts", () => {
	const wrapper = mount(() => <div></div>)
	test("beforeEnter", () => {
		transitionEvents.beforeEnter(wrapper.element)
		expect(wrapper.element.style.height).toBe("0px")
		expect(wrapper.element.style.overflow).toBe("hidden")
	})
	test("enter", () => {
		transitionEvents.enter(wrapper.element)
		expect(wrapper.element.style.height).toBe(`${wrapper.element.scrollHeight}px`)
	})
	test("afterEnter", () => {
		transitionEvents.afterEnter(wrapper.element)
		expect(wrapper.element.style.height).toBe("")
		expect(wrapper.element.style.overflow).toBe("")
	})
	test("beforeLeave", () => {
		transitionEvents.beforeLeave(wrapper.element)
		expect(wrapper.element.style.overflow).toBe("hidden")
		expect(wrapper.element.style.height).toBe(`${wrapper.element.scrollHeight}px`)
	})
	test("leave", () => {
		transitionEvents.leave(wrapper.element)
		expect(wrapper.element.style.height).toBe("0px")
	})
	test("afterLeave", () => {
		transitionEvents.afterLeave(wrapper.element)
		expect(wrapper.element.style.height).toBe("")
		expect(wrapper.element.style.overflow).toBe("")
	})
})