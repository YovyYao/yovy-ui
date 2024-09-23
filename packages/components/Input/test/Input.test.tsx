import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import YoInput from '../Input.vue';

describe('Input.vue', () => {
	test('render', () => {
		const wrapper = mount(YoInput, {
			props: {
				type: 'text',
				size: 'small',
				modelValue: 'test',
			},
			slots: {
				prepend: 'prepend',
				prefix: "prefix",
			},
		})
		// 测试 class
		expect(wrapper.classes()).toContain('yo-input')
		expect(wrapper.classes()).toContain('yo-input--text')
		expect(wrapper.classes()).toContain('yo-input--small')
		expect(wrapper.classes()).toContain('is-prefix')
		expect(wrapper.classes()).toContain('is-prepend')

		// 测试插槽
		expect(wrapper.find('input').exists()).toBeTruthy()
		expect(wrapper.get('input').attributes('type')).toBe('text')

		// 测试插槽
		expect(wrapper.find('.yo-input__prepend').exists()).toBeTruthy()
		expect(wrapper.get('.yo-input__prepend').text()).toBe('prepend')

		expect(wrapper.find('.yo-input__prefix').exists()).toBeTruthy()
		expect(wrapper.get('.yo-input__prefix').text()).toBe('pretext')

		const wrapper2 = mount(YoInput, {
			props: {
				type: 'textarea',
				modelValue: 'test',
			},
		})

		expect(wrapper2.find('textarea').exists()).toBeTruthy()
	})

	test('v-model', async () => {
		const wrapper = mount(YoInput, {
			props: {
				modelValue: 'test',
				'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
				type: 'text'
			}
		})
		const input = wrapper.get('input')
		expect(input.element.value).toBe('test')

		await input.setValue('test2')
		expect(wrapper.props('modelValue')).toBe('test2')
		expect(input.element.value).toBe('test2')

		expect(wrapper.emitted()).toHaveProperty('input')
		expect(wrapper.emitted()).toHaveProperty('change')

		const inputEvent = wrapper.emitted('input')
		const changeEvent = wrapper.emitted('change')

		expect(inputEvent![0]).toEqual(['test2'])
		expect(changeEvent![0]).toEqual(['test2'])

		await wrapper.setProps({ modelValue: 'test3' })
		expect(input.element.value).toBe('test3')
	})

	test('clearable', async () => {
		const wrapper = mount(YoInput, {
			props: {
				modelValue: 'test',
				clearable: true,
				type: 'text',
			},
			global: {
				stubs: ['icon'],
			},
		})

		expect(wrapper.find('.yo-input__clear').exists()).toBeFalsy()

		const input = wrapper.get('input')
		await input.trigger('focus')
		expect(wrapper.emitted()).toHaveProperty('focus')

		expect(wrapper.find('.yo-input__clear').exists()).toBeTruthy()

		await wrapper.get('.yo-input__clear').trigger('click')
		expect(wrapper.emitted()).toHaveProperty('clear')

		expect(wrapper.emitted()).toHaveProperty('input')
		expect(wrapper.emitted()).toHaveProperty('change')

		const inputEvent = wrapper.emitted('input')
		const changeEvent = wrapper.emitted('change')

		expect(inputEvent![0]).toEqual([''])
		expect(changeEvent![0]).toEqual([''])
		expect(input.element.value).toBe('')

		await input.trigger('blur')
		expect(wrapper.emitted()).toHaveProperty('blur')
	})

	test('toggle password', async () => {
		const wrapper = mount(YoInput, {
			props: {
				modelValue: '',
				type: 'password',
				showPassword: true,
			},
			global: {
				stubs: ['icon']
			}
		})

		expect(wrapper.find('.yo-input__password').exists()).toBeFalsy()
		const input = wrapper.get('input')

		expect(input.element.type).toBe('password')
		await input.setValue('这是input框的内容')

		const eyeIcon = wrapper.find('.yo-input__password')
		expect(eyeIcon.exists()).toBeTruthy()
		expect(eyeIcon.attributes('icon')).toBe('eye-slash')

		await eyeIcon.trigger('click')
		expect(input.element.type).toBe('text')
		expect(wrapper.find('.yo-input__password').attributes('icon')).toBe('eye')
	})
})
