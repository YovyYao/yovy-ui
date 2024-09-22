import { describe, test, expect } from 'vitest';
import { nextTick } from 'vue';

import { notification } from '../util';

const asyncFn = async () => {
	return new Promise(res => {
		requestAnimationFrame(() => {
			requestAnimationFrame(async () => {
				res(null)
				await nextTick()
			})
		})
	})
}

function getTopValue(e: Element) {
	const styles = window.getComputedStyle(e)
	const topValue = styles.getPropertyValue('top')
	return Number.parseFloat(topValue)
}

describe('Notification', () => {
	test('notification() function', async () => {
		const handler = notification({ message: 'hello notification component', duration: 0 })
		await asyncFn()
		expect(document.querySelector('.yo-notification')).toBeTruthy()
		handler.close()
		await asyncFn()
		expect(document.querySelector('.yo-notification')).toBeFalsy()
	})

	test('call notification() function more than once', async () => {
		notification({ message: 'hello notification component', duration: 0 })
		notification({ message: 'hello notification component', duration: 0 })
		await asyncFn()
		expect(document.querySelectorAll('.yo-notification').length).toBe(2)
		notification.closeAll()
		await asyncFn()
		expect(document.querySelectorAll('.yo-notification').length).toBe(0)
	})

	test('notification offset', async () => {
		notification({ message: 'hello notification component', duration: 100 })
		notification({ message: 'hello notification component', duration: 50 })
		await asyncFn()
		const elements = document.querySelectorAll('.yo-notification')
		expect(elements.length).toBe(2)
		expect(getTopValue(elements[0])).toBe(100)
		expect(getTopValue(elements[0])).toBe(150)
	})
})